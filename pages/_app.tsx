import 'ress'
import '@/styles/variables.module.scss'
// import variables from '../styles/variables.module.scss'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
