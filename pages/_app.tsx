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

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
