import { getAvatarSeed, getGenerationSteps } from "@/lib/avatar-demo";
import type { AvatarProvider } from "@/ai/types/provider";

export class DemoAvatarProvider implements AvatarProvider {
  readonly name = "demo";

  async generate(input: Parameters<AvatarProvider["generate"]>[0]) {
    return {
      previewImage: getAvatarSeed(input.basicInfo.genderPresentation, input.bodySettings),
      steps: getGenerationSteps(),
    };
  }
}
