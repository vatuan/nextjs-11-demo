import '../styles/globals.css'
import localFont from 'next/font/local'
import clsx from 'clsx'

const myFont = localFont({ src: '../public/fonts/Aeonik-Regular.otf', variable: '--font-aeonik' })

function MyApp({ Component, pageProps }) {
  return (
    <main className={clsx(myFont.className)}>
      <Component {...pageProps} />
    </main>
  )
}

export default MyApp
