import { useCallback, useEffect, useState } from 'react'
import Head from 'next/head'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Reveal from '../components/Reveal'
import MagneticButton from '../components/MagneticButton'
import styles from '../styles/home.module.css'

const HERO_TITLE_LINES = [
  ['오늘의', '건강', '한걸음이'],
  ['내일의', '건강을', '만듭니다.'],
]

const heroWordContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.9 } },
}

const heroWord = {
  hidden: { opacity: 0, y: 32, filter: 'blur(10px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
}

const MISSIONS = [
  { title: '10분 걷기', desc: '가까운 거리를 걸어보세요. 부담 없이 시작할 수 있는 걸음이에요.', duration: '10분', difficulty: '쉬움', prep: '없음' },
  { title: '15분 산책하기', desc: '바람을 쐬며 천천히 걸어보세요. 기분 전환에도 좋아요.', duration: '15분', difficulty: '쉬움', prep: '편한 신발' },
  { title: '목 스트레칭 3분', desc: '천천히 목을 좌우, 앞뒤로 늘려 긴장을 풀어주세요.', duration: '3분', difficulty: '쉬움', prep: '없음' },
  { title: '어깨 스트레칭 3분', desc: '양팔을 돌리며 어깨 주변 근육을 부드럽게 풀어주세요.', duration: '3분', difficulty: '쉬움', prep: '없음' },
  { title: '물 한 잔 더 마시기', desc: '평소보다 물 한 잔을 더 챙겨 마셔보세요.', duration: '1분', difficulty: '쉬움', prep: '물 한 잔' },
  { title: '엘리베이터 대신 계단 이용하기', desc: '오늘 한 번은 계단으로 올라가 보세요.', duration: '5분', difficulty: '보통', prep: '없음' },
  { title: '20초 동안 먼 곳 바라보기', desc: '화면에서 눈을 떼고 먼 곳을 바라보며 눈의 피로를 풀어주세요.', duration: '1분', difficulty: '쉬움', prep: '없음' },
  { title: '5분 심호흡하기', desc: '천천히 코로 들이마시고 입으로 내쉬며 몸의 긴장을 풀어주세요.', duration: '5분', difficulty: '쉬움', prep: '없음', caution: '어지러움이 느껴지면 잠시 멈춰주세요.' },
  { title: '채소 한 접시 먹기', desc: '오늘 식사에 채소 한 접시를 더해보세요.', duration: '식사 중', difficulty: '쉬움', prep: '없음' },
  { title: '평소보다 30분 일찍 잠들기', desc: '오늘은 평소보다 조금 더 일찍 잠자리에 들어보세요.', duration: '30분', difficulty: '보통', prep: '없음' },
  { title: '잠들기 전 가벼운 전신 이완', desc: '누운 상태에서 발끝부터 머리까지 천천히 힘을 빼보세요.', duration: '5분', difficulty: '쉬움', prep: '없음' },
  { title: '식사 후 10분 걷기', desc: '식사를 마친 뒤 가볍게 걸으며 소화를 도와보세요.', duration: '10분', difficulty: '쉬움', prep: '없음' },
  { title: '바른 자세 5분 유지하기', desc: '허리를 펴고 어깨를 내린 바른 자세를 5분간 유지해보세요.', duration: '5분', difficulty: '보통', prep: '없음' },
]

const CATEGORIES = [
  { image: '/images/10_symptoms.webp', label: '증상과 질환', desc: '몸이 보내는 신호, 어떤 증상인지 확인해보세요.' },
  { image: '/images/02_exercise.webp', label: '운동과 스트레칭', desc: '집에서 쉽게 따라하는 운동과 스트레칭.' },
  { image: '/images/01_nutrition.webp', label: '식습관과 영양', desc: '균형 잡힌 식사로 건강을 지키는 방법.' },
  { image: '/images/05_sleep.webp', label: '수면과 휴식', desc: '숙면과 휴식을 위한 생활 습관.' },
  { image: '/images/06_mental_health.webp', label: '마음 건강', desc: '스트레스를 다스리고 마음을 돌보는 법.' },
  { image: '/images/07_middle_age.webp', label: '중장년 건강', desc: '나이 들수록 더 챙겨야 할 건강 정보.' },
  { image: '/images/09_daily_health.webp', label: '생활 건강', desc: '일상 속에서 실천하는 건강 습관.' },
  { image: '/images/08_health_products.webp', label: '건강용품', desc: '건강용품을 고르는 기준과 사용법.' },
]

const SEARCH_KEYWORDS = ['두통', '혈압', '수면', '허리통증', '걷기', '스트레칭']

const POPULAR_INFO = [
  { tag: '식습관과 영양', image: '/images/news-food.webp', title: '"매일 먹으면 좋다"는 그 식품, 진짜 효과 있을까' },
  { tag: '생활 건강', image: '/images/news-lifestyle.webp', title: '"몸속 염증 키운다"… 무심코 반복하는 습관들' },
  { tag: '식습관과 영양', image: '/images/news-diet.webp', title: '굶지 않고 건강 체중을 유지하는 식사법' },
  { tag: '중장년 건강', image: '/images/news-issue.webp', title: '나이 들수록 챙겨야 할 건강검진 이야기' },
]

const LATEST_INFO = [
  { tag: '수면과 휴식', image: '/images/news-lifestyle.webp', title: '잠들기 전 스마트폰보다 효과적인 저녁 루틴 5가지' },
  { tag: '운동과 스트레칭', image: '/images/news-diet.webp', title: '앉아있는 시간이 긴 직장인을 위한 5분 스트레칭' },
  { tag: '마음 건강', image: '/images/news-food.webp', title: '스트레스가 심할 때 도움이 되는 호흡법' },
  { tag: '중장년 건강', image: '/images/news-issue.webp', title: '계절이 바뀔 때 꼭 챙겨야 할 건강 신호' },
]

const EXERCISES = [
  { icon: '🙆', title: '3분 목 스트레칭', desc: '거북목 예방에 좋은 간단한 목 스트레칭.' },
  { icon: '🚶', title: '10분 가벼운 걷기', desc: '부담 없이 시작하는 걷기 운동.' },
  { icon: '🪑', title: '의자에서 하는 허리 운동', desc: '앉은 자리에서 바로 따라하는 허리 운동.' },
  { icon: '🌙', title: '잠들기 전 전신 이완', desc: '하루의 긴장을 풀어주는 전신 이완 동작.' },
]

const MOMO_VIDEOS = [
  {
    id: 'Oin2KF-xR24',
    title: '어깨 통증? 30초 스트레칭 4가지로 뻐근한 어깨 풀어보세요!',
    tag: '스트레칭',
  },
  {
    id: '5hTxRTTEnX0',
    title: '두통, 그냥 참지 마세요! 병원에 꼭 가야 하는 위험 신호 7가지',
    tag: '두통',
  },
  {
    id: 'R-O6kFpjfnM',
    title: '혈압이 180 넘으면 무조건 응급실일까요? 절대 놓치면 안 되는 위험 신호!',
    tag: '혈압',
  },
]

const BLOG_URL = 'https://modo6883.blogspot.com/'

const PRODUCT_GUIDES = [
  { icon: '🩸', title: '혈압계 고르는 법', desc: '가정용 혈압계, 무엇을 기준으로 골라야 할까요.' },
  { icon: '🛏️', title: '거북목 베개 선택법', desc: '목과 어깨 건강을 지키는 베개 고르는 기준.' },
  { icon: '👟', title: '걷기 운동화 선택법', desc: '발이 편안한 운동화를 고르는 방법.' },
  { icon: '💆', title: '마사지 도구 사용 시 주의사항', desc: '셀프 마사지 도구, 안전하게 사용하는 법.' },
]

function getTodayKey() {
  return `merion-step-${new Date().toISOString().slice(0, 10)}`
}

function Home({ blogPosts }) {
  const [missionIndex, setMissionIndex] = useState(0)
  const [missionStatus, setMissionStatus] = useState('idle')
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].label)
  const [infoTab, setInfoTab] = useState('popular')
  const [searchValue, setSearchValue] = useState('')
  const [showTop, setShowTop] = useState(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const now = new Date()
    const start = new Date(now.getFullYear(), 0, 0)
    const dayOfYear = Math.floor((now - start) / 86400000)
    setMissionIndex(dayOfYear % MISSIONS.length)

    const done = window.localStorage.getItem(getTodayKey()) === 'done'
    setMissionStatus(done ? 'done' : 'idle')
  }, [])

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const toggleCategory = useCallback((label) => {
    setActiveCategory(label)
  }, [])

  const startMission = useCallback(() => setMissionStatus('doing'), [])

  const completeMission = useCallback(() => {
    window.localStorage.setItem(getTodayKey(), 'done')
    setMissionStatus('done')
  }, [])

  const mission = MISSIONS[missionIndex]
  const activeInfo = CATEGORIES.find((c) => c.label === activeCategory)
  const infoList = infoTab === 'popular' ? POPULAR_INFO : LATEST_INFO

  return (
    <>
      <Head>
        <title>메리온 | 오늘도 건강 한걸음, 모모와 함께</title>
        <meta name="description" content="메리온은 건강정보, 건강 운동, 건강 관련 상품, 생활습관 관리 등 건강하게 살아가는 데 필요한 다양한 방법을 쉽고 친근하게 소개하는 종합 건강 라이프스타일 플랫폼입니다." />
      </Head>

      <Header />

      <main className={styles.main}>
        <section id="home" className={styles.hero}>
          <div className={styles.heroBannerWrap}>
            <span className={styles.heroGlow} aria-hidden="true" />
            <motion.div
              animate={reduceMotion ? undefined : { y: [0, -14, 0] }}
              transition={reduceMotion ? undefined : { duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.4 }}
            >
              <motion.img
                src="/images/momo-banner-1.webp"
                alt="메리온 모모 — 건강을 쉽게, 매일 한 걸음"
                className={styles.heroBanner}
                initial={reduceMotion ? false : { opacity: 0, scale: 1.15, filter: 'blur(18px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              />
            </motion.div>
          </div>

          <motion.p
            className={styles.heroKicker}
            initial={reduceMotion ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            MERION Project · 건강 한걸음
          </motion.p>

          <motion.h1
            className={styles.heroTitle}
            variants={heroWordContainer}
            initial={reduceMotion ? 'show' : 'hidden'}
            animate="show"
          >
            {HERO_TITLE_LINES.map((line, li) => (
              <span key={li} className={styles.heroTitleLine}>
                {line.map((word, wi) => (
                  <motion.span key={wi} variants={heroWord} className={styles.heroWord}>
                    {word}
                    {wi < line.length - 1 ? ' ' : ''}
                  </motion.span>
                ))}
                {li < HERO_TITLE_LINES.length - 1 && <br />}
              </span>
            ))}
          </motion.h1>

          <Reveal as="p" delay={2} className={styles.heroDesc}>
            오늘도 건강 한걸음, 모모와 함께.
          </Reveal>
          <Reveal as="div" delay={2.2} className={styles.heroActions}>
            <MagneticButton as="a" href="#today-step" className={styles.btnPrimary}>
              오늘의 한걸음 시작하기
            </MagneticButton>
            <MagneticButton as="a" href="#health-info" className={styles.btnSecondary}>
              건강정보 둘러보기
            </MagneticButton>
          </Reveal>
        </section>

        <section id="today-step" className={`${styles.storySection} ${styles.toneMint}`}>
          <div className={styles.storyInner}>
            <Reveal
              as="div"
              className={styles.storyMedia}
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <img src="/images/momo-doctor-coat.webp" alt="모모" className={styles.storyMediaImg} />
            </Reveal>

            <Reveal as="div" className={styles.storyBody} delay={0.1}>
              <span className={styles.missionKicker}>오늘의 건강 한걸음</span>
              <h2 className={styles.storyTitle}>{mission.title}</h2>
              <p className={styles.storyDesc}>{mission.desc}</p>

              <div className={styles.missionMeta}>
                <span>⏱ 소요시간 {mission.duration}</span>
                <span>📊 난이도 {mission.difficulty}</span>
                <span>🎒 준비물 {mission.prep}</span>
              </div>

              {mission.caution && <p className={styles.missionCaution}>⚠️ {mission.caution}</p>}

              {missionStatus === 'done' ? (
                <div className={styles.missionComplete}>
                  <img src="/images/momo-avatar.webp" alt="모모" className={styles.missionCompleteAvatar} />
                  <p>
                    오늘의 건강 한걸음을 완성했어요.
                    <br />
                    정말 잘하셨어요.
                    <br />
                    오늘도 건강 한걸음, 모모와 함께.
                  </p>
                </div>
              ) : missionStatus === 'doing' ? (
                <MagneticButton as="button" type="button" className={styles.btnPrimary} onClick={completeMission}>
                  오늘의 건강 한걸음 완료하기
                </MagneticButton>
              ) : (
                <MagneticButton as="button" type="button" className={styles.btnPrimary} onClick={startMission}>
                  건강 한걸음 시작하기
                </MagneticButton>
              )}
            </Reveal>
          </div>
        </section>

        <section id="search" className={styles.section}>
          <h2 className={styles.sectionTitle}>어떤 건강정보가 궁금하세요?</h2>
          <p className={styles.sectionDesc}>증상, 질환, 운동, 식습관, 수면, 건강상품까지 검색해보세요.</p>

          <form className={styles.searchForm} onSubmit={(e) => e.preventDefault()}>
            <input
              id="search-input"
              type="text"
              className={styles.searchInput}
              placeholder="예) 두통, 스트레칭, 수면"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <button type="submit" className={styles.searchBtnSubmit}>
              검색
            </button>
          </form>

          <div className={styles.searchChips}>
            {SEARCH_KEYWORDS.map((keyword) => (
              <button
                key={keyword}
                type="button"
                className={styles.chip}
                onClick={() => setSearchValue(keyword)}
              >
                {keyword}
              </button>
            ))}
          </div>
        </section>

        <section id="health-info" className={styles.section}>
          <h2 className={styles.sectionTitle}>건강 카테고리</h2>
          <p className={styles.sectionDesc}>관심 있는 건강 주제를 선택하면 간단한 설명을 바로 확인할 수 있어요.</p>

          <div className={styles.categoryGrid}>
            {CATEGORIES.map((c, i) => (
              <Reveal
                key={c.label}
                as="button"
                type="button"
                delay={i * 0.05}
                whileHover={{ y: -4, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`${styles.categoryBtn} ${activeCategory === c.label ? styles.categoryBtnActive : ''}`}
                onClick={() => toggleCategory(c.label)}
              >
                <img src={c.image} alt={c.label} className={styles.categoryImg} />
                <span>{c.label}</span>
              </Reveal>
            ))}
          </div>

        </section>

        {activeInfo && (
          <section className={`${styles.storySection} ${styles.toneLight}`}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeInfo.label}
                className={styles.storyInner}
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className={styles.storyMedia}>
                  <img src={activeInfo.image} alt={activeInfo.label} className={styles.storyMediaImg} />
                </div>
                <div className={styles.storyBody}>
                  <span className={styles.storyKicker}>건강 카테고리</span>
                  <h3 className={styles.storyTitle}>{activeInfo.label}</h3>
                  <p className={styles.storyDesc}>{activeInfo.desc}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </section>
        )}

        <section id="lifestyle" className={styles.section}>
          <h2 className={styles.sectionTitle}>지금 많이 보는 건강정보</h2>
          <p className={styles.sectionDesc}>인기순과 최신순으로 건강생활 콘텐츠를 확인해보세요.</p>

          <div className={styles.infoTabs}>
            <button
              type="button"
              className={`${styles.infoTabBtn} ${infoTab === 'popular' ? styles.infoTabBtnActive : ''}`}
              onClick={() => setInfoTab('popular')}
            >
              인기순
            </button>
            <button
              type="button"
              className={`${styles.infoTabBtn} ${infoTab === 'latest' ? styles.infoTabBtnActive : ''}`}
              onClick={() => setInfoTab('latest')}
            >
              최신순
            </button>
          </div>

          <div className={styles.newsStrip}>
            {infoList.map((n, i) => (
              <Reveal
                key={n.title}
                as="article"
                delay={i * 0.08}
                whileHover={{ y: -6 }}
                className={styles.newsCard}
              >
                <div className={styles.newsThumb}>
                  <img src={n.image} alt={n.tag} className={styles.newsThumbImg} />
                </div>
                <span className={styles.newsTag}>{n.tag}</span>
                <h3 className={styles.newsTitle}>{n.title}</h3>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="exercise" className={`${styles.section} ${styles.sectionIntroTight}`}>
          <h2 className={styles.sectionTitle}>오늘의 운동과 스트레칭</h2>
          <p className={styles.sectionDesc}>짧은 시간에 따라 할 수 있는 가벼운 운동을 모았어요.</p>
        </section>

        {EXERCISES.map((e, i) => (
          <section
            key={e.title}
            className={`${styles.storySection} ${styles.compact} ${i % 2 === 0 ? styles.toneLight : styles.toneMint}`}
          >
            <div className={`${styles.storyInner} ${i % 2 === 1 ? styles.reverse : ''}`}>
              <Reveal
                as="div"
                className={styles.storyMedia}
                initial={{ opacity: 0, x: i % 2 === 1 ? 60 : -60 }}
                whileInView={{ opacity: 1, x: 0 }}
              >
                <span className={styles.storyIconCircle}>{e.icon}</span>
              </Reveal>
              <Reveal as="div" className={styles.storyBody} delay={0.1}>
                <span className={styles.storyKicker}>운동 {String(i + 1).padStart(2, '0')}</span>
                <h3 className={styles.storyTitle}>{e.title}</h3>
                <p className={styles.storyDesc}>{e.desc}</p>
              </Reveal>
            </div>
          </section>
        ))}

        <section id="momo-videos" className={styles.section}>
          <img src="/images/momo-banner-2.webp" alt="메리온 모모 유튜브" className={styles.videoBanner} />
          <h2 className={styles.sectionTitle}>모모 건강영상</h2>
          <p className={styles.sectionDesc}>
            모모와 함께 보는 짧은 건강 영상,{' '}
            <a
              href="https://www.youtube.com/@%ED%9E%90%EB%A7%81%EB%AA%AC%EC%B9%98%EC%B9%98"
              target="_blank"
              rel="noopener noreferrer"
            >
              유튜브 채널
            </a>
            에서 더 만나보세요.
          </p>

          <div className={styles.videoGrid}>
            {MOMO_VIDEOS.map((v) => (
              <a
                key={v.id}
                href={`https://www.youtube.com/shorts/${v.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.videoCard}
              >
                <div
                  className={styles.videoThumb}
                  style={{ backgroundImage: `url(https://i.ytimg.com/vi/${v.id}/hqdefault.jpg)` }}
                >
                  <span className={styles.videoPlay}>▶</span>
                </div>
                <span className={styles.newsTag}>{v.tag}</span>
                <p className={styles.videoTitle}>{v.title}</p>
              </a>
            ))}
          </div>
        </section>

        <section id="blog" className={styles.section}>
          <div className={styles.productHead}>
            <div>
              <h2 className={styles.sectionTitle}>메리온 블로그</h2>
              <p className={styles.sectionDesc}>모모와 함께 쓰는 건강 이야기를 블로그에서 더 자세히 만나보세요.</p>
            </div>
            <a href={BLOG_URL} target="_blank" rel="noopener noreferrer" className={styles.btnSecondary}>
              블로그 전체 보기 ↗
            </a>
          </div>

          {blogPosts.length > 0 ? (
            <div className={styles.newsStrip}>
              {blogPosts.map((post, i) => (
                <Reveal
                  key={post.url}
                  as="a"
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  delay={i * 0.08}
                  whileHover={{ y: -6 }}
                  className={`${styles.newsCard} ${styles.blogCard}`}
                >
                  <div className={styles.newsThumb}>
                    {post.thumbnail ? (
                      <img src={post.thumbnail} alt={post.title} className={styles.newsThumbImg} />
                    ) : (
                      <span className={styles.blogThumbFallback}>📝</span>
                    )}
                  </div>
                  <span className={styles.newsTag}>{post.tag}</span>
                  <h3 className={styles.newsTitle}>{post.title}</h3>
                </Reveal>
              ))}
            </div>
          ) : (
            <p className={styles.sectionDesc}>블로그 글을 불러오지 못했어요. 블로그에서 직접 확인해주세요.</p>
          )}
        </section>

        <section id="products" className={`${styles.section} ${styles.sectionIntroTight}`}>
          <div className={styles.productHead}>
            <div>
              <h2 className={styles.sectionTitle}>건강 상품 선택 가이드</h2>
              <p className={styles.sectionDesc}>가격보다 선택 기준을 먼저 안내해드려요.</p>
            </div>
            <span className={styles.adBadge}>광고·제휴 포함 가능</span>
          </div>
        </section>

        {PRODUCT_GUIDES.map((p, i) => (
          <section
            key={p.title}
            className={`${styles.storySection} ${styles.compact} ${i % 2 === 0 ? styles.toneLight : styles.toneMint}`}
          >
            <div className={`${styles.storyInner} ${i % 2 === 1 ? styles.reverse : ''}`}>
              <Reveal
                as="div"
                className={styles.storyMedia}
                initial={{ opacity: 0, x: i % 2 === 1 ? 60 : -60 }}
                whileInView={{ opacity: 1, x: 0 }}
              >
                <span className={styles.storyIconCircle}>{p.icon}</span>
              </Reveal>
              <Reveal as="div" className={styles.storyBody} delay={0.1}>
                <span className={styles.storyKicker}>가이드 {String(i + 1).padStart(2, '0')}</span>
                <h3 className={styles.storyTitle}>{p.title}</h3>
                <p className={styles.storyDesc}>{p.desc}</p>
                <span className={styles.productCta}>선택 기준 보기 →</span>
              </Reveal>
            </div>
          </section>
        ))}

        <section id="about" className={styles.brandSection}>
          <img src="/images/momo-portrait.webp" alt="모모" className={styles.brandPortrait} />
          <div>
            <h2 className={styles.brandTitle}>
              건강은 거창한 변화가 아니라
              <br />
              매일의 작은 한걸음에서 시작됩니다.
            </h2>
            <p className={styles.brandDesc}>
              메리온은 건강정보, 건강 운동, 건강 관련 상품, 생활습관 관리 등 건강하게 살아가는 데 필요한 다양한 방법을
              쉽고 친근하게 소개하는 종합 건강 라이프스타일 플랫폼입니다.
            </p>
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

export async function getStaticProps() {
  let blogPosts = []

  try {
    const res = await fetch(`${BLOG_URL}feeds/posts/default?alt=json&max-results=6`)
    const data = await res.json()
    const entries = data.feed.entry || []

    blogPosts = entries.map((entry) => {
      const altLink = entry.link.find((l) => l.rel === 'alternate' && l.type === 'text/html')
      const content = entry.content?.$t || entry.summary?.$t || ''
      const imgMatch = content.match(/<img[^>]+src="([^"]+)"/)

      return {
        title: entry.title.$t,
        url: altLink ? altLink.href : BLOG_URL,
        thumbnail: imgMatch ? imgMatch[1] : null,
        tag: entry.category?.[0]?.term || '건강정보',
      }
    })
  } catch (err) {
    blogPosts = []
  }

  return {
    props: { blogPosts },
    revalidate: 3600,
  }
}

export default Home
