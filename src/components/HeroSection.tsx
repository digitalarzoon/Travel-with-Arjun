import React from 'react';

interface HeroSectionProps {
  onExplorePackages: () => void;
  onOpenVideoModal?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExplorePackages,
  onOpenVideoModal,
}) => {
  return (
    <section 
      id="hero-section"
      className="relative min-h-[580px] sm:min-h-[640px] lg:min-h-[700px] flex items-center overflow-hidden bg-[#0a1e34]"
    >
      {/* High Quality Authentic Nepal Himalayan Sunrise Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/destinations/sarangkot.jpg" 
          alt="Annapurna Range sunrise from Sarangkot, Nepal" 
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = '/images/destinations/everest-kalapatthar.jpg';
          }}
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
        {/* Dark Gradient Overlay on left to guarantee WCAG contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#031124]/90 via-[#051c38]/70 to-[#020b18]/40" />
      </div>

      {/* Floating 30% OFF Circular Badge matching Mockup (top-right) */}
      <div className="absolute top-8 right-6 sm:top-14 sm:right-16 z-20 hidden sm:block">
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white/95 backdrop-blur-sm p-2 flex flex-col items-center justify-center text-center shadow-2xl border-2 border-dashed border-sky-400 rotate-12 transition-transform hover:rotate-0">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">GET UP TO</span>
          <span className="text-2xl sm:text-3xl font-black text-blue-700 leading-tight">30%</span>
          <span className="text-xs font-black text-amber-500 tracking-wider">OFF</span>
        </div>
      </div>

      {/* Hero Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pb-36 sm:pb-44 w-full">
        <div className="max-w-2xl text-left">
          
          {/* Eye-Catchy Short Slogan Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/60 backdrop-blur-md border border-amber-400/40 text-amber-300 text-xs sm:text-sm font-extrabold tracking-wider uppercase mb-5 shadow-lg">
            <svg className="w-4 h-4 text-amber-400 fill-current rotate-45" viewBox="0 0 24 24">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
            <span className="text-white font-black tracking-widest text-xs">PEAK ADVENTURES • ENDLESS HORIZONS</span>
          </div>

          {/* Main Large Display Headline matching Mockup */}
          <h1 className="font-display font-extrabold text-white tracking-tight leading-[1.08] text-4xl sm:text-5xl md:text-6xl lg:text-7xl drop-shadow-md">
            <span>Travel Beyond Limits,</span>
            <br />
            <span>Create </span>
            <span className="font-script text-[#ffb703] font-bold italic tracking-wide text-5xl sm:text-6xl md:text-7xl lg:text-8xl inline-block drop-shadow-sm ml-1">
              Memories
            </span>
          </h1>

          {/* Subtitle matching Mockup copy */}
          <p className="text-white/90 text-sm sm:text-base md:text-lg font-normal mt-5 max-w-xl leading-relaxed drop-shadow-xs">
            Discover breathtaking world destinations, extreme Himalayan adventures, and pristine peaks at exclusive deals. All tours priced in <strong className="text-amber-300 font-bold">NPR</strong> with 24/7 dedicated support.
          </p>

          {/* Call to action buttons matching mockup */}
          <div className="mt-8 sm:mt-9 flex flex-wrap items-center gap-5 sm:gap-6">
            {/* Primary Yellow "Explore Packages ✈" Button */}
            <button
              id="hero-explore-packages-btn"
              onClick={onExplorePackages}
              className="px-6 sm:px-7 py-3.5 rounded-lg bg-[#f9a825] hover:bg-[#ffb703] text-slate-950 font-bold text-sm sm:text-base tracking-wide transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <span>Explore Packages</span>
              <svg className="w-4 h-4 fill-current rotate-45" viewBox="0 0 24 24">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

