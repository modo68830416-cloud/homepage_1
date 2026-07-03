
import { useCallback, useEffect, useState } from 'react'
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import styles from '../styles/home.module.css'

const CATEGORIES = [
  { icon: '🏃', label: '운동/피트니스', desc: '내 몸에 맞는 운동법과 루틴을 찾아보세요.' },
  { icon: '🥗', label: '영양/식단', desc: '균형 잡힌 식습관으로 건강을 지키는 방법.' },
  { icon: '😴', label: '수면 관리', desc: '숙면을 위한 습관과 솔루션을 확인하세요.' },
  { icon: '🧠', label: '정신 건강', desc: '마음의 건강도 챙기는 리얼 이야기.' },
  { icon: '⚖️', label: '다이어트', desc: '건강하게 체중을 관리하는 법.' },
  { icon: '👵', label: '시니어 건강', desc: '나이 들수록 더 중요한 건강 관리 팁.' },
  { icon: '👩', label: '여성 건강', desc: '여성을 위한 맞춤 건강 정보.' },
  { icon: '👨', label: '남성 건강', desc: '남성 건강, 놓치기 쉬운 부분까지.' },
  { icon: '💊', label: '만성질환 관리', desc: '당뇨, 고혈압 등 꾸준한 관리 팁.' },
  { icon: '🚑', label: '응급처치', desc: '위급 상황에서 알아야 할 기본 대처법.' },
  { icon: '🩺', label: '건강검진', desc: '정기검진으로 미리 챙기는 건강.' },
  { icon: '📅', label: '상담 예약', desc: '전문가와 1:1 건강 상담을 예약하세요.' },
]

const ARTICLES = [
  { tag: '식습관', title: '물 많이 마시면 정말 건강해질까?', desc: '하루 권장 수분 섭취량과 오해 바로잡기' },
  { tag: '운동', title: '하루 30분 걷기의 놀라운 효과', desc: '가장 쉬운 운동이 가장 강력한 이유' },
  { tag: '멘탈케어', title: '스트레스 관리, 이렇게 시작하세요', desc: '전문가가 알려주는 5분 마음 챙김' },
  { tag: '수면', title: '숙면을 부르는 저녁 습관 5가지', desc: '잠들기 전 스마트폰보다 좋은 것들' },
]

function Home() {
  const [activeCategory, setActiveCategory] = useState(null)
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const toggleCategory = useCallback((label) => {
    setActiveCategory((current) => (current === label ? null : label))
  }, [])

  const activeInfo = CATEGORIES.find((c) => c.label === activeCategory)

  return (
    <>
      <Head>
        <title>리얼 | 진짜 건강 이야기</title>
        <meta name="description" content="리얼이 전하는 믿을 수 있는 건강 이야기" />
      </Head>

      <Header />

      <main className={styles.main}>
        <section id="home" className={styles.hero}>
          <p className={styles.heroKicker}>REAL HEALTH STORY</p>
          <h1 className={styles.heroTitle}>
            리얼이 전하는
            <br />
            진짜 건강 이야기
          </h1>
          <p className={styles.heroDesc}>
            운동, 영양, 수면, 마음 건강까지 — 매일의 건강을 쉽고 편하게 관리하세요.
          </p>
          <div className={styles.heroActions}>
            <a href="#consult" className={styles.btnPrimary}>
              건강 상담 예약하기
            </a>
            <a href="#categories" className={styles.btnSecondary}>
              건강정보 둘러보기
            </a>
          </div>
        </section>

        <section id="categories" className={styles.section}>
          <h2 className={styles.sectionTitle}>관심 있는 건강 주제를 선택하세요</h2>
          <p className={styles.sectionDesc}>버튼을 누르면 간단한 설명을 바로 확인할 수 있어요.</p>

          <div className={styles.categoryGrid}>
            {CATEGORIES.map((c) => (
              <button
                key={c.label}
                type="button"
                className={`${styles.categoryBtn} ${
                  activeCategory === c.label ? styles.categoryBtnActive : ''
                }`}
                onClick={() => toggleCategory(c.label)}
              >
                <span className={styles.categoryIcon}>{c.icon}</span>
                <span>{c.label}</span>
              </button>
            ))}
          </div>

          {activeInfo && (
            <div className={styles.categoryDetail}>
              <span className={styles.categoryDetailIcon}>{activeInfo.icon}</span>
              <div>
                <p className={styles.categoryDetailTitle}>{activeInfo.label}</p>
                <p className={styles.categoryDetailDesc}>{activeInfo.desc}</p>
              </div>
            </div>
          )}
        </section>

        <section id="articles" className={styles.section}>
          <h2 className={styles.sectionTitle}>이번 주 건강 이야기</h2>
          <p className={styles.sectionDesc}>리얼 에디터가 엄선한 건강 콘텐츠를 만나보세요.</p>

          <div className={styles.articleGrid}>
            {ARTICLES.map((a) => (
              <article key={a.title} className={styles.articleCard}>
                <span className={styles.articleTag}>{a.tag}</span>
                <h3 className={styles.articleTitle}>{a.title}</h3>
                <p className={styles.articleDesc}>{a.desc}</p>
                <button type="button" className={styles.articleBtn}>
                  자세히 보기 →
                </button>
              </article>
            ))}
          </div>
        </section>

        <section id="consult" className={styles.consult}>
          <h2 className={styles.consultTitle}>더 궁금한 건강 고민이 있나요?</h2>
          <p className={styles.consultDesc}>리얼 전문 상담팀이 1:1로 답해드립니다.</p>
          <div className={styles.consultActions}>
            <button type="button" className={styles.btnPrimary}>
              📞 전화 상담 신청
            </button>
            <button type="button" className={styles.btnSecondary}>
              💬 온라인 상담 신청
            </button>
            <button type="button" className={styles.btnSecondary}>
              📩 이메일 문의하기
            </button>
          </div>
        </section>
      </main>

      <Footer />

      {showTop && (
        <button type="button" className={styles.topBtn} onClick={scrollToTop} aria-label="맨 위로">
          ↑
        </button>
      )}
    </>
  )
}

export default Home
