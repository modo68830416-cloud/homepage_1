import { useEffect, useRef, useState } from 'react'
import styles from './Header.module.css'

export default function Header({ category, region, onCategoryChange, onRegionChange, categories, regions }) {
  const [condensed, setCondensed] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 60 && !expanded) setCondensed(true)
      if (window.scrollY <= 60) setCondensed(false)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [expanded])

  useEffect(() => {
    const onClickAway = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false)
    }
    document.addEventListener('mousedown', onClickAway)
    return () => document.removeEventListener('mousedown', onClickAway)
  }, [])

  const openSearch = () => {
    setExpanded(true)
    setCondensed(false)
  }

  const closeSearch = () => {
    setExpanded(false)
    if (window.scrollY > 60) setCondensed(true)
  }

  return (
    <header className={`${styles.header} ${condensed ? styles.headerCondensed : ''}`}>
      <div className={styles.inner}>
        <a href="#home" className={styles.logo}>
          <img src="/logo.svg" alt="로컬하베스트 로고" className={styles.logoImg} />
          <span className={styles.logoText}>로컬하베스트</span>
        </a>

        {condensed && !expanded ? (
          <button type="button" className={styles.pillCondensed} onClick={openSearch}>
            <span className={styles.searchIcon}>🔍</span>
            <span>품목 · 카테고리 · 지역</span>
          </button>
        ) : (
          <div className={`${styles.pill} ${expanded ? styles.pillExpanded : ''}`} onClick={openSearch}>
            <div className={styles.pillSeg}>
              <span className={styles.pillLabel}>품목</span>
              <span className={styles.pillValue}>어디서 찾으세요?</span>
            </div>
            <span className={styles.pillDivider} />
            <div className={styles.pillSeg}>
              <span className={styles.pillLabel}>카테고리</span>
              <select
                className={styles.pillSelect}
                value={category}
                onChange={(e) => onCategoryChange(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <span className={styles.pillDivider} />
            <div className={styles.pillSeg}>
              <span className={styles.pillLabel}>지역</span>
              <select
                className={styles.pillSelect}
                value={region}
                onChange={(e) => onRegionChange(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              >
                {regions.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="button"
              className={styles.pillSearchBtn}
              onClick={(e) => {
                e.stopPropagation()
                closeSearch()
                document.getElementById('market')?.scrollIntoView({ behavior: 'smooth' })
              }}
              aria-label="검색"
            >
              🔍
            </button>
          </div>
        )}

        <div className={styles.right}>
          <a href="#sell" className={styles.hostLink}>
            판매자 등록하기
          </a>
          <button type="button" className={styles.globeBtn} aria-label="언어 및 지역">
            🌐
          </button>
          <div className={styles.menuWrap} ref={menuRef}>
            <button
              type="button"
              className={styles.menuBtn}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="메뉴 열기"
            >
              <span className={styles.hamburger}>☰</span>
              <span className={styles.avatar}>🙂</span>
            </button>
            {menuOpen && (
              <div className={styles.dropdown}>
                <a href="#sell" className={styles.dropdownItem} onClick={() => setMenuOpen(false)}>
                  판매자 입점 신청
                </a>
                <a href="#market" className={styles.dropdownItem} onClick={() => setMenuOpen(false)}>
                  전체 상품 보기
                </a>
                <a href="#footer" className={styles.dropdownItem} onClick={() => setMenuOpen(false)}>
                  고객센터
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {expanded && <div className={styles.overlay} onClick={closeSearch} />}
    </header>
  )
}
