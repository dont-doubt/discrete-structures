import type { NextConfig } from "next";
import createMDX from '@next/mdx'

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  async redirects() {
    const redirects = [];

    // Generate redirects for /tasks/1 to /tasks/12
    for (let i = 1; i <= 12; i++) {
      redirects.push({
        source: `/tasks/${i}`,
        destination: `/boolean-functions/${i}`,
        permanent: true,
      });
    }

    return redirects;
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

export default withMDX(nextConfig)
