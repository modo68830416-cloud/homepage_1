

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

const QUICK_ACTIONS = [
  {
    icon: '🔍',
    title: '건강정보 검색',
    desc: '증상, 질환명, 키워드로 검색해 원하는 정보를 바로 찾아보세요.',
    cta: '검색하러 가기',
    href: '#categories',
  },
  {
    icon: '📍',
    title: '가까운 병원 찾기',
    desc: '전국 제휴 병·의원 300여 곳 중 내 위치에서 가장 가까운 곳을 안내합니다.',
    cta: '병원 찾기',
    href: '#doctors',
  },
  {
    icon: '🗓️',
    title: '진료 예약하기',
    desc: '대면 진료와 비대면(화상) 진료 중 원하는 방식으로 예약할 수 있어요.',
    cta: '예약하러 가기',
    href: '#consult',
  },
]

const SYMPTOM_SLIDES = [
  { icon: '🤒', title: '감기·몸살 기운이 있어요', desc: '발열, 근육통 등 감기 증상이 있을 때 확인해야 할 것들.' },
  { icon: '🤢', title: '속이 더부룩하고 소화가 안 돼요', desc: '반복되는 소화불량, 원인과 생활 관리법을 알아보세요.' },
  { icon: '🤕', title: '두통이나 어지럼증이 있어요', desc: '단순 두통과 병원에 가야 하는 두통을 구분하는 방법.' },
  { icon: '🌿', title: '피부 트러블이 계속돼요', desc: '만성 피부 트러블의 흔한 원인과 관리 팁.' },
  { icon: '😣', title: '스트레스·불안감이 심해요', desc: '마음 건강을 위한 첫걸음, 전문가와 상담해보세요.' },
  { icon: '🦵', title: '관절이나 근육이 아파요', desc: '일상 속 통증 관리와 병원을 찾아야 할 신호들.' },
]

const CARE_GROUPS = [
  {
    icon: '🏥',
    title: '진료받기',
    desc: '지금 필요한 진료와 검진을 안내해드려요.',
    items: ['건강검진', '상담 예약', '응급처치', '만성질환 관리'],
  },
  {
    icon: '🌱',
    title: '건강하게 살기',
    desc: '일상 속 습관으로 건강을 관리하는 방법.',
    items: ['운동/피트니스', '영양/식단', '수면 관리', '다이어트'],
  },
  {
    icon: '🤝',
    title: '이런 도움이 필요하신가요',
    desc: '생애주기와 상황에 맞는 맞춤 건강정보.',
    items: ['정신 건강', '시니어 건강', '여성 건강', '남성 건강'],
  },
]

const FEATURED_NEWS = [
  { tag: '푸드', image: '/images/news-food.jpg', title: '"매일 먹으면 좋다"는 그 식품, 진짜 효과 있을까' },
  { tag: '생활건강', image: '/images/news-lifestyle.jpg', title: '"몸속 염증 키운다"… 무심코 반복하는 습관들' },
  { tag: '다이어트', image: '/images/news-diet.jpg', title: '굶지 않고 체중 뺀 사람들의 공통된 식사법' },
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

const FAQ_ITEMS = [
  {
    q: '커피 끊기 힘든 사람을 위한 혈당 관리 팁 3가지',
    a: '카페인을 완전히 끊기보다 섭취 시간과 양을 조절하는 것이 현실적이에요. 공복 커피는 피하고, 식후 30분 이후에 마시면 혈당 스파이크를 줄일 수 있습니다.',
  },
  {
    q: '앉아있는 시간이 긴 직장인을 위한 5분 스트레칭',
    a: '1시간마다 자리에서 일어나 목·어깨·허리를 순서대로 풀어주는 것만으로도 혈액순환과 자세 개선에 큰 도움이 됩니다.',
  },
  {
    q: '나이보다 어려 보이는 사람들의 수분 섭취 습관',
    a: '한 번에 많이 마시기보다 하루 8~10회, 소량씩 나눠 마시는 습관이 피부 탄력과 컨디션 유지에 효과적이에요.',
  },
  {
    q: '봄철 알레르기, 약보다 먼저 챙겨야 할 생활 수칙',
    a: '외출 후 옷을 털고 바로 세안하기, 창문 대신 공기청정기 사용하기 등 노출을 줄이는 습관이 약물 못지않게 중요합니다.',
  },
  {
    q: '아침 공복 운동, 정말 다이어트에 효과적일까',
    a: '체질과 컨디션에 따라 다릅니다. 저강도 유산소는 공복에도 무리가 적지만, 고강도 운동은 가벼운 간식 후 진행하는 것이 안전해요.',
  },
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
  const [symptomIndex, setSymptomIndex] = useState(0)
  const [openFaq, setOpenFaq] = useState(0)

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

  const prevSymptom = useCallback(() => {
    setSymptomIndex((i) => (i - 1 + SYMPTOM_SLIDES.length) % SYMPTOM_SLIDES.length)
  }, [])

  const nextSymptom = useCallback(() => {
    setSymptomIndex((i) => (i + 1) % SYMPTOM_SLIDES.length)
  }, [])

  const toggleFaq = useCallback((index) => {
    setOpenFaq((current) => (current === index ? -1 : index))
  }, [])

  const activeInfo = CATEGORIES.find((c) => c.label === activeCategory)
  const activeSymptom = SYMPTOM_SLIDES[symptomIndex]

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

        <section className={styles.quickSection}>
          <div className={styles.quickGrid}>
            {QUICK_ACTIONS.map((q) => (
              <a key={q.title} href={q.href} className={styles.quickCard}>
                <span className={styles.quickIcon}>{q.icon}</span>
                <h3 className={styles.quickTitle}>{q.title}</h3>
                <p className={styles.quickDesc}>{q.desc}</p>
                <span className={styles.quickCta}>{q.cta} →</span>
              </a>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>어떤 도움이 필요하신가요?</h2>
          <p className={styles.sectionDesc}>지금 느끼는 증상을 골라보면 관련 정보를 바로 안내해드려요.</p>

          <div className={styles.symptomCarousel}>
            <button
              type="button"
              className={styles.symptomArrow}
              aria-label="이전 증상"
              onClick={prevSymptom}
            >
              ‹
            </button>

            <div className={styles.symptomSlide}>
              <span className={styles.symptomIcon}>{activeSymptom.icon}</span>
              <div>
                <p className={styles.symptomTitle}>{activeSymptom.title}</p>
                <p className={styles.symptomDesc}>{activeSymptom.desc}</p>
              </div>
            </div>

            <button
              type="button"
              className={styles.symptomArrow}
              aria-label="다음 증상"
              onClick={nextSymptom}
            >
              ›
            </button>
          </div>

          <div className={styles.symptomDots}>
            {SYMPTOM_SLIDES.map((s, i) => (
              <button
                key={s.title}
                type="button"
                aria-label={`${i + 1}번째 증상 보기`}
                className={`${styles.symptomDot} ${i === symptomIndex ? styles.symptomDotActive : ''}`}
                onClick={() => setSymptomIndex(i)}
              />
            ))}
          </div>
        </section>

        <section id="news" className={styles.section}>
          <h2 className={styles.sectionTitle}>최신 건강 이야기</h2>
          <p className={styles.sectionDesc}>리얼 에디터가 매일 엄선해 전하는 오늘의 소식.</p>

          <div className={styles.newsStrip}>
            {FEATURED_NEWS.map((n) => (
              <article key={n.title} className={styles.newsCard}>
                <div className={styles.newsThumb}>
                  {n.image ? (
                    <img src={n.image} alt={n.tag} className={styles.newsThumbImg} />
                  ) : (
                    n.emoji
                  )}
                </div>
                <span className={styles.newsTag}>{n.tag}</span>
                <h3 className={styles.newsTitle}>{n.title}</h3>
              </article>
            ))}
          </div>
        </section>

        <section id="categories" className={styles.section}>
          <h2 className={styles.sectionTitle}>관심 있는 건강 주제를 선택하세요</h2>
          <p className={styles.sectionDesc}>버튼을 누르면 간단한 설명을 바로 확인할 수 있어요.</p>

          <div className={styles.careGroups}>
            {CARE_GROUPS.map((group) => (
              <div key={group.title} className={styles.careGroup}>
                <div className={styles.careGroupHead}>
                  <span className={styles.careGroupIcon}>{group.icon}</span>
                  <div>
                    <p className={styles.careGroupTitle}>{group.title}</p>
                    <p className={styles.careGroupDesc}>{group.desc}</p>
                  </div>
                </div>

                <div className={styles.categoryGrid}>
                  {group.items.map((label) => {
                    const c = CATEGORIES.find((cat) => cat.label === label)
                    return (
                      <button
                        key={label}
                        type="button"
                        className={`${styles.categoryBtn} ${
                          activeCategory === label ? styles.categoryBtnActive : ''
                        }`}
                        onClick={() => toggleCategory(label)}
                      >
                        <span className={styles.categoryIcon}>{c.icon}</span>
                        <span>{c.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
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

            <div className={styles.accordion}>
              {FAQ_ITEMS.map((item, i) => {
                const isOpen = openFaq === i
                return (
                  <div key={item.q} className={styles.accordionItem}>
                    <button
                      type="button"
                      className={styles.accordionHead}
                      aria-expanded={isOpen}
                      onClick={() => toggleFaq(i)}
                    >
                      <span>{item.q}</span>
                      <span className={styles.accordionToggle}>{isOpen ? '접기 −' : '더보기 +'}</span>
                    </button>
                    {isOpen && <p className={styles.accordionBody}>{item.a}</p>}
                  </div>
                )
              })}
            </div>
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
