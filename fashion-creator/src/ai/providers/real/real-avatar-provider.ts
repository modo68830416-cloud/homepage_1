import { getGenerationSteps } from "@/lib/avatar-demo";
import { generateRealAvatarImage } from "@/ai/providers/real/real-avatar-action";
import type { AvatarProvider } from "@/ai/types/provider";

// Thin client-safe wrapper — the actual AI Gateway call, Blob upload, and
// auth check all happen server-side in real-avatar-action.ts. `previewImage`
// here carries a real displayable URL (unlike the DEMO provider, where it's
// just a PlaceholderArt seed) — see AiGateway.completeAvatarJob, which
// disambiguates by `result.provider`.
export class RealAvatarProvider implements AvatarProvider {
  readonly name = "gemini-nanobanana";

  async generate(input: Parameters<AvatarProvider["generate"]>[0]) {
    const formData = new FormData();
    formData.set("basicInfo", JSON.stringify(input.basicInfo));
    formData.set("bodySettings", JSON.stringify(input.bodySettings));
    if (input.photoFile) formData.set("photo", input.photoFile);

    const { previewImageUrl } = await generateRealAvatarImage(formData);
    return { previewImage: previewImageUrl, steps: getGenerationSteps() };
  }
}
