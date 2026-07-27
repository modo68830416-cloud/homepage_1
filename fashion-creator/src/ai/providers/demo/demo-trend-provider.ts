import { DemoProductService } from "@/services/demo-product-service";
import type { TrendProvider } from "@/ai/types/provider";

export class DemoTrendProvider implements TrendProvider {
  readonly name = "demo";

  async getTrending(limit = 10) {
    return DemoProductService.getTrending(limit);
  }
}
