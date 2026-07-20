import { useState } from 'react'
import styles from './Header.module.css'

const NAV_ITEMS = [
  { href: '#home', label: '홈' },
  { href: '#health-info', label: '건강정보' },
  { href: '#exercise', label: '건강운동' },
  { href: '#lifestyle', label: '건강생활' },
  { href: '#products', label: '추천상품' },
  { href: '#momo-videos', label: '모모영상' },
  { href: '#blog', label: '블로그' },
  { href: '#about', label: '메리온 소개' },
]

function focusSearch() {
  const input = document.getElementById('search-input')
  document.getElementById('search')?.scrollIntoView({ behavior: 'smooth' })
  input?.focus({ preventScroll: true })
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const [tipOpen, setTipOpen] = useState(true)

  return (
    <>
      {tipOpen && (
        <div className={styles.tipBar}>
          <div className={styles.tipInner}>
            <span className={styles.tipBadge}>오늘의 안내</span>
            <span className={styles.tipText}>
              무더운 여름, 물 한 잔 더 마시는 건 어떠세요? 오늘의 건강 한걸음 확인하기 →
            </span>
            <button
              type="button"
              className={styles.tipClose}
              aria-label="안내 닫기"
              onClick={() => setTipOpen(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <header className={styles.header}>
        <div className={styles.inner}>
          <a href="#home" className={styles.logo}>
            <img src="/images/30_merion_logo.webp" alt="메리온 로고" className={styles.logoImg} />
            <span className={styles.logoText}>
              <span className={styles.logoMark}>메리온</span>
              <span className={styles.logoSub}>MERION</span>
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
            <a href="#today-step" className={styles.navCta} onClick={() => setOpen(false)}>
              오늘의 한걸음 시작하기
            </a>
          </nav>

          <div className={styles.headerActions}>
            <button
              type="button"
              className={styles.searchBtn}
              aria-label="건강정보 검색"
              onClick={focusSearch}
            >
              🔍
            </button>

            <button
              type="button"
              className={styles.menuBtn}
              aria-label="메뉴 열기"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </header>
    </>
  )
}
