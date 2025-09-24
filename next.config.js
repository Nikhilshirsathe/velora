/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['en', 'hi', 'mr'],
    defaultLocale: 'en',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.builder.io',
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
      },
    ],
    unoptimized: true,
  },
}

module.exports = nextConfig
