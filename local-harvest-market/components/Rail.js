import { useRef } from 'react'
import styles from './Rail.module.css'

export default function Rail({ children }) {
  const trackRef = useRef(null)

  const scrollBy = (dx) => {
    trackRef.current?.scrollBy({ left: dx, behavior: 'smooth' })
  }

  return (
    <div className={styles.rail}>
      <button type="button" className={`${styles.nav} ${styles.navLeft}`} onClick={() => scrollBy(-320)} aria-label="이전">
        ‹
      </button>
      <div className={styles.track} ref={trackRef}>
        {children}
      </div>
      <button type="button" className={`${styles.nav} ${styles.navRight}`} onClick={() => scrollBy(320)} aria-label="다음">
        ›
      </button>
    </div>
  )
}
