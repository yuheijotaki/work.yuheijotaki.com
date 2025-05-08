/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  devIndicators: false,
  reactStrictMode: true,
  env: {
    siteUrl: 'https://work.yuheijotaki.com/',
    siteName: 'work.yuheijotaki.com',
    ogImage: 'img/meta/ogp.png',
    metaCard: 'summary_large_image',
  },
  trailingSlash: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    domains: ['storage.googleapis.com'],
  },
}

module.exports = nextConfig
