/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'backend.prosental.com',
      },
      {
        protocol: 'https',
        hostname: 'eng.prosental.online',
      },
    ],
  },
};

export default nextConfig;
