import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import Services from "@/components/Services";
import FeaturedProperties from "@/components/FeaturedProperties";

const AboutTeaser = dynamic(() => import("@/components/AboutTeaser"), {
  loading: () => <div className="min-h-[400px] bg-white" />,
});
const ContactSection = dynamic(() => import("@/components/ContactSection"), {
  loading: () => <div className="min-h-[400px] bg-[#0D2340]" />,
});
const Footer = dynamic(() => import("@/components/Footer"), {
  loading: () => <div className="min-h-[200px] bg-[#0A1B2E]" />,
});

export default function Home() {
  return (
    <main className="lg:pb-0 pb-[60px]">
      <Navbar />
      <Hero />
      <StatsBar />
      <Services />
      <FeaturedProperties />
      <AboutTeaser />
      <ContactSection />
      <Footer />
    </main>
  );
}
