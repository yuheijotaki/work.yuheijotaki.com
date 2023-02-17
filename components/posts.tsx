import Link from 'next/link'
import { getPosts } from '@/lib/newt'
import type { Post } from '@/types/post'
import styles from '@/styles/components/Posts.module.scss'

export default function Posts({ posts, current }: { posts: Post[], current: string }) {
  let detectCurrent = (post: Post) => {
    if (current === post.slug) {
      return (
        <span className={`${styles['anchor']} ${styles['is-text']}`}>
          <p className={styles['image']}>
            <img src={post.thumbnail.src} alt={post.title} width="200" />
          </p>
          <section className="content">
            <h3 className={styles['title']}>{post.title}</h3>
            <div className={styles['meta']}>
              <p className={styles['date']}>{post.date}</p>
              <p className={styles['category']}>{post.categories.map((object: { name: string }) => object.name).join(', ')}</p>
            </div>
          </section>
        </span>
      )
    } else {
      return (
        <Link href={`/post/${post.slug}`} className={`${styles['anchor']} ${styles['is-link']}`}>
          <p className={styles['image']}>
            <img src={post.thumbnail.src} alt={post.title} width="200" />
          </p>
          <section className="content">
            <h3 className={styles['title']}>{post.title}</h3>
            <div className={styles['meta']}>
              <p className={styles['date']}>{post.date}</p>
              <p className={styles['category']}>{post.categories.map((object: { name: string }) => object.name).join(', ')}</p>
            </div>
          </section>
        </Link>
      )
    }
  }

  return (
    <>
      <ul className={styles['posts']}>
        {posts.map((post) => {
          return (
            <li key={post._id} className={styles['posts__item']}>
              {detectCurrent(post)}
            </li>
          )
        })}
      </ul>
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
