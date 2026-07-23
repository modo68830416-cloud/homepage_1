import { Hero } from "@/components/home/Hero";
import { PromoBanner } from "@/components/home/PromoBanner";
import { RegionSection } from "@/components/home/RegionSection";
import { FeaturedSection } from "@/components/home/FeaturedSection";
import { AISection } from "@/components/home/AISection";
import { Statistics } from "@/components/home/Statistics";
import { ReviewSection } from "@/components/home/ReviewSection";
import { CTASection } from "@/components/home/CTASection";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default function HomePage() {
  return (
    <>
      <Hero />
      <PromoBanner />
      <ScrollReveal>
        <RegionSection />
      </ScrollReveal>
      <ScrollReveal>
        <FeaturedSection />
      </ScrollReveal>
      <ScrollReveal>
        <AISection />
      </ScrollReveal>
      <ScrollReveal>
        <Statistics />
      </ScrollReveal>
      <ScrollReveal>
        <ReviewSection />
      </ScrollReveal>
      <ScrollReveal>
        <CTASection />
      </ScrollReveal>
    </>
  );
}
