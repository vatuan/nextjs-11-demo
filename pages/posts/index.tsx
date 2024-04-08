import { GetStaticProps, GetStaticPropsContext } from 'next'
import React from 'react'

type PostListPageProps = {
  posts: any[]
}

export default function PostListPage({ posts }: PostListPageProps) {
  return (
    <div>
      <h1>PostListPage</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  )
}

export const getStaticProps: GetStaticProps<PostListPageProps> = async (context: GetStaticPropsContext) => {
  // This function from server side and run at build time (on production env)
  // On development env always run this function when request

  const response = await fetch('https://jsonplaceholder.typicode.com/posts?_page=1&_limit=10')
  const data = await response.json()

  // you only see the log on the server (on your terminal) not on browser
  console.log({ data })

  // Recommend: Take necessary data for props to display on page
  // For example I need id and title field
  const necessaryData = data.map((item: any) => ({ id: item.id, title: item.title }))

  return {
    props: {
      posts: necessaryData,
    },
  }
}
