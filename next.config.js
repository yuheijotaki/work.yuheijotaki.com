/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true, // URL末尾にスラッシュを追加
  sassOptions: {  // Sass（SCSS）を使用
    includePaths: [path.join(__dirname, 'styles')],
  },
}

module.exports = nextConfig
