import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()

  function goToPostDetailPage() {
    router.push({
      pathname: '/posts/[postId]',
      query: {
        postId: 123,
        ref: 'social',
      },
    })
  }
  return (
    <div>
      <Head>
        <title>NextJs Demo 11</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <h1>Home page</h1>
        <button onClick={goToPostDetailPage}>Go to post detail page</button>

        <p className="font-bold">Test</p>

        <div style={{ marginTop: '2000px' }}>
          <Link href="/about" prefetch={false}>
            Go to about page
          </Link>
        </div>
      </div>
    </div>
  )
}
