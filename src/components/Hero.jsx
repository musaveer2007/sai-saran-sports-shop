export function Hero() {
  return (
    <section className="relative w-full min-h-[90dvh] bg-[var(--cream)] flex items-center justify-center pt-24 pb-16 overflow-hidden">
      
      {/* Subtle decorative geometric element */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-[var(--beige)] rounded-full mix-blend-multiply opacity-30 blur-3xl translate-x-1/3 -translate-y-1/3 pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
        
        {/* Left Side: Typography & CTA */}
        <div className="w-full lg:w-1/2 flex flex-col items-start text-left pt-12 lg:pt-0">
          
          {/* Eyebrow */}
          <div className="flex items-center gap-4 mb-6">
            <span className="h-[1px] w-8 bg-[var(--red)]"></span>
            <span className="text-xs tracking-[0.2em] font-semibold text-[var(--red)] uppercase">
              Est. 2010 · Ponneri
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-[5rem] leading-[1.05] font-serif font-medium text-[var(--charcoal)] mb-6">
            GEAR UP.<br />
            PLAY <span className="text-[var(--red)] italic pr-2">HARDER.</span>
          </h1>

          {/* Supporting Text */}
          <p className="text-lg md:text-xl text-[var(--charcoal)] opacity-80 max-w-md mb-10 leading-relaxed font-light">
            Quality sports equipment and apparel built for every game, every team, and every ambition.
          </p>

          {/* Call to Action */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <button className="w-full sm:w-auto px-8 py-4 bg-[var(--red)] text-white font-medium tracking-wide hover:bg-red-700 transition-colors duration-300">
              SHOP PRODUCTS
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-transparent text-[var(--charcoal)] border border-[var(--charcoal)] font-medium tracking-wide hover:bg-[var(--charcoal)] hover:text-white transition-colors duration-300">
              GET A QUOTE
            </button>
          </div>
        </div>

        {/* Right Side: Premium Sports Visual */}
        <div className="w-full lg:w-1/2 relative flex justify-center lg:justify-end mt-8 lg:mt-0">
          <div className="relative w-full max-w-[600px] aspect-square lg:aspect-[4/3] rounded-2xl overflow-hidden">
            <img 
              src="/images/hero-sports.png" 
              alt="Premium Sports Equipment including Football, Volleyball, Badminton, and Cricket" 
              className="w-full h-full object-cover object-center"
              loading="eager"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
