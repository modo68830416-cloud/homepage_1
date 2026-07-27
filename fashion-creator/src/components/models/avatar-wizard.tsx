"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { WizardProgress, type WizardStepKey } from "@/components/models/wizard-progress";
import { PhotoUploadStep } from "@/components/models/photo-upload-step";
import { BasicInfoStep } from "@/components/models/basic-info-step";
import { BodyProfileStep } from "@/components/models/body-profile-step";
import { AvatarGeneratingStep } from "@/components/models/avatar-generating-step";
import { AvatarResultStep } from "@/components/models/avatar-result-step";
import { AiGateway } from "@/ai/gateway/ai-gateway";
import { DemoAvatarService } from "@/services/demo-avatar-service";
import { uploadAvatarPhotoRemote } from "@/db/actions/photos";
import { useToast } from "@/components/feedback/toast";
import { DEFAULT_BODY_SETTINGS, type AvatarBasicInfo, type BodySettings } from "@/types/models";

const VALID_STEPS: WizardStepKey[] = ["photo", "info", "body", "generating", "result"];

function isValidStep(value: string | null): value is WizardStepKey {
  return VALID_STEPS.includes(value as WizardStepKey);
}

export function AvatarWizard() {
  const router = useRouter();
  const { isSignedIn } = useUser();
  const searchParams = useSearchParams();
  const stepParam = searchParams.get("step");
  const step: WizardStepKey = isValidStep(stepParam) ? stepParam : "photo";

  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState<string | null>(null);
  const [consent, setConsent] = useState(false);
  const [basicInfo, setBasicInfo] = useState<AvatarBasicInfo>({
    genderPresentation: "feminine",
    ageGroup: "20s",
  });
  const [bodySettings, setBodySettings] = useState<BodySettings>(DEFAULT_BODY_SETTINGS);
  const [description, setDescription] = useState("");
  const [avatarJobId, setAvatarJobId] = useState<string | null>(null);

  const { showToast } = useToast();

  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, [step]);

  // A hard refresh/direct link to ?step=generating has no job (jobs live
  // only in-memory) — send the visitor back to re-run body profile instead
  // of rendering a generating step with nothing to show.
  useEffect(() => {
    if (step === "generating" && !avatarJobId) {
      goToStep("body");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, avatarJobId]);

  useEffect(() => {
    return () => {
      if (photoPreviewUrl) URL.revokeObjectURL(photoPreviewUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function goToStep(next: WizardStepKey) {
    router.push(`/models/create?step=${next}`, { scroll: false });
  }

  function handleStartGenerating() {
    const job = AiGateway.startAvatarJob();
    setAvatarJobId(job.id);
    goToStep("generating");
  }

  function handleRestart() {
    if (photoPreviewUrl) URL.revokeObjectURL(photoPreviewUrl);
    setPhotoFile(null);
    setPhotoPreviewUrl(null);
    setConsent(false);
    setBasicInfo({ genderPresentation: "feminine", ageGroup: "20s" });
    setBodySettings(DEFAULT_BODY_SETTINGS);
    setDescription("");
    goToStep("photo");
  }

  async function handleSave(name: string) {
    let photoBlobPathname: string | undefined;
    if (isSignedIn && photoFile) {
      try {
        const formData = new FormData();
        formData.set("photo", photoFile);
        const uploaded = await uploadAvatarPhotoRemote(formData);
        photoBlobPathname = uploaded.pathname;
      } catch {
        showToast("사진 업로드에 실패해 미리보기만 저장되었습니다", "info");
      }
    }
    const avatar = DemoAvatarService.saveAvatar({
      name,
      source: photoFile ? "photo" : "preset",
      basicInfo,
      bodySettings,
      photoBlobPathname,
    });
    DemoAvatarService.selectAvatarAsModel(avatar);
    showToast(`${name} 아바타를 저장했습니다`);
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
      <h1 ref={headingRef} tabIndex={-1} className="sr-only">
        아바타 생성 · {step} 단계
      </h1>
      <WizardProgress current={step} />

      <GlassPanel className="rounded-2xl p-6 sm:p-8">
        {step === "photo" && (
          <PhotoUploadStep
            previewUrl={photoPreviewUrl}
            consent={consent}
            onPhotoChange={(file, previewUrl) => {
              setPhotoFile(file);
              setPhotoPreviewUrl(previewUrl);
            }}
            onConsentChange={setConsent}
            onNext={() => goToStep("info")}
          />
        )}

        {step === "info" && (
          <BasicInfoStep
            value={basicInfo}
            onChange={setBasicInfo}
            onNext={() => goToStep("body")}
            onBack={() => goToStep("photo")}
          />
        )}

        {step === "body" && (
          <BodyProfileStep
            settings={bodySettings}
            onChange={setBodySettings}
            description={description}
            onDescriptionChange={setDescription}
            onNext={handleStartGenerating}
            onBack={() => goToStep("info")}
          />
        )}

        {step === "generating" && avatarJobId && (
          <AvatarGeneratingStep
            jobId={avatarJobId}
            basicInfo={basicInfo}
            bodySettings={bodySettings}
            onComplete={() => goToStep("result")}
            onCancel={() => goToStep("body")}
          />
        )}

        {step === "result" && (
          <AvatarResultStep
            basicInfo={basicInfo}
            bodySettings={bodySettings}
            onBodySettingsChange={setBodySettings}
            onSave={handleSave}
            onRestart={handleRestart}
            onGoToStudio={() => router.push("/studio")}
          />
        )}
      </GlassPanel>
    </div>
  );
}
