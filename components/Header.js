import { useState } from 'react'
import styles from './Header.module.css'

const NAV_ITEMS = [
  { href: '#home', label: '홈' },
  { href: '#categories', label: '건강정보' },
  { href: '#articles', label: '건강이야기' },
  { href: '#consult', label: '상담예약' },
  { href: '#footer', label: '문의' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <a href="#home" className={styles.logo}>
          <img src="/logo.svg" alt="리얼 로고" className={styles.logoImg} />
          <span className={styles.logoText}>
            <span className={styles.logoMark}>리얼</span>
            <span className={styles.logoSub}>REAL</span>
          </span>
        </a>

        <nav className={`${styles.nav} ${open ? styles.navOpen : ''}`}>
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={styles.navLink}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a href="#consult" className={styles.navCta} onClick={() => setOpen(false)}>
            건강 상담 신청
          </a>
        </nav>

        <button
          type="button"
          className={styles.menuBtn}
          aria-label="메뉴 열기"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? '✕' : '☰'}
        </button>
      </div>
    </header>
  )
}
