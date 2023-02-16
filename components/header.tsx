import Link from 'next/link'
import styles from '@/styles/Header.module.scss'
import { ReactNode } from 'react';

export default function Header({ children }: {children: ReactNode}) {
  return (
    <>
      <header className={styles.header}>
        <p><Link href={'/'}>works.yuheijotaki.dev</Link></p>
      </header>
    </>
  )
}
