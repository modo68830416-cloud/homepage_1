import '../global.css'
import { Analytics } from '@vercel/analytics/react'
import CustomCursor from '../components/CustomCursor'

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <CustomCursor />
      <Analytics />
    </>
  )
}
