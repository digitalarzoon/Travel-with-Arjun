import React, { useState } from 'react';
import { Star, Quote, CheckCircle2, Globe2, Compass } from 'lucide-react';
import type { Review } from '../types';

interface ReviewsSectionProps {
  reviews: Review[];
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'nepali' | 'international'>('all');

  const filteredReviews = reviews.filter((r) => {
    if (activeTab === 'all') return true;
    return r.origin === activeTab;
  });

  const nepaliCount = reviews.filter((r) => r.origin === 'nepali').length;
  const intlCount = reviews.filter((r) => r.origin === 'international').length;

  return (
    <section id="reviews-section" className="py-16 md:py-20 bg-slate-50/80 border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header matching reference image */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-[#0f3d34] text-xs font-bold uppercase tracking-wider mb-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>100% Genuine Travelers & Verified Journeys</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-display">
              What Our Travelers Say
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-1">
              Read authentic feedback from both Nepali adventurers and international travelers who explored with us.
            </p>
          </div>

          {/* Filter Tabs for Foreigner & Nepali (Nepalinglish) reviews */}
          <div className="flex items-center gap-1.5 p-1 bg-white rounded-xl border border-slate-200 shadow-xs self-stretch md:self-auto overflow-x-auto">
            <button
              id="filter-all-reviews-btn"
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-[#0f3d34] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              All Reviews ({reviews.length})
            </button>
            <button
              id="filter-nepali-reviews-btn"
              onClick={() => setActiveTab('nepali')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'nepali'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <span>🇳🇵 Nepali Adventurers</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-900/20">
                {nepaliCount}
              </span>
            </button>
            <button
              id="filter-intl-reviews-btn"
              onClick={() => setActiveTab('international')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'international'
                  ? 'bg-[#0b3b95] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Globe2 className="w-3.5 h-3.5" />
              <span>International Guests</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-blue-900/20">
                {intlCount}
              </span>
            </button>
          </div>
        </div>

        {/* Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredReviews.map((rev) => {
            const isNepali = rev.origin === 'nepali';

            return (
              <div
                key={rev.id}
                id={`review-card-${rev.id}`}
                className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200/90 flex flex-col justify-between hover:shadow-xl transition-all duration-300 relative group transform hover:-translate-y-1"
              >
                <div>
                  {/* Top: Avatar, Name, Origin Badge, Quote */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3.5">
                      <img
                        src={rev.avatar}
                        alt={rev.author}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80';
                        }}
                        className={`w-13 h-13 rounded-full object-cover border-2 shadow-sm ${
                          isNepali ? 'border-emerald-500' : 'border-amber-400'
                        }`}
                      />
                      <div>
                        <h4 className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug">
                          {rev.author}
                        </h4>
                        <span className="text-xs text-slate-500 font-medium block">
                          {rev.location}
                        </span>
                      </div>
                    </div>

                    <Quote className="w-7 h-7 text-slate-200 rotate-180 shrink-0 group-hover:text-amber-200 transition-colors" />
                  </div>

                  {/* Origin Badge & Rating */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>

                    {isNepali ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200/60">
                        <span>🇳🇵</span> Nepali Traveler
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md bg-blue-50 text-blue-800 border border-blue-200/60">
                        <Globe2 className="w-3 h-3 text-blue-600" /> Global Traveler
                      </span>
                    )}
                  </div>

                  {/* Comment */}
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                    "{rev.comment}"
                  </p>
                </div>

                {/* Footer of Card */}
                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <div className="flex items-center gap-1 font-semibold text-slate-700 line-clamp-1 pr-2">
                    <Compass className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span className="truncate">{rev.tourName}</span>
                  </div>
                  <span className="shrink-0 text-slate-600">{rev.date}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
