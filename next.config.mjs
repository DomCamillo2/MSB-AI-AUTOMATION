/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'msb-ai-automation.vercel.app' }],
        destination: 'https://www.msb-ai.de/:path*',
        permanent: true
      }
    ];
  }
};

export default nextConfig;
