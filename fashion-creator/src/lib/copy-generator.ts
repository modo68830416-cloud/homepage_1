import type { ChannelCopy, ChannelKey, ContentSourceLook, ContentStudioState } from "@/types/content";

const DISCLOSURE =
  "이 콘텐츠에는 제휴 링크가 포함될 수 있으며, 구매 시 크리에이터에게 일정 수익이 발생할 수 있습니다.";

const BASE_URL = "https://fashioncreator.co.kr";

function productList(look: ContentSourceLook) {
  return look.products.map((product) => product.name).join(", ");
}

function purchaseLink(look: ContentSourceLook) {
  return `${BASE_URL}/look/${look.id}`;
}

function baseHashtags(look: ContentSourceLook, state: ContentStudioState) {
  return [
    "#FashionCreator",
    `#${state.style}`,
    ...look.styleTags.map((tag) => `#${tag.replace(/\s+/g, "")}`),
  ];
}

export function generateChannelCopy(
  channel: ChannelKey,
  look: ContentSourceLook,
  state: ContentStudioState,
): ChannelCopy {
  const link = purchaseLink(look);
  const hashtags = baseHashtags(look, state);

  switch (channel) {
    case "youtube":
      return {
        channel,
        title: `${look.name} | ${state.style} 스타일링 룩북`,
        body: `${state.background}을 배경으로 촬영한 ${look.name} 룩입니다.\n\n착용 상품: ${productList(look)}\n\n구매 링크: ${link}`,
        hashtags,
        pinnedComment: `이 영상에서 착용한 상품은 설명란 링크에서 확인하세요! ${link}`,
        disclosure: DISCLOSURE,
      };
    case "shorts":
      return {
        channel,
        title: `${look.name} Shorts`,
        body: `${state.style} 무드의 ${look.name} 룩, 15초 안에 확인하세요.`,
        hashtags: [...hashtags, "#Shorts"],
        pinnedComment: `전체 코디 구매 링크: ${link}`,
        disclosure: DISCLOSURE,
      };
    case "blog":
      return {
        channel,
        title: `${look.name} — ${state.style} 무드 데일리 코디 제안`,
        body: `오늘 소개할 룩은 '${look.name}'입니다. ${state.background}에서 촬영했으며, ${state.style} 분위기를 담았습니다.\n\n${look.products
          .map((product) => `- ${product.name}: 이 아이템은 코디의 포인트가 되어줍니다.`)
          .join("\n")}\n\n아래 링크에서 전체 코디를 확인하고 구매할 수 있습니다.\n\n[전체 코디 구매하기](${link})`,
        hashtags,
        disclosure: DISCLOSURE,
      };
    case "instagram":
      return {
        channel,
        body: `${look.name} ✨ ${state.style} 무드\n오늘의 룩, 프로필 링크에서 전체 코디 확인 가능해요.`,
        hashtags: [...hashtags, "#OOTD"],
        disclosure: DISCLOSURE,
      };
    case "tiktok":
      return {
        channel,
        body: `${look.name} 룩 완성! ${state.style} 감성 코디 구경하고 가세요.`,
        hashtags: [...hashtags, "#fyp"],
        disclosure: DISCLOSURE,
      };
  }
}

export function generateAllChannelCopies(look: ContentSourceLook, state: ContentStudioState): ChannelCopy[] {
  const channels: ChannelKey[] = ["youtube", "shorts", "blog", "instagram", "tiktok"];
  return channels.map((channel) => generateChannelCopy(channel, look, state));
}
