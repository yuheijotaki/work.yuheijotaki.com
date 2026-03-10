/** @type {import('next').NextConfig} */
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

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
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.microcms-assets.io',
      },
    ],
  },
  compiler: {
    styledComponents: true,
  },
}

export default nextConfig
