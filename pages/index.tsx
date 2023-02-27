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

  let [category, setCategory] = useState('All')
  let [current, setCurrent] = useState([true, false, false, false, false])
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
      <Header>
      </Header>
      <Search
        category={category}
        current={current}
        handleClick={handleClick}
      >
      </Search>
      <section className={styles.works}>
        <Posts
          current=''
          posts={posts}
          filter={category}
        ></Posts>
      </section>
    </>
  )
}

export const getStaticProps = async () => {
  const posts = await getPosts()
  return {
    props: {
      posts,
    },
  }
}
