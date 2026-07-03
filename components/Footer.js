import styles from './Footer.module.css'

const SOCIAL_LINKS = [
  { label: '카카오톡', icon: '💬', href: '#' },
  { label: '인스타그램', icon: '📷', href: '#' },
  { label: '유튜브', icon: '▶️', href: '#' },
  { label: '블로그', icon: '✍️', href: '#' },
]

export default function Footer() {
  return (
    <footer id="footer" className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brandBlock}>
          <p className={styles.brand}>리얼 REAL</p>
          <p className={styles.desc}>진짜 건강 이야기를 전합니다.</p>
        </div>

        <div className={styles.contactBlock}>
          <p>대표번호 1588-0000</p>
          <p>운영시간 평일 09:00 ~ 18:00</p>
          <p>이메일 hello@real-health.kr</p>
        </div>

        <div className={styles.socialBlock}>
          {SOCIAL_LINKS.map((s) => (
            <a key={s.label} href={s.href} className={styles.socialBtn} aria-label={s.label}>
              <span>{s.icon}</span>
              <span>{s.label}</span>
            </a>
          ))}
        </div>
      </div>
      <p className={styles.copyright}>© {new Date().getFullYear()} REAL. All rights reserved.</p>
    </footer>
  )
}
