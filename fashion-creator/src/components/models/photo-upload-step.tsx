"use client";

import { useRef, useState } from "react";
import { AlertCircle, RotateCcw, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { AvatarPrivacyNotice } from "@/components/models/avatar-privacy-notice";
import {
  ACCEPTED_PHOTO_TYPES,
  IMAGE_VALIDATION_MESSAGES,
  MAX_PHOTO_SIZE_MB,
  validatePhotoFile,
} from "@/lib/image-validation";
import { cn } from "@/lib/utils";

type PhotoUploadStepProps = {
  previewUrl: string | null;
  consent: boolean;
  onPhotoChange: (file: File | null, previewUrl: string | null) => void;
  onConsentChange: (consent: boolean) => void;
  onNext: () => void;
};

export function PhotoUploadStep({
  previewUrl,
  consent,
  onPhotoChange,
  onConsentChange,
  onNext,
}: PhotoUploadStepProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  function handleFile(file: File | undefined) {
    if (!file) return;
    const result = validatePhotoFile(file);
    if (!result.ok) {
      setError(IMAGE_VALIDATION_MESSAGES[result.error]);
      return;
    }
    setError(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    onPhotoChange(file, URL.createObjectURL(file));
  }

  function handleRemove() {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    onPhotoChange(null, null);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground">정면 사진 한 장 업로드</h2>
        <p className="mt-1.5 text-sm text-foreground-muted">
          정면을 바라보는 선명한 사진 한 장이면 충분합니다. 모자, 선글라스, 강한 필터가 없는 사진을
          권장합니다.
        </p>
      </div>

      {!previewUrl ? (
        <label
          onDragOver={(event) => {
            event.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={(event) => {
            event.preventDefault();
            setDragActive(false);
            handleFile(event.dataTransfer.files?.[0]);
          }}
          className={cn(
            "flex min-h-56 cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed text-center transition-colors",
            dragActive ? "border-accent-lime bg-accent-lime/5" : "border-border hover:border-border-strong",
          )}
        >
          <Upload className="h-8 w-8 text-foreground-subtle" aria-hidden="true" />
          <div>
            <p className="text-sm font-medium text-foreground">클릭하거나 사진을 끌어다 놓으세요</p>
            <p className="mt-1 text-xs text-foreground-subtle">
              JPG, PNG, WEBP · 최대 {MAX_PHOTO_SIZE_MB}MB · 한 사람만 나온 사진 권장
            </p>
          </div>
          <input
            ref={inputRef}
            type="file"
            accept={ACCEPTED_PHOTO_TYPES}
            capture="user"
            aria-label="정면 사진 업로드"
            aria-describedby={error ? "photo-upload-error" : undefined}
            className="sr-only"
            onChange={(event) => handleFile(event.target.files?.[0])}
          />
        </label>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <div className="relative h-56 w-44 overflow-hidden rounded-2xl border border-border-strong">
            {/* eslint-disable-next-line @next/next/no-img-element -- local object URL preview, not an optimizable remote asset */}
            <img src={previewUrl} alt="업로드한 정면 사진 미리보기" className="h-full w-full object-cover" />
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" className="text-xs" onClick={() => inputRef.current?.click()}>
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              다시 선택
            </Button>
            <Button variant="outline" className="text-xs" onClick={handleRemove}>
              <X className="h-3.5 w-3.5" aria-hidden="true" />
              제거
            </Button>
            <input
              ref={inputRef}
              type="file"
              accept={ACCEPTED_PHOTO_TYPES}
              className="sr-only"
              aria-label="정면 사진 다시 선택"
              onChange={(event) => handleFile(event.target.files?.[0])}
            />
          </div>
        </div>
      )}

      {error && (
        <div id="photo-upload-error" role="alert" className="flex items-center gap-2 text-sm text-danger">
          <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
          {error}
        </div>
      )}

      <AvatarPrivacyNotice />

      <GlassPanel className="rounded-xl p-4">
        <label className="flex cursor-pointer items-start gap-3 text-sm text-foreground">
          <input
            type="checkbox"
            checked={consent}
            onChange={(event) => onConsentChange(event.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--accent-lime)]"
          />
          본인 사진이거나 사용 권한이 있는 사진입니다.
        </label>
      </GlassPanel>

      <Button
        variant="primary"
        className="w-full sm:w-auto sm:self-end"
        disabled={!previewUrl || !consent}
        onClick={onNext}
      >
        다음 단계
      </Button>
    </div>
  );
}
