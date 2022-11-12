/** @type {import('next').NextConfig} */

// const withPWA = require('next-pwa')({
//   dest: 'public',
//   disable: process.env.NODE_ENV === 'development',
//   register: true,
//   scope: '/',
//   sw: '/sw.js',
// });

const nextConfig = {
  reactStrictMode: true,
  experimental: { appDir: true },
  swcMinify: true,
  // images: {
  //   domains: ['i.pravatar.cc'],
  // },
  // i18n: {
  //   locales: ['en', 'fr'],
  //   defaultLocale: 'en',
  //   // localeDetection: false,
  // },
};

// module.exports = withPWA(nextConfig);
module.exports = nextConfig;
