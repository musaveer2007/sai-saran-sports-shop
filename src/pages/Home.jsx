import { Hero } from "../components/Hero";

// Existing Sai Saran Components (reused)
import { Ticker } from "../components/Ticker";
import { StatsBar } from "../components/StatsBar";
import { Products } from "../components/Products";
import { JerseyPrinting } from "../components/JerseyPrinting";
import { WhyUs } from "../components/WhyUs";
import { Contact } from "../components/Contact";

/**
 * Home - Merged flagship page
 */
export function Home() {
  return (
    <main className="bg-[var(--cream)]">
      {/* Premium Static Hero Section */}
      <Hero />

      {/* Rest of the Sai Saran Sports Shop */}
      <div className="shop-content-below relative z-20">
        <Ticker />
        <StatsBar />
        <Products />
        <JerseyPrinting />
        <WhyUs />
        <Contact />
      </div>
    </main>
  );
}
