import styles from '@/styles/components/Search.module.scss'

type SearchProps = {
  category: string;
  current: boolean[];
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Search({
  category,
  current,
  handleClick
}: SearchProps) {
  return (
    <>
      <section className={styles['search']}>
        <h2 className={styles['search__title']}>Filter:</h2>
        <ul className={styles['search__list']}>
          <li className={styles['search__item']}>
            <button className={current[0] ? styles['is-current'] : ''} onClick={handleClick}>Front-end</button>
          </li>
          <li className={styles['search__item']}>
            <button className={current[1] ? styles['is-current'] : ''} onClick={handleClick}>WordPress</button>
          </li>
          <li className={styles['search__item']}>
            <button className={current[2] ? styles['is-current'] : ''} onClick={handleClick}>Web Design</button>
          </li>
          <li className={styles['search__item']}>
            <button className={current[3] ? styles['is-current'] : ''} onClick={handleClick}>Tumblr</button>
          </li>
        </ul>
      </section>
    </>
  )
}
