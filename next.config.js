/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
  dest: 'public',
});

const nextConfig = withPWA({
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
});

module.exports = nextConfig;
