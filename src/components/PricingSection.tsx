import React from 'react';
import { Check, Send } from 'lucide-react';
import type { AgencySettings, TourPackage } from '../types';
import { useCurrency } from '../context/CurrencyContext';
import { CurrencySelector } from './CurrencySelector';

interface PricingSectionProps {
  settings: AgencySettings;
  onSelectTier: (tierName: string, priceNpr: number) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  settings,
  onSelectTier,
}) => {
  const { formatPrice, formatSecondaryPrice } = useCurrency();
  const tiers = [
    {
      id: 'economy',
      name: 'Economy',
      subtitle: 'Great value for smart travelers',
      priceNpr: 49999,
      isPopular: false,
      features: [
        'Economy Class Flights / Tourist Coach',
        '20kg Baggage Allowance',
        'Standard Hotels & Mountain Lodges',
        'Airport Pickup & Dropoff Transfers',
      ],
      ctaText: 'Select Plan',
    },
    {
      id: 'premium',
      name: 'Premium',
      subtitle: 'Comfort and convenience',
      priceNpr: 89999,
      isPopular: true,
      popularTag: 'Most Popular',
      features: [
        'Premium Economy Flights / Private AC Van',
        '25kg Baggage Allowance',
        '4-Star Boutique Heritage Hotels',
        'Airport Pickup & Dropoff Transfers',
        'City Tours & Heritage Sightseeing',
      ],
      ctaText: 'Select Plan',
    },
    {
      id: 'business',
      name: 'Business',
      subtitle: 'Luxury and flexibility',
      priceNpr: 149999,
      isPopular: false,
      features: [
        'Business Class Domestic Flights',
        '30kg Baggage Allowance',
        '5-Star Luxury Mountain Resorts',
        'Airport Transfers (Private Sedan)',
        'City Tours with Private Historian',
        'Airport Lounge Access & Express Entry',
      ],
      ctaText: 'Select Plan',
    },
    {
      id: 'luxury',
      name: 'Luxury',
      subtitle: 'The ultimate travel experience',
      priceNpr: 249999,
      isPopular: false,
      features: [
        'First Class Flights / Helicopter Transfers',
        '35kg Baggage Allowance',
        'Premium Luxury Villas & Glamping',
        'Private Chauffeur & VIP Transfers',
        'Exclusive Wildlife Safaris & Trekking',
        '24/7 Dedicated Concierge & Porter Service',
      ],
      ctaText: 'Select Plan',
    },
  ];

  return (
    <section id="pricing-section" className="py-20 bg-[#0066cc] text-white relative overflow-hidden">
      {/* Decorative Origami Paper Airplane on the left (matching mockup) */}
      <div className="absolute -left-10 top-16 w-56 sm:w-72 h-56 sm:h-72 pointer-events-none opacity-25 lg:opacity-35">
        <svg viewBox="0 0 300 300" className="w-full h-full" fill="none">
          <polygon points="260,40 30,160 160,190" fill="#ffffff" />
          <polygon points="260,40 160,190 220,230" fill="#e0f2fe" />
          <polygon points="30,160 160,190 120,220" fill="#bae6fd" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading matching mockup */}
        <div className="mb-14 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="w-12 h-1 bg-white/40 rounded-full mb-3" />
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight uppercase">
              PRICING DETAILS
            </h2>
            <p className="text-sky-100 text-sm sm:text-base mt-2 max-w-xl">
              Choose the perfect travel tier for your adventure. All packages include permits, taxes, and transparent pricing.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/20 self-start sm:self-auto">
            <CurrencySelector variant="pill" showRateTip />
          </div>
        </div>

        {/* 4 Pricing Cards Grid matching mockup */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
          {tiers.map((tier) => {
            const isPop = tier.isPopular;

            return (
              <div
                key={tier.id}
                className={`relative bg-white text-slate-800 rounded-3xl p-6 sm:p-7 shadow-2xl transition-all duration-300 flex flex-col justify-between ${
                  isPop 
                    ? 'border-4 border-amber-400 lg:-translate-y-4 ring-4 ring-white/20' 
                    : 'border border-white/20 hover:-translate-y-1'
                }`}
              >
                {/* "Most Popular" Tab badge on top (matching mockup) */}
                {isPop && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#004080] text-white text-[11px] font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-t-xl shadow-md">
                    {tier.popularTag}
                  </div>
                )}

                <div>
                  {/* Tier Title */}
                  <h3 className="font-display font-extrabold text-xl text-slate-900 text-center">
                    {tier.name}
                  </h3>
                  <p className="text-slate-400 text-xs text-center mt-1 mb-5">
                    {tier.subtitle}
                  </p>

                  {/* Price in NPR / USD */}
                  <div className="text-center py-4 border-y border-slate-100 my-4 bg-slate-50/70 rounded-2xl">
                    <div className="font-display font-black text-2xl sm:text-3xl text-[#0066cc]">
                      {formatPrice(tier.priceNpr)}
                    </div>
                    <div className="text-[11px] font-bold text-slate-400 mt-0.5">
                      <span className="uppercase">Per Person</span> • <span className="text-slate-500 font-medium">{formatSecondaryPrice(tier.priceNpr)}</span>
                    </div>
                  </div>

                  {/* Features List with blue checks (matching mockup) */}
                  <ul className="space-y-3 my-6">
                    {tier.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs font-medium text-slate-600 leading-snug">
                        <Check className="w-4 h-4 text-[#0066cc] shrink-0 mt-0.5" strokeWidth={3} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Button matching mockup: Solid blue for Most Popular, clean button for others */}
                <button
                  onClick={() => onSelectTier(tier.name, tier.priceNpr)}
                  className={`w-full py-3 rounded-2xl font-extrabold text-xs tracking-wide transition-all shadow-md cursor-pointer mt-4 active:scale-95 ${
                    isPop
                      ? 'bg-[#0066cc] hover:bg-[#0055b3] text-white shadow-blue-500/30'
                      : 'bg-white hover:bg-sky-50 text-[#0066cc] border-2 border-[#0066cc]/40 hover:border-[#0066cc]'
                  }`}
                >
                  {tier.ctaText}
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
