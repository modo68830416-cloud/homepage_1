
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

const FEATURED_NEWS = [
  { tag: '푸드', emoji: '🍯', title: '"매일 먹으면 좋다"는 그 식품, 진짜 효과 있을까' },
  { tag: '생활건강', emoji: '🧴', title: '"몸속 염증 키운다"… 무심코 반복하는 습관들' },
  { tag: '다이어트', emoji: '🥗', title: '굶지 않고 체중 뺀 사람들의 공통된 식사법' },
  { tag: '이슈', emoji: '🔬', title: 'AI로 질환 조기 발견… 어디까지 왔나' },
]

const TIP_MAIN = {
  tag: '수면',
  emoji: '🌙',
  title: '잠들기 전 스마트폰보다 효과적인 저녁 루틴 5가지',
}

const TIP_SIDE = [
  { tag: '여성건강', emoji: '🦷', title: '양치 잘 해도 사라지지 않는 입 냄새, 원인은 따로 있다' },
  { tag: '체중관리', emoji: '🏃‍♂️', title: '반 년 만에 체중 감량에 성공한 사람들의 공통점' },
]

const TIP_LIST = [
  '커피 끊기 힘든 사람을 위한 혈당 관리 팁 3가지',
  '앉아있는 시간이 긴 직장인을 위한 5분 스트레칭',
  '나이보다 어려 보이는 사람들의 수분 섭취 습관',
  '봄철 알레르기, 약보다 먼저 챙겨야 할 생활 수칙',
  '아침 공복 운동, 정말 다이어트에 효과적일까',
]

const DOCTORS = [
  { emoji: '🩺', name: '김리얼 원장', specialty: '내과·건강검진', hospital: '리얼 헬스 클리닉' },
  { emoji: '🧠', name: '박정신 원장', specialty: '정신건강의학과', hospital: '마음편한의원' },
  { emoji: '🦴', name: '이관절 원장', specialty: '정형외과·재활', hospital: '튼튼정형외과' },
  { emoji: '🍽️', name: '최영양 원장', specialty: '가정의학과·영양', hospital: '균형가정의학과' },
]

const TABS = [
  {
    label: '연재',
    items: [
      { title: '리얼 다이어트 일기 — 3개월의 기록', desc: '평범한 직장인의 체중 감량 여정' },
      { title: '건강검진 A to Z', desc: '연령별로 꼭 챙겨야 할 검진 항목' },
    ],
  },
  {
    label: '건강칼럼',
    items: [
      { title: '전문의가 말하는 진짜 수면의 질', desc: '수면 클리닉 원장이 전하는 현실 조언' },
      { title: '운동을 오래 지속하는 사람들의 비밀', desc: '작심삼일을 이겨내는 습관 설계법' },
    ],
  },
  {
    label: '의료소식',
    items: [
      { title: '올여름 유행 감염병 예방수칙 안내', desc: '지역 보건소 발표 자료 정리' },
      { title: '국내 병원 원격 진료 확대 소식', desc: '달라지는 진료 예약 시스템' },
    ],
  },
  {
    label: '상담사례',
    items: [
      { title: '"3개월 만에 혈압을 낮췄어요"', desc: '실제 상담 회원의 생활습관 개선 사례' },
      { title: '"불면증, 약 없이 나아졌어요"', desc: '수면 상담을 받은 회원의 후기' },
    ],
  },
]

function Home() {
  const [activeCategory, setActiveCategory] = useState(null)
  const [activeTab, setActiveTab] = useState(0)
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
          <img src="/logo.svg" alt="리얼 로고" className={styles.heroLogo} />
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

        <section id="news" className={styles.section}>
          <h2 className={styles.sectionTitle}>최신 건강 이야기</h2>
          <p className={styles.sectionDesc}>리얼 에디터가 매일 엄선해 전하는 오늘의 소식.</p>

          <div className={styles.newsStrip}>
            {FEATURED_NEWS.map((n) => (
              <article key={n.title} className={styles.newsCard}>
                <div className={styles.newsThumb}>{n.emoji}</div>
                <span className={styles.newsTag}>{n.tag}</span>
                <h3 className={styles.newsTitle}>{n.title}</h3>
              </article>
            ))}
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

        <section id="tips" className={styles.section}>
          <h2 className={styles.sectionTitle}>오늘의 건강 팁</h2>
          <p className={styles.sectionDesc}>하루 한 가지, 실천하기 쉬운 건강 습관을 전해드려요.</p>

          <div className={styles.tipLayout}>
            <article className={styles.tipMain}>
              <div className={styles.tipMainThumb}>{TIP_MAIN.emoji}</div>
              <span className={styles.newsTag}>{TIP_MAIN.tag}</span>
              <h3 className={styles.tipMainTitle}>{TIP_MAIN.title}</h3>
            </article>

            <div className={styles.tipSide}>
              {TIP_SIDE.map((t) => (
                <article key={t.title} className={styles.tipSideCard}>
                  <div className={styles.tipSideThumb}>{t.emoji}</div>
                  <div>
                    <span className={styles.newsTag}>{t.tag}</span>
                    <p className={styles.tipSideTitle}>{t.title}</p>
                  </div>
                </article>
              ))}
            </div>

            <ul className={styles.tipTextList}>
              {TIP_LIST.map((title) => (
                <li key={title}>
                  <a href="#tips">{title}</a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="doctors" className={styles.section}>
          <h2 className={styles.sectionTitle}>이달의 명의</h2>
          <p className={styles.sectionDesc}>리얼이 검증한 전문의를 만나보세요.</p>

          <div className={styles.doctorGrid}>
            {DOCTORS.map((d) => (
              <article key={d.name} className={styles.doctorCard}>
                <div className={styles.doctorThumb}>{d.emoji}</div>
                <p className={styles.doctorName}>{d.name}</p>
                <p className={styles.doctorSpecialty}>{d.specialty}</p>
                <p className={styles.doctorHospital}>{d.hospital}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="articles" className={styles.section}>
          <h2 className={styles.sectionTitle}>건강 콘텐츠 더보기</h2>
          <p className={styles.sectionDesc}>원하는 유형을 선택해서 콘텐츠를 확인해보세요.</p>

          <div className={styles.tabNav}>
            {TABS.map((t, i) => (
              <button
                key={t.label}
                type="button"
                className={`${styles.tabBtn} ${activeTab === i ? styles.tabBtnActive : ''}`}
                onClick={() => setActiveTab(i)}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className={styles.tabPanel}>
            {TABS[activeTab].items.map((item) => (
              <a key={item.title} href="#articles" className={styles.tabItem}>
                <p className={styles.tabItemTitle}>{item.title}</p>
                <p className={styles.tabItemDesc}>{item.desc}</p>
              </a>
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
