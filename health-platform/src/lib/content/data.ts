import type { Article, ArticleCategoryMeta } from "./types";

export const categories: ArticleCategoryMeta[] = [
  { key: "symptoms", label: "증상별", description: "지금 느끼는 증상으로 정보를 찾아보세요" },
  { key: "conditions", label: "질환별", description: "진단받았거나 궁금한 질환에 대해 알아보세요" },
  { key: "lifestyle", label: "생활관리", description: "운동, 식단, 수면, 정신건강 등 일상 관리" },
  { key: "checkup", label: "건강검진", description: "검진 항목과 결과 해석 가이드" },
  { key: "audience", label: "대상별", description: "여성, 남성, 시니어, 어린이 맞춤 정보" },
  { key: "seasonal", label: "계절별", description: "계절에 따라 주의해야 할 건강 이슈" },
  { key: "latest", label: "최신 건강이슈", description: "최근 주목받는 건강 뉴스와 이슈" },
];

/** Mock content set for scaffolding — replaced by the CMS-authored dataset in TASK-008. */
export const articles: Article[] = [
  {
    slug: "headache-overview",
    category: "symptoms",
    status: "PUBLISHED",
    title: "두통, 어떤 경우에 병원에 가야 할까요",
    summary: "대부분의 두통은 일시적이지만 특정 신호가 있다면 응급실을 방문해야 합니다.",
    isEmergencyRelevant: true,
    emergencyNote:
      "생애 처음 겪는 극심한 두통, 의식 저하, 마비 증상이 동반되면 즉시 119에 연락하거나 응급실을 방문하세요.",
    author: "편집팀",
    reviewer: "김O진 신경과 전문의",
    publishedAt: "2026-05-02",
    updatedAt: "2026-07-10",
    toc: [
      { id: "types", label: "두통의 종류" },
      { id: "when-to-worry", label: "응급 신호" },
      { id: "self-care", label: "생활 관리" },
    ],
    sections: [
      {
        id: "types",
        heading: "두통의 종류",
        body: "긴장성 두통은 머리 전체를 조이는 듯한 느낌이 특징이며 스트레스와 관련이 깊습니다. 편두통은 한쪽에서 박동성 통증이 나타나고 빛과 소리에 민감해지는 경우가 많습니다.",
      },
      {
        id: "when-to-worry",
        heading: "이런 증상은 응급실로",
        body: "생애 처음 겪는 극심한 두통, 갑작스러운 시야 이상, 마비나 언어 장애가 동반되는 경우 즉시 의료기관을 방문해야 합니다.",
      },
      {
        id: "self-care",
        heading: "생활 관리",
        body: "충분한 수분 섭취, 규칙적인 수면, 카페인 과다 섭취 자제가 두통 빈도를 줄이는 데 도움이 됩니다.",
      },
    ],
    keyTakeaways: [
      "대부분의 두통은 휴식과 수분 섭취로 완화됩니다.",
      "처음 겪는 극심한 두통은 응급 신호일 수 있습니다.",
      "두통 일지를 기록하면 유발 요인을 파악하는 데 도움이 됩니다.",
    ],
    sources: [{ label: "대한두통학회 진료지침 (2025)", url: "#" }],
    relatedArticleSlugs: ["hypertension-basics", "stress-management"],
  },
  {
    slug: "hypertension-basics",
    category: "conditions",
    status: "PUBLISHED",
    title: "고혈압, 증상이 없어도 관리가 필요한 이유",
    summary: "고혈압은 대부분 자각 증상이 없어 '침묵의 살인자'로 불립니다. 정기적인 혈압 측정이 핵심입니다.",
    isEmergencyRelevant: false,
    author: "편집팀",
    reviewer: "박O수 순환기내과 전문의",
    publishedAt: "2026-04-18",
    updatedAt: "2026-06-30",
    toc: [
      { id: "definition", label: "정의와 기준" },
      { id: "management", label: "관리 방법" },
      { id: "monitoring", label: "가정 혈압 측정" },
    ],
    sections: [
      {
        id: "definition",
        heading: "정의와 기준",
        body: "수축기 혈압 140mmHg 또는 이완기 혈압 90mmHg 이상이 반복적으로 측정되면 고혈압으로 진단합니다.",
      },
      {
        id: "management",
        heading: "관리 방법",
        body: "저염식 식단, 규칙적인 유산소 운동, 금연·금주가 혈압 관리의 기본입니다. 처방받은 약물은 임의로 중단하지 않아야 합니다.",
      },
      {
        id: "monitoring",
        heading: "가정 혈압 측정",
        body: "매일 같은 시간, 같은 자세로 측정하면 병원 측정보다 정확한 추이를 파악할 수 있습니다.",
      },
    ],
    keyTakeaways: [
      "고혈압은 증상이 없어도 장기 손상을 유발할 수 있습니다.",
      "가정 혈압 측정은 진단과 관리에 중요한 정보를 제공합니다.",
      "약물 치료 중에도 생활습관 개선이 함께 필요합니다.",
    ],
    sources: [{ label: "대한고혈압학회 진료지침 (2025)", url: "#" }],
    relatedArticleSlugs: ["headache-overview", "checkup-guide"],
  },
  {
    slug: "sleep-hygiene-guide",
    category: "lifestyle",
    status: "PUBLISHED",
    title: "숙면을 위한 수면 위생 7가지 원칙",
    summary: "일정한 수면 습관은 약물 없이도 수면의 질을 크게 개선할 수 있습니다.",
    isEmergencyRelevant: false,
    author: "편집팀",
    reviewer: "이O영 정신건강의학과 전문의",
    publishedAt: "2026-03-11",
    updatedAt: "2026-07-05",
    toc: [
      { id: "routine", label: "규칙적인 루틴" },
      { id: "environment", label: "수면 환경" },
      { id: "avoid", label: "피해야 할 습관" },
    ],
    sections: [
      {
        id: "routine",
        heading: "규칙적인 루틴",
        body: "매일 같은 시간에 자고 일어나는 것이 신체 리듬을 안정시키는 가장 중요한 원칙입니다.",
      },
      {
        id: "environment",
        heading: "수면 환경",
        body: "침실 온도는 18~20도, 조명은 최대한 어둡게 유지하는 것이 좋습니다.",
      },
      {
        id: "avoid",
        heading: "피해야 할 습관",
        body: "취침 전 카페인, 과도한 스마트폰 사용, 늦은 시간의 격렬한 운동은 피하는 것이 좋습니다.",
      },
    ],
    keyTakeaways: [
      "일정한 기상 시간이 수면의 질에 가장 큰 영향을 줍니다.",
      "침실 환경(온도, 조명, 소음)을 최적화하세요.",
      "취침 전 스마트폰 사용을 줄이는 것이 도움이 됩니다.",
    ],
    sources: [{ label: "대한수면학회 자료 (2025)", url: "#" }],
    relatedArticleSlugs: ["stress-management", "checkup-guide"],
  },
  {
    slug: "desk-stretch-routine",
    category: "lifestyle",
    status: "PUBLISHED",
    title: "책상에서 5분, 거북목을 예방하는 스트레칭",
    summary: "장시간 앉아 있는 습관은 목과 어깨 통증의 주요 원인입니다. 짧은 스트레칭으로 예방할 수 있습니다.",
    isEmergencyRelevant: false,
    author: "편집팀",
    reviewer: "최O민 재활의학과 전문의",
    publishedAt: "2026-02-20",
    updatedAt: "2026-06-15",
    toc: [
      { id: "why", label: "왜 필요한가" },
      { id: "routine", label: "5분 루틴" },
    ],
    sections: [
      {
        id: "why",
        heading: "왜 필요한가",
        body: "장시간 같은 자세를 유지하면 목과 어깨 근육이 긴장되어 통증과 거북목 증후군으로 이어질 수 있습니다.",
      },
      {
        id: "routine",
        heading: "5분 루틴",
        body: "목 옆으로 기울이기, 어깨 으쓱하기, 가슴 펴기 동작을 각각 30초씩 반복하면 긴장을 완화할 수 있습니다.",
      },
    ],
    keyTakeaways: ["1시간마다 자세를 바꾸는 것이 중요합니다.", "짧은 스트레칭도 꾸준히 하면 효과가 있습니다."],
    sources: [{ label: "대한재활의학회 자료 (2025)", url: "#" }],
    relatedArticleSlugs: ["sleep-hygiene-guide"],
  },
  {
    slug: "stress-management",
    category: "lifestyle",
    status: "PUBLISHED",
    title: "일상 속 스트레스, 어떻게 관리할까",
    summary: "만성 스트레스는 수면, 소화, 면역 기능에 광범위한 영향을 미칩니다.",
    isEmergencyRelevant: false,
    author: "편집팀",
    reviewer: "이O영 정신건강의학과 전문의",
    publishedAt: "2026-01-15",
    updatedAt: "2026-05-20",
    toc: [
      { id: "signs", label: "스트레스 신호" },
      { id: "coping", label: "대처 방법" },
    ],
    sections: [
      {
        id: "signs",
        heading: "스트레스 신호",
        body: "불면, 소화불량, 집중력 저하, 예민함 증가는 만성 스트레스의 흔한 신호입니다.",
      },
      {
        id: "coping",
        heading: "대처 방법",
        body: "규칙적인 운동, 명상, 사회적 지지체계 유지가 스트레스 관리에 효과적입니다.",
      },
    ],
    keyTakeaways: ["스트레스 신호를 조기에 인지하는 것이 중요합니다.", "혼자 해결하기 어렵다면 전문가 상담을 고려하세요."],
    sources: [{ label: "대한스트레스학회 자료 (2025)", url: "#" }],
    relatedArticleSlugs: ["headache-overview", "sleep-hygiene-guide"],
  },
  {
    slug: "checkup-guide",
    category: "checkup",
    status: "PUBLISHED",
    title: "건강검진 결과지, 이 항목만은 꼭 확인하세요",
    summary: "혈압, 혈당, 콜레스테롤 수치는 만성질환 조기 발견의 핵심 지표입니다.",
    isEmergencyRelevant: false,
    author: "편집팀",
    reviewer: "박O수 순환기내과 전문의",
    publishedAt: "2026-06-01",
    updatedAt: "2026-07-15",
    toc: [
      { id: "core-items", label: "핵심 항목" },
      { id: "interpretation", label: "결과 해석" },
    ],
    sections: [
      {
        id: "core-items",
        heading: "핵심 항목",
        body: "혈압, 공복혈당, 총콜레스테롤, 간수치는 매년 확인해야 할 기본 항목입니다.",
      },
      {
        id: "interpretation",
        heading: "결과 해석",
        body: "정상 범위를 약간 벗어났다고 즉시 질환은 아니지만, 추이를 지속적으로 관찰하는 것이 중요합니다.",
      },
    ],
    keyTakeaways: ["단발성 수치보다 연도별 추이가 더 중요합니다.", "이상 소견은 반드시 전문의와 상담하세요."],
    sources: [{ label: "국가건강검진 안내 (2025)", url: "#" }],
    relatedArticleSlugs: ["hypertension-basics", "sleep-hygiene-guide"],
  },
  {
    slug: "vitamin-d-deficiency",
    category: "conditions",
    status: "DRAFT",
    title: "비타민D 결핍, 어떻게 확인하고 관리할까 (검수 대기중)",
    summary: "이 초안은 아직 의료 검수를 거치지 않아 공개 사이트에는 노출되지 않습니다.",
    isEmergencyRelevant: false,
    author: "편집팀",
    reviewer: "검수 대기중",
    publishedAt: "2026-07-20",
    updatedAt: "2026-07-20",
    toc: [{ id: "draft", label: "초안" }],
    sections: [{ id: "draft", heading: "초안", body: "검수 완료 후 공개됩니다." }],
    keyTakeaways: [],
    sources: [],
    relatedArticleSlugs: [],
  },
];

export function getArticlesByCategory(category: string) {
  return articles.filter((article) => article.category === category);
}

export function getArticleBySlug(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export function getRelatedArticles(article: Article): Article[] {
  return article.relatedArticleSlugs
    .map((slug) => getArticleBySlug(slug))
    .filter((found): found is Article => Boolean(found));
}
