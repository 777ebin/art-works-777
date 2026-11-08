/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    domains: [
      'images.unsplash.com',
      'upload.wikimedia.org',
      'api.dicebear.com',
      'i.pinimg.com',
      'www.keralatourism.org',
      'keralatourism.org',
      'aranmulakannadi.net',
      'artnindia.com',
      'd35l77wxi0xou3.cloudfront.net',
      'www.holidify.com',
      'holidify.com',
      'localhost',
      '127.0.0.1',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  async rewrites() {
    const backendUrl =
      process.env.BACKEND_URL ||
      process.env.NEXT_PUBLIC_API_URL?.replace(/\/api\/?$/, '');

    // Only rewrite if an external backend URL is explicitly configured
    if (backendUrl) {
      return [
        {
          source: '/api/:path*',
          destination: `${backendUrl}/api/:path*`,
        },
        {
          source: '/uploads/:path*',
          destination: `${backendUrl}/uploads/:path*`,
        },
      ];
    }
    return [];
  },
};

module.exports = nextConfig;
