import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { SITE_URL } from '@/lib/site'
import 'ress'
import '@/styles/foundation/global.scss'

const PostgroteskBookFont = localFont({
  src: '../public/fonts/PostGrotesk-Book.woff',
  weight: '400',
  style: 'normal',
  display: 'swap',
  preload: true,
  variable: '--postgrotesk-book',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" className={PostgroteskBookFont.variable}>
      <body>
        <div className="wrapper">{children}</div>
      </body>
    </html>
  )
}
