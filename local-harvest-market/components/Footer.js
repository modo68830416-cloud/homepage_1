import styles from './Footer.module.css'

const COLUMNS = [
  {
    title: '고객 지원',
    links: ['자주 묻는 질문', '배송·교환·환불', '안전거래 안내', '고객센터'],
  },
  {
    title: '커뮤니티',
    links: ['생산자 이야기', '지역 특산물 캠페인', '함께 나누기', '이벤트'],
  },
  {
    title: '판매하기',
    links: ['판매자 입점 신청', '판매자 가이드', '수수료 안내', '판매자 커뮤니티'],
  },
  {
    title: '로컬하베스트 소개',
    links: ['회사 소개', '채용', '뉴스룸', '이용약관'],
  },
]

const SOCIAL_LINKS = [
  { label: '인스타그램', icon: '📷', href: '#' },
  { label: '유튜브', icon: '▶️', href: '#' },
  { label: '블로그', icon: '✍️', href: '#' },
  { label: '카카오톡', icon: '💬', href: '#' },
]

export default function Footer() {
  return (
    <footer id="footer" className={styles.footer}>
      <div className={styles.columns}>
        {COLUMNS.map((col) => (
          <div key={col.title} className={styles.column}>
            <p className={styles.columnTitle}>{col.title}</p>
            <ul className={styles.columnList}>
              {col.links.map((link) => (
                <li key={link}>
                  <a href="#" className={styles.columnLink}>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className={styles.bottomBar}>
        <p className={styles.copyright}>© {new Date().getFullYear()} LOCAL HARVEST, Inc.</p>
        <div className={styles.bottomRight}>
          <span className={styles.localeItem}>🌐 한국어 (KR)</span>
          <span className={styles.localeItem}>₩ KRW</span>
          <div className={styles.socialBlock}>
            {SOCIAL_LINKS.map((s) => (
              <a key={s.label} href={s.href} className={styles.socialBtn} aria-label={s.label}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
