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
    // Class-based highlighting (hljs-* classes) so the palette lives in our CSS
    // tokens, not the plugin. ignoreMissing: skip unknown fence languages.
    rehypePlugins: [["rehype-highlight", { ignoreMissing: true }]],
  },
});

export default withMDX(nextConfig);
