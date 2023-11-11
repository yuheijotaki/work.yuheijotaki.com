import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="ja">
      <Head />
      <body tabIndex={-1}>
        <div className='wrapper'>
          <Main />
        </div>
        <NextScript />
      </body>
    </Html>
  )
}
