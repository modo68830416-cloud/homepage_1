import { Hero } from "@/components/home/Hero";
import { RegionSection } from "@/components/home/RegionSection";
import { FeaturedSection } from "@/components/home/FeaturedSection";
import { AISection } from "@/components/home/AISection";
import { Statistics } from "@/components/home/Statistics";
import { ReviewSection } from "@/components/home/ReviewSection";
import { CTASection } from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <RegionSection />
      <FeaturedSection />
      <AISection />
      <Statistics />
      <ReviewSection />
      <CTASection />
    </>
  );
}
