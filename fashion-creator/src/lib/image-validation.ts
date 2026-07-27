const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const MAX_SIZE_BYTES = 10 * 1024 * 1024;

export type ImageValidationError =
  | "unsupported-type"
  | "too-large"
  | "not-image";

export type ImageValidationResult =
  | { ok: true }
  | { ok: false; error: ImageValidationError };

export function validatePhotoFile(file: File): ImageValidationResult {
  if (!file.type.startsWith("image/")) {
    return { ok: false, error: "not-image" };
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    return { ok: false, error: "unsupported-type" };
  }
  if (file.size > MAX_SIZE_BYTES) {
    return { ok: false, error: "too-large" };
  }
  return { ok: true };
}

export const IMAGE_VALIDATION_MESSAGES: Record<ImageValidationError, string> = {
  "unsupported-type": "JPG, PNG, WEBP 형식의 사진만 업로드할 수 있습니다.",
  "too-large": "파일 크기는 10MB 이하만 업로드할 수 있습니다.",
  "not-image": "이미지 파일만 업로드할 수 있습니다.",
};

export const ACCEPTED_PHOTO_TYPES = ALLOWED_TYPES.join(",");
export const MAX_PHOTO_SIZE_MB = MAX_SIZE_BYTES / (1024 * 1024);
