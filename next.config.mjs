/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "logo.clearbit.com",
      },
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
      }
    ],
  },
  // Ensure trailing slashes are handled correctly for SEO
  trailingSlash: false,
};

export default nextConfig;