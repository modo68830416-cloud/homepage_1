import styles from './Footer.module.css'

const SOCIAL_LINKS = [
  { label: '카카오톡', icon: '💬', href: '#' },
  { label: '인스타그램', icon: '📷', href: '#' },
  { label: '유튜브', icon: '▶️', href: '#' },
  { label: '블로그', icon: '✍️', href: 'https://modo6883.blogspot.com/' },
]

const FOOTER_COLUMNS = [
  {
    title: '주요 메뉴',
    links: [
      { label: '건강정보', href: '#health-info' },
      { label: '건강운동', href: '#exercise' },
      { label: '건강생활', href: '#lifestyle' },
      { label: '추천상품', href: '#products' },
      { label: '모모영상', href: '#momo-videos' },
    ],
  },
  {
    title: '메리온 소개',
    links: [
      { label: '브랜드 철학', href: '#about' },
      { label: '모모 캐릭터', href: '#about' },
      { label: '제휴 문의', href: '#' },
    ],
  },
  {
    title: '이용안내',
    links: [
      { label: '개인정보처리방침', href: '#' },
      { label: '이용약관', href: '#' },
      { label: '건강정보 면책 안내', href: '#' },
      { label: '광고 및 제휴 안내', href: '#' },
    ],
  },
]

export default function Footer() {
  return (
    <footer id="footer" className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.topRow}>
          <div className={styles.brandBlock}>
            <p className={styles.brand}>메리온 MERION</p>
            <p className={styles.desc}>오늘도 건강 한걸음, 모모와 함께.</p>
            <div className={styles.socialBlock}>
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className={styles.socialBtn}
                  aria-label={s.label}
                >
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
                    <li key={link.label}>
                      <a href={link.href}>{link.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.disclaimer}>
          <p>
            메리온은 의료기관이 아니며 진단이나 치료를 제공하지 않습니다. 본 콘텐츠는 일반적인 건강정보이며 개인에 따라 차이가
            있을 수 있습니다. 심한 증상이나 응급 신호가 있는 경우 반드시 의료기관을 이용해주세요.
          </p>
          <p>추천상품 콘텐츠 중 일부는 제휴가 포함될 수 있으며, 해당 여부는 콘텐츠 내에 표시됩니다.</p>
        </div>

        <div className={styles.contactBlock}>
          <p>이메일 hello@merion.kr</p>
          <p>운영시간 평일 09:00 ~ 18:00</p>
        </div>
      </div>
      <p className={styles.copyright}>© {new Date().getFullYear()} MERION. All rights reserved.</p>
    </footer>
  )
}
