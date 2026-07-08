import styles from './Footer.module.css'

const SOCIAL_LINKS = [
  { label: '카카오톡', icon: '💬', href: '#' },
  { label: '인스타그램', icon: '📷', href: '#' },
  { label: '유튜브', icon: '▶️', href: '#' },
  { label: '블로그', icon: '✍️', href: '#' },
]

const FOOTER_COLUMNS = [
  {
    title: '바로가기',
    links: ['건강 상담 예약', '가까운 병원 찾기', '건강정보 검색', '명의 찾기'],
  },
  {
    title: '블로그·뉴스·앱',
    links: ['리얼 블로그', '건강 뉴스', '앱 다운로드', '뉴스레터 구독'],
  },
  {
    title: '리얼 소개',
    links: ['회사 소개', '채용 정보', '제휴 문의', '보도자료'],
  },
  {
    title: '이용안내',
    links: ['이용약관', '개인정보처리방침', '위치기반서비스 이용약관', '고객센터'],
  },
]

export default function Footer() {
  return (
    <footer id="footer" className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.topRow}>
          <div className={styles.brandBlock}>
            <p className={styles.brand}>리얼 REAL</p>
            <p className={styles.desc}>진짜 건강 이야기를 전합니다.</p>
            <div className={styles.socialBlock}>
              {SOCIAL_LINKS.map((s) => (
                <a key={s.label} href={s.href} className={styles.socialBtn} aria-label={s.label}>
                  <span>{s.icon}</span>
                  <span>{s.label}</span>
                </a>
              ))}
            </div>
          </div>

          <div className={styles.columns}>
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.title} className={styles.column}>
                <p className={styles.columnTitle}>{col.title}</p>
                <ul className={styles.columnList}>
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.contactBlock}>
          <p>대표번호 1588-0000</p>
          <p>운영시간 평일 09:00 ~ 18:00</p>
          <p>이메일 hello@real-health.kr</p>
        </div>
      </div>
      <p className={styles.copyright}>© {new Date().getFullYear()} REAL. All rights reserved.</p>
    </footer>
  )
}
