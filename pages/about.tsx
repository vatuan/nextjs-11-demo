import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

type Props = {}

export default function AboutPage({}: Props) {
  const router = useRouter()

  console.log('About query: ', router.query)

  return (
    <div>
      About Page
      <Link href="/">Go to home pagw</Link>
    </div>
  )
}

export async function getServerSideProps({ req, res }) {
  return {
    props: {}, // will be passed to the page component as props
  }
}
