/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  pageExtensions: ['page.tsx'],
  swcMinify: true,
  experimental: {
    outputStandalone: true,
  },
  images: {
    domains: ['s3.us-west-2.amazonaws.com'],
  },
};
