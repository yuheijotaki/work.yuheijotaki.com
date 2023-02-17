/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  reactStrictMode: true,
  env: { // 定数
    siteUrl: 'https://works.yuheijotaki.com/',
    siteName: 'works.yuheijotaki.com',
    ogImage: 'img/meta/ogp.png',
    metaCard: 'summary_large_image',
  },
  trailingSlash: true, // URL末尾にスラッシュを追加
  sassOptions: {  // Sass（SCSS）を使用
    includePaths: [path.join(__dirname, 'styles')],
  },
}

module.exports = nextConfig
