import { ShieldCheck } from "lucide-react";

export function AvatarPrivacyNotice() {
  return (
    <div className="flex gap-3 rounded-xl border border-border bg-surface p-4">
      <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent-lime" aria-hidden="true" />
      <div className="text-xs leading-relaxed text-foreground-subtle">
        <p>DEMO 모드에서는 사진이 서버에 업로드되지 않으며 브라우저 미리보기에만 사용됩니다.</p>
        <p className="mt-1">
          실제 서비스에서는 암호화·삭제 정책과 별도 동의 절차가 적용됩니다. 아바타는 기본적으로
          비공개로 저장되며, 상업적 사용 전에는 별도 동의가 필요합니다.
        </p>
        <p className="mt-1">본인 사진이거나 사용 권한이 있는 사진만 업로드해주세요.</p>
      </div>
    </div>
  );
}
