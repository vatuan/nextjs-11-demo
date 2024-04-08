import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

type Props = {}

export default function PostDetailPage({}: Props) {
  const router = useRouter()
  return (
    <div>
      <p className="text-red-400 font-aeonik font-bold">Post Detail Page</p>
      <div>Query : {JSON.stringify(router.query)}</div>
      <Link href={'/'}>Go to Home page</Link>
    </div>
  )
}
