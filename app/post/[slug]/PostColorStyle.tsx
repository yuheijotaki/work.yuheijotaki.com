'use client'

import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle<{ colorText: string }>`
  html {
    --color-text: ${(props) => props.colorText};
  }
`

export default function PostColorStyle({ colorText }: { colorText: string }) {
  return <GlobalStyles colorText={colorText} />
}
