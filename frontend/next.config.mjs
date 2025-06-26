/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fakestoreapi.com",
        pathname: "/img/**", // Optional: Restrict to specific paths
      },
    ],
  },
};

export default nextConfig;
