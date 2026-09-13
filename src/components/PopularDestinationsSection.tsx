import React from 'react';
import { ArrowRight, MapPin, Calendar, Compass } from 'lucide-react';
import type { Destination, AgencySettings } from '../types';
import { useCurrency } from '../context/CurrencyContext';

interface PopularDestinationsProps {
  destinations: Destination[];
  settings: AgencySettings;
  onSelectDestination: (dest: Destination) => void;
  onViewAllDestinations: () => void;
}

export const PopularDestinationsSection: React.FC<PopularDestinationsProps> = ({
  destinations,
  settings,
  onSelectDestination,
  onViewAllDestinations,
}) => {
  const { formatPrice } = useCurrency();
  return (
    <section id="destinations-section" className="py-16 md:py-20 bg-slate-50/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header matching image */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-amber-600 mb-2">
              <Compass className="w-4 h-4" />
              <span>EXPLORE BY REGION</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-display">
              Popular Nepal Destinations
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-1.5 max-w-xl">
              From the snow-crowned summits of the Himalayas to medieval Newari courtyards and lush rhinoceros sanctuaries.
            </p>
          </div>

          <button
            id="view-all-destinations-btn"
            onClick={onViewAllDestinations}
            className="group inline-flex items-center gap-2 text-sm font-bold text-[#0b3b95] hover:text-amber-600 transition-colors cursor-pointer"
          >
            <span>View All Destinations</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Destination Cards Grid matching image */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {destinations.slice(0, 5).map((dest) => (
            <div
              key={dest.id}
              id={`destination-card-${dest.id}`}
              onClick={() => onSelectDestination(dest)}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col cursor-pointer transform hover:-translate-y-1"
            >
              {/* Card Image Container */}
              <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                <img
                  src={dest.heroImage}
                  alt={dest.name}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/images/destinations/phewa-lake.jpg';
                  }}
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                
                {/* Destination Type Chip */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-extrabold text-[#0b3b95] shadow-xs">
                  {dest.destinationType}
                </div>

                {/* Country Pill */}
                <div className="absolute bottom-3 left-3 flex items-center gap-1 text-white text-xs font-semibold drop-shadow">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>Nepal • {dest.province}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 group-hover:text-[#0b3b95] transition-colors line-clamp-1">
                    {dest.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {dest.shortDescription}
                  </p>
                </div>

                {/* Duration & Price Row matching image */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{dest.recommendedDuration}</span>
                  </div>

                  <div className="text-right">
                    <span className="block text-[10px] text-slate-500 uppercase font-bold">From</span>
                    <span className="text-sm font-black text-[#0b3b95]">
                      {formatPrice(dest.estimatedCostNpr)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
