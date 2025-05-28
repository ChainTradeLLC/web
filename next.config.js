/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental: {
  //   serverActions: true,
  // },
  // i18n: {
  //   locales: ['en', 'fr', 'es'],
  //   defaultLocale: 'en',
  // },
  output: 'standalone',
  // compress: false,
  reactStrictMode: false,
  swcMinify: true,
  // assetPrefix: './',
  // images: {
  //   // domains:["lh3.googleusercontent.com","firebasestorage.googleapis.com", "avatars.githubusercontent.com"],
  //   remotePatterns: [
  //     {
  //       protocol: 'https',
  //       hostname: 'lh3.googleusercontent.com',
  //       pathname: '**',
  //     },
  //     {
  //       protocol: 'https',
  //       hostname: 'firebasestorage.googleapis.com',
  //       pathname: '**',
  //     },
  //     {
  //       protocol: 'https',
  //       hostname: 'avatars.githubusercontent.com',
  //       pathname: '**',
  //     },
  //     {
  //       protocol: 'https',
  //       hostname: 'sxipherblog.wordpress.com',
  //       pathname: '**',
  //     },
  //   ],
  // },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;