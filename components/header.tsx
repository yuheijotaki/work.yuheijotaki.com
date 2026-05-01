'use client'

import Link from 'next/link'
import { SITE_NAME } from '@/lib/site'
import styles from '@/styles/components/Header.module.scss'

interface HeaderProps {
  onLogoClick?: () => void;
  isTopPage?: boolean;
}

export default function Header({ onLogoClick, isTopPage = false }: HeaderProps) {
  const LogoWrapper = isTopPage ? 'h1' : 'div';

  return (
    <>
      <header>
        <LogoWrapper className={styles.logo}>
          <Link
            href={'/'}
            className={styles.anchor}
            onClick={onLogoClick}
          >
            {SITE_NAME}
          </Link>
        </LogoWrapper>
      </header>
    </>
  )
}
