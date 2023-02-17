import Link from 'next/link'
import styles from '@/styles/components/Header.module.scss'
import { ReactNode } from 'react';

export default function Header({ children }: {children: ReactNode}) {
  return (
    <>
      <header className={styles.header}>
        <p><Link href={'/'}>{process.env.siteName}</Link></p>
      </header>
    </>
  )
}
