import { createContext, ReactNode, useCallback, useState } from 'react'
import styles from '@/styles/components/Search.module.scss'

export default function Search({ children }: { children: ReactNode }) {

  let [category, setCategory] = useState('All')
  let [current, setCurrent] = useState([true, false, false, false, false])
  // console.log('category', category)
  // console.log('current', current)

  const handleClick = useCallback((e: any) => {
    let clicked = e.target.innerHTML
    if (clicked === 'All') {
      setCategory(category = 'All')
      setCurrent(current = [true, false, false, false, false])
    } else if (clicked === 'Front-end') {
      setCategory(category = 'Front-end')
      setCurrent(current = [false, true, false, false, false])
    } else if (clicked === 'WordPress') {
      setCategory(category = 'WordPress')
      setCurrent(current = [false, false, true, false, false])
    } else if (clicked === 'Web Design') {
      setCategory(category = 'Web Design')
      setCurrent(current = [false, false, false, true, false])
    } else if (clicked === 'Tumblr') {
      setCategory(category = 'Tumblr')
      setCurrent(current = [false, false, false, false, true])
    }
  }, [])

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
