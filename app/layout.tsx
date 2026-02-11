import type { Metadata } from 'next'
import localFont from 'next/font/local'
import StyledComponentsRegistry from '@/lib/registry'
import 'ress'
import '@/styles/foundation/global.scss'
import 'nprogress/nprogress.css'

const PostgroteskBookFont = localFont({
  src: '../public/fonts/PostGrotesk-Book.woff',
  weight: '400',
  style: 'normal',
  display: 'swap',
  preload: true,
  variable: '--postgrotesk-book',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://work.yuheijotaki.com/'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" className={PostgroteskBookFont.variable}>
      <body tabIndex={-1}>
        <StyledComponentsRegistry>
          <div className="wrapper">{children}</div>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
