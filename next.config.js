/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https", // Allows any HTTPS images.
        hostname: "**", // Wildcard for any hostname.
      },
    ],
  },
  env: {
    NEXT_PUBLIC_URL_API: process.env.URL_API,
    NEXT_PUBLIC_APPENV: process.env.APPENV,
    NEXT_PUBLIC_BUILDID: process.env.BUILDID,
  },
};

module.exports = nextConfig;
