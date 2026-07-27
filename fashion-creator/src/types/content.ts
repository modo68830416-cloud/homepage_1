export type ContentFormat = "image" | "shorts" | "reels" | "tiktok" | "youtube" | "blog";

export const CONTENT_FORMATS: { value: ContentFormat; label: string; description: string }[] = [
  { value: "image", label: "AI Fashion Image", description: "고화질 화보 이미지" },
  { value: "shorts", label: "YouTube Shorts", description: "9:16 · 15초" },
  { value: "reels", label: "Instagram Reels", description: "9:16 · 15초" },
  { value: "tiktok", label: "TikTok", description: "9:16 · 15초" },
  { value: "youtube", label: "YouTube Video", description: "16:9 · 30초" },
  { value: "blog", label: "Blog Package", description: "텍스트 + 이미지 패키지" },
];

export const VIDEO_FORMATS: ContentFormat[] = ["shorts", "reels", "tiktok", "youtube"];

export type AspectRatio = "9:16" | "16:9" | "1:1" | "4:5";
export type Duration = 5 | 10 | 15 | 30 | 60;

export const ASPECT_RATIOS: AspectRatio[] = ["9:16", "16:9", "1:1", "4:5"];
export const DURATIONS: Duration[] = [5, 10, 15, 30, 60];

export const BACKGROUNDS = [
  "런웨이",
  "서울 거리",
  "뉴욕 거리",
  "파리",
  "스튜디오",
  "카페",
  "해변",
  "미래도시",
  "미니멀 공간",
];

export const CAMERAS = ["정면", "전신", "클로즈업", "측면", "회전", "줌인", "줌아웃", "트래킹"];

export const MOTIONS = ["워킹", "포즈", "회전", "앉기", "계단", "슬로모션", "자연스러운 움직임"];

export const STYLES = ["Luxury", "Editorial", "Street", "Minimal", "Sport", "Romantic", "Futuristic"];

export type LookProduct = {
  id: string;
  name: string;
  price: number;
};

export type ContentSourceLook = {
  id: string;
  name: string;
  modelId: string | null;
  modelType: "preset" | "avatar" | null;
  modelPreviewImage: string;
  products: LookProduct[];
  totalPrice: number;
  styleTags: string[];
  isDemo: boolean;
};

export type ContentStudioState = {
  sourceLookId: string | null;
  format: ContentFormat;
  aspectRatio: AspectRatio;
  duration: Duration | null;
  background: string;
  camera: string;
  motion: string;
  style: string;
  prompt: string;
  activeJobId: string | null;
};

export const DEFAULT_STUDIO_STATE: ContentStudioState = {
  sourceLookId: null,
  format: "shorts",
  aspectRatio: "9:16",
  duration: 15,
  background: "스튜디오",
  camera: "전신",
  motion: "워킹",
  style: "Editorial",
  prompt: "",
  activeJobId: null,
};

export type GenerationJobStatus =
  | "draft"
  | "queued"
  | "preparing"
  | "generating"
  | "processing"
  | "completed"
  | "failed"
  | "cancelled";

export type GenerationJob = {
  id: string;
  projectId: string;
  status: GenerationJobStatus;
  progress: number;
  currentStep: string;
  createdAt: string;
  completedAt?: string;
  error?: string;
  output?: GeneratedContent;
  isDemo: boolean;
};

export type VideoScene = {
  id: string;
  order: number;
  title: string;
  duration: number;
  shotType: string;
  modelAction: string;
  cameraMotion: string;
  background: string;
  overlayText?: string;
};

export type GeneratedContent = {
  id: string;
  projectId: string;
  type: "image" | "video";
  format: ContentFormat;
  aspectRatio: AspectRatio;
  duration?: number;
  mediaSeed: string;
  thumbnailOptions: string[];
  scenes: VideoScene[];
  isDemo: boolean;
};

export type ChannelKey = "youtube" | "shorts" | "blog" | "instagram" | "tiktok";

export type ChannelCopy = {
  channel: ChannelKey;
  title?: string;
  body: string;
  hashtags: string[];
  pinnedComment?: string;
  disclosure?: string;
};

export type ContentProject = {
  id: string;
  title: string;
  sourceLookId: string;
  format: ContentFormat;
  status: GenerationJobStatus;
  thumbnailSeed: string;
  createdAt: string;
  updatedAt: string;
  settings: ContentStudioState;
  output?: GeneratedContent;
  channelCopies?: ChannelCopy[];
  isFavorite: boolean;
  isDemo: boolean;
};
