import Link from 'next/link'
import React from 'react'

type Props = {}

export default function AboutPage({}: Props) {
  return (
    <div>
      About Page
      <Link href="/">Go to home pagw</Link>
    </div>
  )
}
