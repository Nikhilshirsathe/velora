/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['en', 'hi', 'mr'],
    defaultLocale: 'en',
  },
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com', 'cdn.builder.io'],
  },
}

module.exports = nextConfig
