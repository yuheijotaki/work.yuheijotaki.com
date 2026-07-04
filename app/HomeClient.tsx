'use client'

import { useState, KeyboardEvent, useRef } from 'react'
import type { PostListItem } from '@/types/post'
import {
  CATEGORIES,
  DEFAULT_CATEGORY,
  type Category,
  type CategoryFilter,
} from '@/lib/categories'
import Header from '@/components/Header'
import Search from '@/components/Search'
import Posts from '@/components/Posts'
import styles from '@/styles/page/Home.module.scss'

export default function HomeClient({ posts }: { posts: PostListItem[] }) {
  const [activeCategory, setActiveCategory] = useState<Category>(DEFAULT_CATEGORY)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>(
    Array<HTMLButtonElement | null>(CATEGORIES.length).fill(null)
  )

  const focusTab = (index: number) => {
    const tab = tabRefs.current[index]
    if (!tab) return
    tab.focus()
    setActiveCategory(CATEGORIES[index].label)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const currentIndex = CATEGORIES.findIndex((c) => c.label === activeCategory)
    const lastIndex = CATEGORIES.length - 1

    switch (event.key) {
      case 'ArrowRight':
        event.preventDefault()
        focusTab((currentIndex + 1) % CATEGORIES.length)
        break
      case 'ArrowLeft':
        event.preventDefault()
        focusTab((currentIndex - 1 + CATEGORIES.length) % CATEGORIES.length)
        break
      case 'Home':
        event.preventDefault()
        focusTab(0)
        break
      case 'End':
        event.preventDefault()
        focusTab(lastIndex)
        break
    }
  }

  const handleSelect = (category: Category) => {
    setActiveCategory(category)
  }

  const handleLogoClick = () => {
    setActiveCategory(DEFAULT_CATEGORY)
  }

  const setTabRef = (index: number, el: HTMLButtonElement | null) => {
    tabRefs.current[index] = el
  }

  return (
    <>
      <Header onLogoClick={handleLogoClick} isTopPage={true} />
      <main>
        <Search
          activeCategory={activeCategory}
          onSelect={handleSelect}
          onKeyDown={handleKeyDown}
          setTabRef={setTabRef}
        />
        {CATEGORIES.map(({ label, slug }) => {
          const filter: CategoryFilter = label === DEFAULT_CATEGORY ? 'all' : label
          const isActive = activeCategory === label
          return (
            <div
              key={slug}
              className={styles.works}
              role="tabpanel"
              id={`${slug}-panel`}
              aria-labelledby={`${slug}-tab`}
              hidden={!isActive}
            >
              {isActive && (
                <Posts current="" posts={posts} filter={filter} priorityFirst={filter === 'all'} />
              )}
            </div>
          )
        })}
      </main>
    </>
  )
}
