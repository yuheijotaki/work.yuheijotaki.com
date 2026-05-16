'use client'

import { CATEGORIES, type Category } from '@/lib/categories'
import styles from '@/styles/components/Search.module.scss'

interface SearchProps {
  activeCategory: Category
  onSelect: (category: Category) => void
  onKeyDown: (event: React.KeyboardEvent<HTMLButtonElement>) => void
  setTabRef: (index: number, el: HTMLButtonElement | null) => void
}

export default function Search({
  activeCategory,
  onSelect,
  onKeyDown,
  setTabRef,
}: SearchProps) {
  return (
    <div className={styles.search}>
      <div className={styles.search__header}>
        <p className={styles.search__title}>Filter:</p>
      </div>
      <div role="tablist" aria-label="カテゴリーフィルター">
        <div className={styles.search__list}>
          {CATEGORIES.map(({ label, slug }, index) => {
            const isCurrent = activeCategory === label
            return (
              <button
                key={slug}
                ref={(el) => { setTabRef(index, el) }}
                role="tab"
                aria-selected={isCurrent}
                aria-controls={`${slug}-panel`}
                id={`${slug}-tab`}
                className={`${styles.search__item} ${isCurrent ? styles['is-current'] : ''}`}
                onClick={() => { onSelect(label) }}
                onKeyDown={onKeyDown}
                tabIndex={isCurrent ? 0 : -1}
              >
                {label}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
