import Link from 'next/link'
import styles from '@/styles/components/Header.module.scss'

type HeaderProps = {
  onLogoClick?: () => void;
  isTopPage?: boolean;
}

export default function Header({ onLogoClick, isTopPage = false }: HeaderProps) {
  const LogoWrapper = isTopPage ? 'h1' : 'div';

  return (
    <>
      <header>
        <LogoWrapper className={styles['logo']}>
          <Link
            href={'/'}
            className={styles['anchor']}
            onClick={onLogoClick}
          >
            {process.env.siteName}
          </Link>
        </LogoWrapper>
      </header>
    </>
  )
}
