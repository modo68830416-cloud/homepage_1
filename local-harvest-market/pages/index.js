import { useMemo, useState } from 'react'
import Head from 'next/head'
import Header from '../components/Header'
import CategoryBar from '../components/CategoryBar'
import Footer from '../components/Footer'
import Rail from '../components/Rail'
import styles from '../styles/home.module.css'

const CATEGORIES = ['전체', '농산물', '수산물', '축산물', '가공식품', '공예품']
const REGIONS = ['전체', '강원', '수도권', '충청', '경상', '전라', '제주']

const POPULAR_ITEMS = [
  { keyword: '사과', emoji: '🍎' },
  { keyword: '꽃게', emoji: '🦀' },
  { keyword: '한우', emoji: '🥩' },
  { keyword: '딸기', emoji: '🍓' },
  { keyword: '도자기', emoji: '🏺' },
  { keyword: '인삼', emoji: '🌱' },
  { keyword: '굴비', emoji: '🐟' },
  { keyword: '감귤', emoji: '🍊' },
]

const PRODUCTS = [
  { id: 1, item: '안동 사과', category: '농산물', region: '경상', origin: '경북 안동', seller: '안동제일농원', price: 28000, unit: '5kg 상자', emoji: '🍎' },
  { id: 2, item: '안동 사과', category: '농산물', region: '경상', origin: '경북 안동', seller: '안동햇살과수원', price: 32000, unit: '5kg 상자', emoji: '🍎' },
  { id: 3, item: '안동 사과', category: '농산물', region: '경상', origin: '경북 안동', seller: '예본농장', price: 26000, unit: '5kg 상자', emoji: '🍎' },

  { id: 4, item: '꽃게', category: '수산물', region: '전라', origin: '전남 신안', seller: '신안바다수산', price: 45000, unit: '1kg', emoji: '🦀' },
  { id: 5, item: '꽃게', category: '수산물', region: '전라', origin: '전남 영광', seller: '영광수산', price: 42000, unit: '1kg', emoji: '🦀' },
  { id: 6, item: '꽃게', category: '수산물', region: '전라', origin: '전남 목포', seller: '목포항수산', price: 48000, unit: '1kg', emoji: '🦀' },

  { id: 7, item: '횡성한우', category: '축산물', region: '강원', origin: '강원 횡성', seller: '횡성축협직송', price: 65000, unit: '등심 500g', emoji: '🥩' },
  { id: 8, item: '횡성한우', category: '축산물', region: '강원', origin: '강원 횡성', seller: '강원명품한우', price: 72000, unit: '등심 500g', emoji: '🥩' },

  { id: 9, item: '논산딸기', category: '농산물', region: '충청', origin: '충남 논산', seller: '논산딸기농원', price: 15000, unit: '1kg', emoji: '🍓' },
  { id: 10, item: '논산딸기', category: '농산물', region: '충청', origin: '충남 논산', seller: '햇살딸기하우스', price: 17000, unit: '1kg', emoji: '🍓' },

  { id: 11, item: '금산인삼', category: '농산물', region: '충청', origin: '충남 금산', seller: '금산인삼협동조합', price: 55000, unit: '600g (뿌리삼)', emoji: '🌱' },
  { id: 12, item: '금산인삼', category: '농산물', region: '충청', origin: '충남 금산', seller: '인삼명가', price: 60000, unit: '600g (뿌리삼)', emoji: '🌱' },

  { id: 13, item: '영광굴비', category: '수산물', region: '전라', origin: '전남 영광', seller: '영광법성포굴비', price: 89000, unit: '10미 세트', emoji: '🐟' },
  { id: 14, item: '영광굴비', category: '수산물', region: '전라', origin: '전남 영광', seller: '바다향굴비', price: 95000, unit: '10미 세트', emoji: '🐟' },

  { id: 15, item: '이천도자기', category: '공예품', region: '수도권', origin: '경기 이천', seller: '이천도예공방 (이도윤 장인)', price: 78000, unit: '찻잔 세트', emoji: '🏺' },
  { id: 16, item: '전주한지공예', category: '공예품', region: '전라', origin: '전북 전주', seller: '전주한지장인방 (박한지 장인)', price: 42000, unit: '한지 조명 1개', emoji: '🏮' },
  { id: 17, item: '담양대나무공예', category: '공예품', region: '전라', origin: '전남 담양', seller: '담양죽세공방', price: 36000, unit: '대나무 소반', emoji: '🎋' },
  { id: 18, item: '울산옹기', category: '공예품', region: '경상', origin: '울산 외고산', seller: '외고산옹기마을', price: 51000, unit: '항아리 1개', emoji: '🏺' },

  { id: 19, item: '제주감귤', category: '농산물', region: '제주', origin: '제주 서귀포', seller: '서귀포감귤작목반', price: 22000, unit: '5kg 상자', emoji: '🍊' },
  { id: 20, item: '제주감귤', category: '농산물', region: '제주', origin: '제주', seller: '제주감귤농원', price: 24000, unit: '5kg 상자', emoji: '🍊' },

  { id: 21, item: '보성녹차', category: '가공식품', region: '전라', origin: '전남 보성', seller: '보성녹차밭영농조합', price: 32000, unit: '녹차 200g', emoji: '🍵' },
  { id: 22, item: '순창전통고추장', category: '가공식품', region: '전라', origin: '전북 순창', seller: '순창장류명인', price: 18000, unit: '고추장 1kg', emoji: '🌶️' },
]

function rating(id) {
  return (4.5 + ((id * 7) % 5) / 10).toFixed(2)
}

function reviewCount(id) {
  return 18 + ((id * 13) % 140)
}

function Home() {
  const [searchTerm, setSearchTerm] = useState('')
  const [category, setCategory] = useState('전체')
  const [region, setRegion] = useState('전체')
  const [wishlist, setWishlist] = useState(new Set())

  const toggleWishlist = (id) => {
    setWishlist((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const filtered = useMemo(() => {
    const term = searchTerm.trim()
    return PRODUCTS.filter((p) => {
      const matchesCategory = category === '전체' || p.category === category
      const matchesRegion = region === '전체' || p.region === region
      const matchesTerm =
        term === '' || p.item.includes(term) || p.seller.includes(term) || p.origin.includes(term)
      return matchesCategory && matchesRegion && matchesTerm
    })
  }, [searchTerm, category, region])

  const selectPopular = (keyword) => {
    setSearchTerm(keyword)
    document.getElementById('market')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <Head>
        <title>로컬하베스트 | 전국 농수산물·특산품 직거래 마켓</title>
        <meta name="description" content="지역별로 생산되는 농수산물과 특산품, 장인의 공예품을 검색하고 판매자별로 비교해보세요" />
      </Head>

      <Header
        category={category}
        region={region}
        onCategoryChange={setCategory}
        onRegionChange={setRegion}
        categories={CATEGORIES}
        regions={REGIONS}
      />
      <CategoryBar categories={CATEGORIES} active={category} onSelect={setCategory} />

      <main id="home" className={styles.main}>
        <section id="popular" className={styles.section}>
          <h2 className={styles.sectionTitle}>지금 인기 있는 특산물</h2>
          <Rail>
            {POPULAR_ITEMS.map((p) => (
              <button key={p.keyword} type="button" className={styles.popularCard} onClick={() => selectPopular(p.keyword)}>
                <span className={styles.popularThumb}>{p.emoji}</span>
                <span className={styles.popularLabel}>{p.keyword}</span>
                <span className={styles.popularSub}>인기 검색어</span>
              </button>
            ))}
          </Rail>
        </section>

        <section id="market" className={styles.section}>
          <div className={styles.sectionHead}>
            <div>
              <h2 className={styles.sectionTitle}>전체 상품</h2>
              <p className={styles.sectionDesc}>지역을 선택하고 품목을 검색해서 원하는 상품을 찾아보세요.</p>
            </div>
            <div className={styles.regionChips}>
              {REGIONS.map((r) => (
                <button
                  key={r}
                  type="button"
                  className={`${styles.regionChip} ${region === r ? styles.regionChipActive : ''}`}
                  onClick={() => setRegion(r)}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {searchTerm && (
            <p className={styles.searchNotice}>
              <strong>&ldquo;{searchTerm}&rdquo;</strong> 검색 결과 {filtered.length}건
              <button type="button" className={styles.clearBtn} onClick={() => setSearchTerm('')}>
                검색 초기화
              </button>
            </p>
          )}

          <div className={styles.productGrid}>
            {filtered.map((p) => (
              <article key={p.id} className={styles.productCard}>
                <div className={styles.productThumb}>
                  <span>{p.emoji}</span>
                  <button
                    type="button"
                    className={`${styles.wishBtn} ${wishlist.has(p.id) ? styles.wishBtnActive : ''}`}
                    onClick={() => toggleWishlist(p.id)}
                    aria-label="찜하기"
                  >
                    {wishlist.has(p.id) ? '♥' : '♡'}
                  </button>
                </div>
                <div className={styles.productBody}>
                  <div className={styles.productTop}>
                    <h3 className={styles.productTitle}>{p.item}</h3>
                    <span className={styles.productRating}>★ {rating(p.id)}</span>
                  </div>
                  <p className={styles.productSeller}>{p.origin} · {p.seller}</p>
                  <p className={styles.productReviews}>후기 {reviewCount(p.id)}개</p>
                  <p className={styles.productPrice}>
                    <strong>{p.price.toLocaleString()}원</strong> <span className={styles.productUnit}>/ {p.unit}</span>
                  </p>
                </div>
              </article>
            ))}

            {filtered.length === 0 && (
              <p className={styles.emptyState}>조건에 맞는 상품이 없어요. 다른 검색어나 필터를 시도해보세요.</p>
            )}
          </div>
        </section>

        <section id="sell" className={styles.consult}>
          <h2 className={styles.consultTitle}>우리 지역 특산물, 로컬하베스트에서 팔아보세요</h2>
          <p className={styles.consultDesc}>농가·어가·공방 누구나 입점해서 전국 소비자에게 직접 판매할 수 있어요.</p>
          <div className={styles.consultActions}>
            <button type="button" className={styles.btnPrimary}>
              🧑‍🌾 판매자 입점 신청
            </button>
            <button type="button" className={styles.btnSecondary}>
              💬 카카오톡 상담
            </button>
            <button type="button" className={styles.btnSecondary}>
              📩 이메일 문의
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

export default Home
