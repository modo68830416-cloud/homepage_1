import { DemoProductService } from "@/services/demo-product-service";
import type { RecommendationProvider } from "@/ai/types/provider";

export class DemoRecommendationProvider implements RecommendationProvider {
  readonly name = "demo";

  async recommend(worn: Parameters<RecommendationProvider["recommend"]>[0], limit = 3) {
    return DemoProductService.recommendFor(worn, limit);
  }
}
