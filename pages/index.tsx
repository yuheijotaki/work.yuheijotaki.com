import { useCallback, useState, KeyboardEvent, useRef } from 'react'
import Head from 'next/head'
import { getPosts } from '@/lib/newt'
import type { Post } from '@/types/post'
import Header from '@/components/header'
import Search from '@/components/search'
import Posts from '@/components/posts'
import styles from '@/styles/page/Home.module.scss'

export default function Home({ posts }: { posts: Post[] }) {
  const metaTitle = process.env.siteName
  const metaDescription = 'yuheijotaki Portfolio Website'
  const metaPageUrl = process.env.siteUrl
  const metaSiteName = process.env.siteName
  const metaImage = `${process.env.siteUrl}${process.env.ogImage}`
  const metaType = 'website'
  const metaCard = process.env.metaCard

  const [category, setCategory] = useState('Front-end')
  const [current, setCurrent] = useState([true, false, false, false])
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([null, null, null, null]);

  const handleKeyDown = useCallback((event: KeyboardEvent<HTMLButtonElement>) => {
    const currentIndex = current.findIndex((isCurrent) => isCurrent);

    switch (event.key) {
      case 'ArrowRight':
        event.preventDefault();
        const nextIndex = (currentIndex + 1) % current.length;
        tabRefs.current[nextIndex]?.focus();
        tabRefs.current[nextIndex]?.click();
        break;
      case 'ArrowLeft':
        event.preventDefault();
        const prevIndex = (currentIndex - 1 + current.length) % current.length;
        tabRefs.current[prevIndex]?.focus();
        tabRefs.current[prevIndex]?.click();
        break;
      case 'Home':
        event.preventDefault();
        tabRefs.current[0]?.focus();
        tabRefs.current[0]?.click();
        break;
      case 'End':
        event.preventDefault();
        tabRefs.current[current.length - 1]?.focus();
        tabRefs.current[current.length - 1]?.click();
        break;
    }
  }, [current]);

  const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    const clicked = (event.target as HTMLButtonElement).textContent;
    const newCurrent = [false, false, false, false];

    if (clicked === 'Front-end') {
      setCategory('Front-end');
      newCurrent[0] = true;
    } else if (clicked === 'WordPress') {
      setCategory('WordPress');
      newCurrent[1] = true;
    } else if (clicked === 'Web Design') {
      setCategory('Web Design');
      newCurrent[2] = true;
    } else if (clicked === 'Tumblr') {
      setCategory('Tumblr');
      newCurrent[3] = true;
    }

    setCurrent(newCurrent);
  }, []);

  const handleLogoClick = useCallback(() => {
    setCategory('Front-end');
    setCurrent([true, false, false, false]);
  }, []);

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:site_name" content={metaSiteName} />
        <meta property="og:url" content={metaPageUrl} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content={metaType} />
        <meta property="og:image" content={metaImage} />
        <meta name="twitter:url" content={metaPageUrl} />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:card" content={metaCard} />
        <meta name="twitter:image:src" content={metaImage} />
      </Head>
      <Header onLogoClick={handleLogoClick} isTopPage={true} />
      <main>
        <Search
          category={category}
          current={current}
          handleClick={handleClick}
          onKeyDown={handleKeyDown}
          tabRefs={tabRefs}
        />
        <div
          className={styles.works}
          role="tabpanel"
          id="frontend-panel"
          aria-labelledby="frontend-tab"
          hidden={category !== 'Front-end'}
        >
          <Posts
            current=''
            posts={posts}
            filter={category}
          />
        </div>
        <div
          className={styles.works}
          role="tabpanel"
          id="wordpress-panel"
          aria-labelledby="wordpress-tab"
          hidden={category !== 'WordPress'}
        >
          <Posts
            current=''
            posts={posts}
            filter={category}
          />
        </div>
        <div
          className={styles.works}
          role="tabpanel"
          id="webdesign-panel"
          aria-labelledby="webdesign-tab"
          hidden={category !== 'Web Design'}
        >
          <Posts
            current=''
            posts={posts}
            filter={category}
          />
        </div>
        <div
          className={styles.works}
          role="tabpanel"
          id="tumblr-panel"
          aria-labelledby="tumblr-tab"
          hidden={category !== 'Tumblr'}
        >
          <Posts
            current=''
            posts={posts}
            filter={category}
          />
        </div>
      </main>
    </>
  )
}

export const getServerSideProps = async () => {
  const posts = await getPosts()
  return {
    props: {
      posts,
    },
  }
}
