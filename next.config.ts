import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // Let .md / .mdx files act as pages and be imported as components.
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({
  options: {
    // String form so the plugins are serializable for Turbopack (Next 16 default).
    remarkPlugins: ["remark-gfm"],
    // rehype-slug: id="" on every heading so the TOC can anchor to sections.
    // rehype-highlight: class-based highlighting (hljs-* classes) so the palette
    // lives in our CSS tokens, not the plugin. ignoreMissing skips unknown langs.
    rehypePlugins: ["rehype-slug", ["rehype-highlight", { ignoreMissing: true }]],
  },
});

export default withMDX(nextConfig);
