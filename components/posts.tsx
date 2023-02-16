import Link from 'next/link'
import { getPosts } from '@/lib/newt'
import type { Post } from '@/types/post'
import nl2br from 'react-nl2br'
import variables from '@/styles/variables.module.scss';
import styles from '@/styles/Posts.module.scss'

export default function Posts({ posts }: { posts: Post[] }) {
  return (
    <>
      <ul>
        {posts.map((post) => {
          return (
            <li key={post._id}>
              <Link href={`/post/${post.slug}`} style={{ color: variables.primaryColor }}>
                <p className={styles.test}>{post.title}</p>
                <img src={post.thumbnail.src} alt={post.title} width="200" />
                {/* <p>{nl2br(post.titleCustom)}</p>
                <p>{post.slug}</p>
                <p>{post.date}</p>
                <p>{post.url}</p>
                <p>{post.categories.map((object: { name: string }) => object.name).join(', ')}</p>
                <p>{nl2br(post.credit)}</p>
                <p>{post.colorBackground}</p>
                <p>{post.colorText}</p>
                <p>{post.colorCustom}</p>
                <p>{post.archive
                  ? 'archive true'
                  : 'archive false'
                }</p>
                <p>{post.notAvailable
                  ? 'notAvailable true'
                  : 'notAvailable false'
                }</p> */}
              </Link>
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
