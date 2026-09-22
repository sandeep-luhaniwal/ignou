import { HomeHero } from "@/components/home/HomeHero";
import { PopularAssignmentsSection } from "@/components/home/PopularAssignmentsSection";
import { HandwrittenSection } from "@/components/home/HandwrittenSection";
import { WhyChooseUsSection } from "@/components/home/WhyChooseUsSection";
import { ExploreGuidesSection } from "@/components/home/ExploreGuidesSection";
import { HomeFaqSection } from "@/components/home/HomeFaqSection";
import { SupportBand } from "@/components/page-kit";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground pb-12">
      <HomeHero />
      <PopularAssignmentsSection />
      <HandwrittenSection />
      <WhyChooseUsSection />
      <ExploreGuidesSection />
      <HomeFaqSection />
      <SupportBand
        title="Not sure which course code you need?"
        text="Our support team will help confirm your programme, session and the exact assignment set."
      />
    </main>
  );
}
