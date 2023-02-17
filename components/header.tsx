import Link from 'next/link'
import styles from '@/styles/components/Header.module.scss'
import { ReactNode } from 'react';

export default function Header({ children }: {children: ReactNode}) {
  return (
    <>
      <h1 className={styles['logo']}><Link href={'/'} className={styles['anchor']}>{process.env.siteName}</Link></h1>
    </>
  )
}
