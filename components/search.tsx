import { ReactNode } from 'react'
import styles from '@/styles/components/Search.module.scss'

export type Props = {
  category: String
};

export default function Search<Props>({
    children,
    category,
    current,
    handleClick
  }: {
    children: ReactNode,
    category?: String | 'aaaaa',
    current: boolean[],
    handleClick?: any
  }) {

  return (
    <>
      <section className={styles['search']}>
        <h2 className={styles['search__title']}>Filter</h2>
        <ul className={styles['search__list']}>
          <li className={styles['search__item']}>
            <span className={current[0] ? styles['is-current'] : ''} onClick={handleClick}>All</span>
          </li>
          <li className={styles['search__item']}>
            <span className={current[1] ? styles['is-current'] : ''} onClick={handleClick}>Front-end</span>
          </li>
          <li className={styles['search__item']}>
            <span className={current[2] ? styles['is-current'] : ''} onClick={handleClick}>WordPress</span>
          </li>
          <li className={styles['search__item']}>
            <span className={current[3] ? styles['is-current'] : ''} onClick={handleClick}>Web Design</span>
          </li>
          <li className={styles['search__item']}>
            <span className={current[4] ? styles['is-current'] : ''} onClick={handleClick}>Tumblr</span>
          </li>
        </ul>
      </section>
    </>
  )
}
