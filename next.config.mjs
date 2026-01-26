/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['logo.clearbit.com'],
  },
  // Ensure redirects from old hash routes if possible, though client-side handling is usually needed for hash
};

export default nextConfig;