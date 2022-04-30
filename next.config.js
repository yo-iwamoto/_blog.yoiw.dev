/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  pageExtensions: ['page.tsx'],
  swcMinify: true,
  experimental: {
    outputStandalone: true,
  },
};
