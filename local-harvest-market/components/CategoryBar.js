import { useRef } from 'react'
import styles from './CategoryBar.module.css'

const ICONS = {
  전체: '🧺',
  농산물: '🌾',
  수산물: '🐟',
  축산물: '🥩',
  가공식품: '🍯',
  공예품: '🏺',
}

export default function CategoryBar({ categories, active, onSelect }) {
  const trackRef = useRef(null)

  const scrollBy = (dx) => {
    trackRef.current?.scrollBy({ left: dx, behavior: 'smooth' })
  }

  return (
    <div className={styles.bar}>
      <button
        type="button"
        className={`${styles.arrow} ${styles.arrowLeft}`}
        onClick={() => scrollBy(-240)}
        aria-label="이전"
      >
        ‹
      </button>

      <div className={styles.track} ref={trackRef}>
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            className={`${styles.item} ${active === c ? styles.itemActive : ''}`}
            onClick={() => onSelect(c)}
          >
            <span className={styles.icon}>{ICONS[c] || '📦'}</span>
            <span className={styles.label}>{c}</span>
          </button>
        ))}
      </div>

      <button
        type="button"
        className={`${styles.arrow} ${styles.arrowRight}`}
        onClick={() => scrollBy(240)}
        aria-label="다음"
      >
        ›
      </button>
    </div>
  )
}
