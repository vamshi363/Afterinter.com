
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  typescript: {
    // Ensure production build passes even if minor type mismatches occur in legacy files
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
};

export default nextConfig;
