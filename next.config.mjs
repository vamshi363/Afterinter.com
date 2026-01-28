/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
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
    unoptimized: true, 
  },
  eslint: {
    // Allows build to succeed even if there are minor linting warnings
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Allows build to succeed even if there are minor type errors
    ignoreBuildErrors: true,
  },
  trailingSlash: false,
};

export default nextConfig;