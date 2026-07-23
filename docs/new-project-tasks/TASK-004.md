# TASK-004 — Main Page UX/UI Specification

## 목적
메인 페이지를 프로젝트의 핵심 경험으로 정의한다.

---

# Hero Section

- Full Screen 100vh
- 영상 또는 WebGL Background
- Glass Search Panel
- Premium Typography
- Animated Counter
- Scroll Indicator

---

# Hero Animation

사용 기술

- GSAP
- Framer Motion

효과

- Fade
- Blur
- Scale
- Text Reveal
- Mouse Parallax

---

# Search Section

검색 조건

- 거래유형
- 지역
- 가격
- 면적
- 건물유형

AI 자동완성 지원

---

# Popular Regions

카드형

Top10

Hover Animation

---

# Featured Properties

Premium Card

이미지

가격

위치

면적

관심등록

---

# AI Recommendation

추천 이유 표시

최근 검색 기반

관심매물 기반

---

# Statistics

Animated Counter

- 등록 매물
- 거래 완료
- 방문자
- 리뷰

---

# Customer Review

Card Slider

Auto Play

---

# CTA

전화

카카오톡

예약하기

문의하기

---

# Footer CTA

지금 상담받기

---

# Motion Rules

Hero

0.8s

Cards

0.4s

Buttons

0.2s

Scroll Trigger 사용

---

# Mobile

Hero 축소

검색창 우선

Sticky Bottom CTA

---

# Performance

LCP 2초 이하

CLS 최소화

Lazy Load

Dynamic Import

---

# SEO

H1 하나

Schema.org

OpenGraph

Twitter Card

Metadata API

---

# Claude Code 구현

컴포넌트

Hero.tsx

SearchSection.tsx

FeaturedSection.tsx

RegionSection.tsx

AISection.tsx

Statistics.tsx

ReviewSection.tsx

CTASection.tsx

Footer.tsx

모든 컴포넌트는 독립적으로 구현한다.
