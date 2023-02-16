import type { AppProps } from 'next/app'
import 'ress'
import '@/styles/variables.module.scss'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
