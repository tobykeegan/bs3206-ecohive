const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const thisUrl = require('./src/app/api/utils/globals').URL;

const headers = [
  'Accept',
  'Accept-Version',
  'Content-Length',
  'Content-MD5',
  'Content-Type',
  'Date',
  'X-Api-Version',
  'X-CSRF-Token',
  'X-Requested-With',
];

const nextConfig = {
  output: 'standalone',
  productionBrowserSourceMaps: false,
  optimizeFonts: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/300/200',
      },
    ],
  },
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          {
            key: 'Access-Control-Allow-Origin',
            value: thisUrl,
          },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST' },
          { key: 'Access-Control-Allow-Headers', value: headers.join(', ') },
        ],
      },
    ];
  },
};

module.exports = withBundleAnalyzer(nextConfig);
