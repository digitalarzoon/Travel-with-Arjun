import React from 'react';
import { Sparkles, MapPin, Clock, ArrowRight, Eye } from 'lucide-react';
import type { Attraction } from '../types';

interface AttractionsSectionProps {
  attractions: Attraction[];
  onSelectAttraction: (attraction: Attraction) => void;
}

export const AttractionsSection: React.FC<AttractionsSectionProps> = ({
  attractions,
  onSelectAttraction,
}) => {
  return (
    <section id="attractions-section" className="py-16 md:py-20 bg-slate-50/70 border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-[#0b3b95] mb-2 bg-blue-50 px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-[#0b3b95]" />
              <span>PLACES TO VISIT IN NEPAL</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-display">
              Best Tourist Attractions of Nepal
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-1.5 max-w-2xl">
              Explore individual monuments, ancient pilgrimage sanctuaries, lakeside reflections, and Himalayan lookouts across Nepal.
            </p>
          </div>
        </div>

        {/* Attractions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {attractions.map((att) => (
            <div
              key={att.id}
              id={`attraction-card-${att.id}`}
              onClick={() => onSelectAttraction(att)}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer transform hover:-translate-y-1"
            >
              <div>
                <div className="relative h-60 w-full overflow-hidden bg-slate-100">
                  <img
                    src={att.image}
                    alt={att.name}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = '/images/destinations/phewa-lake.jpg';
                    }}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                  <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-black text-[#0b3b95] shadow-xs">
                    {att.attractionType}
                  </span>

                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white text-xs font-semibold drop-shadow">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>{att.location}</span>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-[#0b3b95] transition-colors leading-snug">
                    {att.name}
                  </h3>

                  <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                    {att.shortIntro}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2 text-[11px] text-slate-500">
                    <div className="flex items-center gap-1 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200/60 font-medium">
                      <Clock className="w-3 h-3 text-[#0b3b95]" />
                      <span>{att.recommendedDuration}</span>
                    </div>
                    <div className="bg-amber-50 text-amber-800 px-2.5 py-1 rounded-md font-semibold text-[11px]">
                      {att.bestTimeToVisit.split('(')[0]}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-slate-100 pt-3 flex items-center justify-between mt-2">
                <span className="text-[11px] font-bold text-slate-500">
                  {att.estimatedCostNpr.split('/')[0]}
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-extrabold text-[#0b3b95] group-hover:underline">
                  View Guide & Tours <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
