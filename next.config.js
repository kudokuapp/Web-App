/** @type {import('next').NextConfig} */

// const withWorkbox = require('next-with-workbox');

// const withPWA = require('next-pwa')({
//   dest: 'public',
//   disable: process.env.NODE_ENV === 'development',
//   register: true,
//   scope: '/',
//   sw: '/sw.js',
//   maximumFileSizeToCacheInBytes: 5_000_000_000,
//   buildExcludes: [/\*.json/],
// });

const nextConfig = {
  reactStrictMode: true,
  experimental: { appDir: true },
  swcMinify: true,
  env: {
    VERSION: require('./package.json').version,
  },
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

// module.exports = withWorkbox({
//   workbox: {
//     swSrc: '/public/worker.js',
//     maximumFileSizeToCacheInBytes: 5_000_000_000,
//   },
//   ...nextConfig,
// });
