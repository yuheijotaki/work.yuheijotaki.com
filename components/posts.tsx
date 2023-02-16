import Link from 'next/link'
import { getPosts } from '@/lib/newt'
import type { Post } from '@/types/post'
import nl2br from 'react-nl2br'
import variables from '@/styles/variables.module.scss';
import styles from '@/styles/Home.module.scss'

export default function Posts({ posts }: { posts: Post[] }) {
  // console.log(post.categories)
  return (
    <>
      <ul>
        {posts.map((post) => {
          return (
            <li key={post._id}>
              <Link href={`/post/${post.slug}`} style={{ color: variables.primaryColor }}>
                <h1 className={styles.test}>{post.title}</h1>
                <p>{nl2br(post.titleCustom)}</p>
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
                }</p>
                <p>{post.thumbnail.src}</p>
                <ul>
                  <li>{post.images.map((object: { src: string }) => object.src)}</li>
                </ul>
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

// import Head from 'next/head'
// import Link from 'next/link'
// import variables from '@/styles/variables.module.scss';
// import styles from '@/styles/Home.module.scss'
// import { getPosts } from '@/lib/newt'
// import type { Post } from '@/types/post'
// import nl2br from 'react-nl2br'

// export default function Home({ posts }: { posts: Post[] }) {
//   return (
//     <>
//       <Head>
//         <title>Newt・Next.jsブログ</title>
//         <meta name="description" content="NewtとNext.jsを利用したブログです" />
//       </Head>
//       <main className={styles.main} >
//         <ul>
//           {posts.map((post) => {
//             return (
//               <li key={post._id}>
//                 <Link href={`post/${post.slug}`} style={{ color: variables.primaryColor }}>
//                   <h1 className={styles.test}>{post.title}</h1>
//                   <p>{nl2br(post.titleCustom)}</p>
//                   <p>{post.slug}</p>
//                   <p>{post.date}</p>
//                   <p>{post.url}</p>
//                   <p>{post.category.map((value: string) => value).join(', ')}</p>
//                   <p>{nl2br(post.credit)}</p>
//                   <p>{post.colorBackground}</p>
//                   <p>{post.colorText}</p>
//                   <p>{post.colorCustom}</p>
//                   <p>{post.archive
//                     ? 'archive true'
//                     : 'archive false'
//                   }</p>
//                   <p>{post.notAvailable
//                     ? 'notAvailable true'
//                     : 'notAvailable false'
//                   }</p>
//                   <p>{post.thumbnail.src}</p>
//                   <ul>
//                     <li>{post.images.map((object: { src: string }) => object.src)}</li>
//                   </ul>
//                 </Link>
//               </li>
//             )
//           })}
//         </ul>
//       </main>
//     </>
//   )
// }

// export const getStaticProps = async () => {
//   const posts = await getPosts()
//   return {
//     props: {
//       posts,
//     },
//   }
// }
