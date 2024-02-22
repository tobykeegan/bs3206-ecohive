/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

const nextConfig = {
  output: 'standalone',
  productionBrowserSourceMaps: false,
  optimizeFonts: false,
};

module.exports = withBundleAnalyzer(nextConfig);
