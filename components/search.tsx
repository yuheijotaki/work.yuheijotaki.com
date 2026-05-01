'use client'

import styles from '@/styles/components/Search.module.scss'

interface SearchProps {
  current: boolean[];
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
  setTabRef: (index: number, el: HTMLButtonElement | null) => void;
}

export default function Search({
  current,
  handleClick,
  onKeyDown,
  setTabRef
}: SearchProps) {
  return (
    <div className={styles.search}>
      <div className={styles.search__header}>
        <p className={styles.search__title}>Filter:</p>
      </div>
      <div role="tablist" aria-label="カテゴリーフィルター">
        <div className={styles.search__list}>
          <button
            ref={(el) => { setTabRef(0, el) }}
            role="tab"
            aria-selected={current[0]}
            aria-controls="frontend-panel"
            id="frontend-tab"
            className={`${styles.search__item} ${current[0] ? styles['is-current'] : ''}`}
            onClick={handleClick}
            onKeyDown={onKeyDown}
            tabIndex={current[0] ? 0 : -1}
          >
            Front-end
          </button>
          <button
            ref={(el) => { setTabRef(1, el) }}
            role="tab"
            aria-selected={current[1]}
            aria-controls="wordpress-panel"
            id="wordpress-tab"
            className={`${styles.search__item} ${current[1] ? styles['is-current'] : ''}`}
            onClick={handleClick}
            onKeyDown={onKeyDown}
            tabIndex={current[1] ? 0 : -1}
          >
            WordPress
          </button>
          <button
            ref={(el) => { setTabRef(2, el) }}
            role="tab"
            aria-selected={current[2]}
            aria-controls="webdesign-panel"
            id="webdesign-tab"
            className={`${styles.search__item} ${current[2] ? styles['is-current'] : ''}`}
            onClick={handleClick}
            onKeyDown={onKeyDown}
            tabIndex={current[2] ? 0 : -1}
          >
            Web Design
          </button>
          <button
            ref={(el) => { setTabRef(3, el) }}
            role="tab"
            aria-selected={current[3]}
            aria-controls="tumblr-panel"
            id="tumblr-tab"
            className={`${styles.search__item} ${current[3] ? styles['is-current'] : ''}`}
            onClick={handleClick}
            onKeyDown={onKeyDown}
            tabIndex={current[3] ? 0 : -1}
          >
            Tumblr
          </button>
        </div>
      </div>
    </div>
  )
}
