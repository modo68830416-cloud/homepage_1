"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { WizardProgress, type WizardStepKey } from "@/components/models/wizard-progress";
import { PhotoUploadStep } from "@/components/models/photo-upload-step";
import { BasicInfoStep } from "@/components/models/basic-info-step";
import { BodyProfileStep } from "@/components/models/body-profile-step";
import { AvatarGeneratingStep } from "@/components/models/avatar-generating-step";
import { AvatarResultStep } from "@/components/models/avatar-result-step";
import { useSavedAvatars, useSelectedModel } from "@/lib/model-store";
import { useToast } from "@/components/feedback/toast";
import { DEFAULT_BODY_SETTINGS, type AvatarBasicInfo, type BodySettings } from "@/types/models";

const VALID_STEPS: WizardStepKey[] = ["photo", "info", "body", "generating", "result"];

function isValidStep(value: string | null): value is WizardStepKey {
  return VALID_STEPS.includes(value as WizardStepKey);
}

export function AvatarWizard() {
  const router = useRouter();
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

  const { saveAvatar } = useSavedAvatars();
  const { selectModel } = useSelectedModel();
  const { showToast } = useToast();

  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, [step]);

  useEffect(() => {
    return () => {
      if (photoPreviewUrl) URL.revokeObjectURL(photoPreviewUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function goToStep(next: WizardStepKey) {
    router.push(`/models/create?step=${next}`, { scroll: false });
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

  function handleSave(name: string) {
    const avatarId = `avatar-${Date.now()}`;
    const previewImage = `avatar-${basicInfo.genderPresentation}-${bodySettings.bodyType}`;
    saveAvatar({
      id: avatarId,
      name,
      createdAt: new Date().toISOString(),
      source: photoFile ? "photo" : "preset",
      previewImage,
      genderPresentation: basicInfo.genderPresentation,
      ageGroup: basicInfo.ageGroup,
      height: basicInfo.height,
      weight: basicInfo.weight,
      bodySettings,
      isDemo: true,
    });
    selectModel({
      modelId: avatarId,
      modelType: "avatar",
      modelName: name,
      previewImage,
      bodyProfileSummary: `${bodySettings.bodyType} · ${basicInfo.ageGroup}`,
      styleTags: [],
    });
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
            onNext={() => goToStep("generating")}
            onBack={() => goToStep("info")}
          />
        )}

        {step === "generating" && (
          <AvatarGeneratingStep onComplete={() => goToStep("result")} onCancel={() => goToStep("body")} />
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
