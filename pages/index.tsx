import { useCallback, useState } from 'react'
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

  const handleClick = useCallback((event: any) => {
    const clicked = event.target.innerHTML
    if (clicked === 'Front-end') {
      setCategory('Front-end')
      setCurrent([true, false, false, false])
    } else if (clicked === 'WordPress') {
      setCategory('WordPress')
      setCurrent([false, true, false, false])
    } else if (clicked === 'Web Design') {
      setCategory('Web Design')
      setCurrent([false, false, true, false])
    } else if (clicked === 'Tumblr') {
      setCategory('Tumblr')
      setCurrent([false, false, false, true])
    }
  }, [])

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
      <Header />
      <main>
        <Search
          category={category}
          current={current}
          handleClick={handleClick}
        />
        <section className={styles.works}>
          <Posts
            current=''
            posts={posts}
            filter={category}
          />
        </section>
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
