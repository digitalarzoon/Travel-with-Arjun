import React from 'react';
import { X, MapPin, Clock, Ticket, Compass, Check, AlertCircle, ArrowRight } from 'lucide-react';
import type { Attraction, TourPackage, AgencySettings } from '../types';
import { useCurrency } from '../context/CurrencyContext';
import { CurrencySelector } from './CurrencySelector';

interface AttractionDetailModalProps {
  attraction: Attraction | null;
  allPackages: TourPackage[];
  settings: AgencySettings;
  onClose: () => void;
  onSelectPackage: (pkg: TourPackage) => void;
}

export const AttractionDetailModal: React.FC<AttractionDetailModalProps> = ({
  attraction,
  allPackages,
  settings,
  onClose,
  onSelectPackage,
}) => {
  if (!attraction) return null;

  const { formatPrice } = useCurrency();

  const relatedPackages = allPackages.filter((p) =>
    attraction.relatedTourIds?.includes(p.id) ||
    p.destinations.some((d) => attraction.location.toLowerCase().includes(d.toLowerCase()))
  );

  return (
    <div id="attraction-modal-overlay" className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full my-6 overflow-hidden max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Top Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="bg-amber-500 text-slate-950 text-xs font-black px-2.5 py-0.5 rounded-full uppercase">
              {attraction.attractionType}
            </span>
            <span className="text-xs text-slate-300">
              {attraction.location}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <CurrencySelector variant="compact" />
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto flex-1 p-6 sm:p-8 space-y-6">
          <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden shadow-md">
            <img
              src={attraction.image}
              alt={attraction.name}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = '/images/destinations/phewa-lake.jpg';
              }}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="text-amber-400 text-xs font-bold uppercase tracking-widest block">
                Nepal Landmark & Monument
              </span>
              <h2 className="text-2xl sm:text-3xl font-black font-display mt-0.5">
                {attraction.name}
              </h2>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/70 text-xs">
            <div>
              <span className="text-slate-400 font-bold block uppercase text-[10px]">Recommended Time</span>
              <span className="font-extrabold text-slate-800 mt-0.5 block">{attraction.recommendedDuration}</span>
            </div>
            <div>
              <span className="text-slate-400 font-bold block uppercase text-[10px]">Best Season</span>
              <span className="font-extrabold text-slate-800 mt-0.5 block">{attraction.bestTimeToVisit.split('(')[0]}</span>
            </div>
            <div>
              <span className="text-slate-400 font-bold block uppercase text-[10px]">Entry Fee</span>
              <span className="font-extrabold text-slate-800 mt-0.5 block">{attraction.estimatedCostNpr}</span>
            </div>
          </div>

          {/* Detailed description */}
          <div>
            <h3 className="text-base font-extrabold text-slate-900 mb-2 font-display">
              Overview
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {attraction.detailedDescription}
            </p>
          </div>

          {/* Highlights & Things to do */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-amber-50/50 border border-amber-200/60 p-4 rounded-2xl">
              <h4 className="text-xs font-extrabold text-amber-900 uppercase tracking-wider mb-2">
                Main Highlights
              </h4>
              <ul className="space-y-1.5">
                {attraction.mainHighlights.map((h, i) => (
                  <li key={i} className="text-xs text-slate-700 flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-blue-50/50 border border-blue-200/60 p-4 rounded-2xl">
              <h4 className="text-xs font-extrabold text-blue-900 uppercase tracking-wider mb-2">
                Things to Do
              </h4>
              <ul className="space-y-1.5">
                {attraction.thingsToDo.map((t, i) => (
                  <li key={i} className="text-xs text-slate-700 flex items-start gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* How to Reach & Tips */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 text-xs">
            <div>
              <span className="font-bold text-slate-900 block mb-0.5">Transportation & Access:</span>
              <p className="text-slate-600">{attraction.howToReach}</p>
            </div>
            <div>
              <span className="font-bold text-slate-900 block mb-0.5">Local Travel Tips & Etiquette:</span>
              <p className="text-slate-600">{attraction.travelTips}</p>
            </div>
          </div>

          {/* Related Tours */}
          {relatedPackages.length > 0 && (
            <div>
              <h3 className="text-sm font-extrabold text-slate-900 mb-2 font-display">
                Packages that Visit {attraction.name}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {relatedPackages.map((pkg) => (
                  <button
                    key={pkg.id}
                    onClick={() => {
                      onClose();
                      onSelectPackage(pkg);
                    }}
                    className="p-3 border border-slate-200 rounded-xl hover:border-blue-400 text-left flex items-center justify-between cursor-pointer group bg-white"
                  >
                    <div>
                      <span className="text-xs font-bold text-slate-900 group-hover:text-[#0b3b95] line-clamp-1">
                        {pkg.name}
                      </span>
                      <span className="text-[11px] text-slate-500">
                        {pkg.durationDays} Days • {formatPrice(pkg.priceNpr)}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#0b3b95]" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
