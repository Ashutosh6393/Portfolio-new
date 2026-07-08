import type { MDXComponents } from "mdx/types";

// Required by @next/mdx in the App Router. Prose styling lives in the
// `.prose` block in globals.css so MDX bodies stay clean markdown; here we
// only harden a couple of elements (safe external links, lazy images).
const components: MDXComponents = {
  a: ({ href = "", children, ...props }) => {
    const external = /^https?:\/\//.test(href);
    return (
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...props}
      >
        {children}
      </a>
    );
  },
  // eslint-disable-next-line @next/next/no-img-element
  img: (props) => <img loading="lazy" decoding="async" {...props} />,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
