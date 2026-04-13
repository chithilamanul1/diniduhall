/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "i.ibb.co" }
    ],
  },
  async redirects() {
    return [
      {
        source: '/test-redirect',
        destination: 'https://google.com',
        permanent: false,
      },
    ]
  },
};
export default nextConfig;