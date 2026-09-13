import React from 'react';
import { Compass, Headphones, MapPin, ShieldCheck, Plane } from 'lucide-react';
import type { AgencySettings } from '../types';

interface BentoOfferSectionProps {
  settings: AgencySettings;
  onExploreDeals: () => void;
}

export const BentoOfferSection: React.FC<BentoOfferSectionProps> = ({
  settings,
  onExploreDeals,
}) => {
  return (
    <section id="special-offers-section" className="py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Special Offer Card matching mockup */}
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden shadow-lg min-h-[380px] flex flex-col justify-between p-8 sm:p-10 text-white group">
            {/* Background Image of Himalayan Trek in Nepal */}
            <img
              src="/images/destinations/everest-ebc.jpg"
              alt="Himalayan Adventure in Nepal"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = '/images/destinations/annapurna-abc.jpg';
              }}
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/50 to-blue-950/40" />

            <div className="relative z-10">
              <span className="font-script text-amber-300 text-2xl sm:text-3xl font-bold tracking-wide block mb-1">
                Special Offer
              </span>
              <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-display leading-tight">
                Adventure Awaits!
              </h3>
              <p className="text-slate-200 text-sm sm:text-base mt-2 max-w-sm leading-relaxed">
                Get up to <strong className="text-amber-300">30% OFF</strong> on selected international and Nepal tour packages.
              </p>
            </div>

            <div className="relative z-10 pt-6">
              <button
                id="explore-deals-btn"
                onClick={onExploreDeals}
                className="bg-white hover:bg-amber-400 text-slate-900 font-extrabold px-6 py-3 rounded-lg text-sm tracking-wide shadow-md transition-all flex items-center gap-2 cursor-pointer transform active:scale-95"
              >
                <span>Explore Deals</span>
                <Plane className="w-4 h-4 rotate-45 text-[#145a4e]" />
              </button>
            </div>
          </div>

          {/* Right "Why Choose Travel with Arjun" matching mockup */}
          <div className="lg:col-span-7 bg-slate-50 border border-slate-100 rounded-2xl p-6 sm:p-8 flex flex-col justify-center">
            <div className="mb-6">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
                Why Choose {settings.agencyName}?
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                We make world travel effortless, safe, and memorable with dedicated support.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {/* Feature 1 */}
              <div className="bg-white p-4.5 rounded-xl shadow-xs border border-slate-100 flex items-start gap-3.5 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-teal-50 text-[#145a4e] flex items-center justify-center shrink-0">
                  <Compass className="w-5 h-5 text-[#145a4e]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 leading-snug">
                    Tailored Packages
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Customized travel plans designed to fit your unique style and needs.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="bg-white p-4.5 rounded-xl shadow-xs border border-slate-100 flex items-start gap-3.5 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-teal-50 text-[#145a4e] flex items-center justify-center shrink-0">
                  <Headphones className="w-5 h-5 text-[#145a4e]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 leading-snug">
                    24/7 Dedicated Support
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Around the clock assistance for smooth, stress-free trips anytime.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="bg-white p-4.5 rounded-xl shadow-xs border border-slate-100 flex items-start gap-3.5 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-teal-50 text-[#145a4e] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#145a4e]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 leading-snug">
                    Local Expert Guides
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Certified local guides based in Kathmandu sharing authentic stories and hidden gems.
                  </p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="bg-white p-4.5 rounded-xl shadow-xs border border-slate-100 flex items-start gap-3.5 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-teal-50 text-[#145a4e] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-[#145a4e]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 leading-snug">
                    Secure & Transparent NPR Rates
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    All prices quoted clearly in NPR with zero hidden surcharges.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

