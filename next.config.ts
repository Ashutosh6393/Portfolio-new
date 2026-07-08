import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // Let .md / .mdx files act as pages and be imported as components.
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({
  options: {
    // String form so the plugin is serializable for Turbopack (Next 16 default).
    remarkPlugins: ["remark-gfm"],
  },
});

export default withMDX(nextConfig);
