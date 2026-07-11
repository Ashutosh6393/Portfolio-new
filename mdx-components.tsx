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
  // Wrap code blocks in a macOS-style window frame. The dot bar sits outside the
  // <pre> so it stays put when long lines scroll horizontally.
  pre: (props) => (
    <div className="code-block">
      <div className="code-block__bar" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <pre {...props} />
    </div>
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
