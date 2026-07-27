"use server";

import { generateText } from "ai";
import { put } from "@vercel/blob";
import { requireUserId } from "@/db/actions/require-user";
import type { AvatarBasicInfo, BodySettings } from "@/types/models";

const GENDER_LABEL: Record<string, string> = {
  feminine: "female",
  masculine: "male",
  androgynous: "androgynous",
};

function buildAvatarPrompt(basicInfo: AvatarBasicInfo, bodySettings: BodySettings, hasPhoto: boolean): string {
  const subject = hasPhoto
    ? "Transform this person's uploaded photo into a clean, professional AI fashion-model avatar. Preserve their facial identity and likeness, but present them as a polished catalog model."
    : `Generate a photorealistic full-body fashion-model avatar of a ${GENDER_LABEL[basicInfo.genderPresentation] ?? "androgynous"} model in their ${basicInfo.ageGroup}.`;

  return [
    subject,
    `Body type: ${bodySettings.bodyType}, leg-to-torso proportion: ${bodySettings.proportion}, shoulders: ${bodySettings.shoulder}.`,
    "Studio lighting, plain neutral gray background, forward-facing, entire body visible head to feet, e-commerce fashion catalog style, high quality, no text or watermark.",
  ].join(" ");
}

// Real AI Gateway generation — signed-in users only (requireUserId enforces
// this; the calling RealAvatarProvider is only ever selected once a caller
// has confirmed the visitor is signed in, see AiGateway/registry). The
// uploaded photo (if any) never touches disk here — it's forwarded straight
// to the model as an in-memory buffer and the *output* avatar is what gets
// persisted, to a public Blob (the raw photo stays in the private store from
// src/db/actions/photos.ts).
export async function generateRealAvatarImage(formData: FormData): Promise<{ previewImageUrl: string }> {
  const userId = await requireUserId();

  const basicInfo = JSON.parse(String(formData.get("basicInfo"))) as AvatarBasicInfo;
  const bodySettings = JSON.parse(String(formData.get("bodySettings"))) as BodySettings;
  const photo = formData.get("photo");
  const hasPhoto = photo instanceof File;

  const prompt = buildAvatarPrompt(basicInfo, bodySettings, hasPhoto);

  const result = await generateText(
    hasPhoto
      ? {
          model: "google/gemini-3.1-flash-image-preview",
          messages: [
            {
              role: "user",
              content: [
                { type: "text", text: prompt },
                {
                  type: "image",
                  image: Buffer.from(await (photo as File).arrayBuffer()),
                  mediaType: (photo as File).type,
                },
              ],
            },
          ],
        }
      : {
          model: "google/gemini-3.1-flash-image-preview",
          prompt,
        },
  );

  const imageFile = result.files.find((file) => file.mediaType?.startsWith("image/"));
  if (!imageFile) throw new Error("AI Gateway did not return an image for this avatar generation");

  const blob = await put(`avatars/generated/${userId}/${crypto.randomUUID()}.png`, Buffer.from(imageFile.uint8Array), {
    access: "public",
    contentType: imageFile.mediaType,
  });

  return { previewImageUrl: blob.url };
}
