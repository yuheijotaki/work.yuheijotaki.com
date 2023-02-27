import type { AppProps } from 'next/app'
import 'ress'
import '@/styles/foundation/global.scss'

// NProgress
import Router from 'next/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

// local Fonts
import localFont from '@next/font/local'
const PostgroteskBookFont = localFont({
  src: [
    {
      path: './fonts/PostGrotesk-Book.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/PostGrotesk-Book.eot',
      weight: '400',
      style: 'normal',
    }
  ],
  display: 'swap',
  preload: true
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        :root {
          --postgrotesk-book: ${PostgroteskBookFont.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  )
}
