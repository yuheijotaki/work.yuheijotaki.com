import type { AppProps } from 'next/app'
import 'ress'
// import '@/styles/foundation/variables.scss'
import '@/styles/foundation/global.scss'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
