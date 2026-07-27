import { Hero } from "@/components/home/Hero";
import { WhyFashionCreator } from "@/components/home/WhyFashionCreator";
import { TrendPreview } from "@/components/home/TrendPreview";
import { AIModelPreview } from "@/components/home/AIModelPreview";
import { CreationFlow } from "@/components/home/CreationFlow";
import { LookPreview } from "@/components/home/LookPreview";
import { CreatorSuccess } from "@/components/home/CreatorSuccess";
import { MarketplacePreview } from "@/components/home/MarketplacePreview";
import { FinalCTA } from "@/components/home/FinalCTA";
import { Marquee } from "@/components/motion/Marquee";

const marqueeItems = [
  "Try. Create. Share. Sell.",
  "AI Avatar",
  "Virtual Fitting",
  "Shoppable Video",
  "Creator Marketplace",
];

export default function Home() {
  return (
    <>
      <Hero />
      <div className="border-y border-border py-6">
        <Marquee items={marqueeItems} />
      </div>
      <WhyFashionCreator />
      <TrendPreview />
      <AIModelPreview />
      <CreationFlow />
      <LookPreview />
      <CreatorSuccess />
      <MarketplacePreview />
      <FinalCTA />
    </>
  );
}
