import React from 'react';
import { X, MapPin, Calendar, Compass, ArrowRight, Check, Shield } from 'lucide-react';
import type { Destination, TourPackage, AgencySettings } from '../types';
import { useCurrency } from '../context/CurrencyContext';
import { CurrencySelector } from './CurrencySelector';

interface DestinationDetailModalProps {
  destination: Destination | null;
  allPackages: TourPackage[];
  settings: AgencySettings;
  onClose: () => void;
  onSelectPackage: (pkg: TourPackage) => void;
}

export const DestinationDetailModal: React.FC<DestinationDetailModalProps> = ({
  destination,
  allPackages,
  settings,
  onClose,
  onSelectPackage,
}) => {
  if (!destination) return null;

  const { formatPrice, formatSecondaryPrice } = useCurrency();

  const relatedPackages = allPackages.filter((p) =>
    p.destinations.some((d) => d.toLowerCase().includes(destination.name.toLowerCase()) || destination.name.toLowerCase().includes(d.toLowerCase())) ||
    p.region === destination.region
  );

  return (
    <div id="destination-modal-overlay" className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full my-6 overflow-hidden max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Header Bar */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="bg-blue-600 text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
              {destination.destinationType}
            </span>
            <span className="text-xs text-slate-300">
              {destination.province} • {destination.district}
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
          {/* Hero image and Title */}
          <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden shadow-md">
            <img
              src={destination.heroImage}
              alt={destination.name}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = '/images/destinations/sarangkot.jpg';
              }}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="text-amber-400 text-xs font-bold uppercase tracking-widest block">
                Destination in Nepal
              </span>
              <h2 className="text-2xl sm:text-4xl font-black font-display mt-0.5">
                {destination.name}
              </h2>
              {destination.altitude && (
                <span className="text-xs text-slate-200 font-medium mt-1 inline-block bg-white/20 backdrop-blur-sm px-2.5 py-0.5 rounded-md">
                  Elevation: {destination.altitude}
                </span>
              )}
            </div>
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/70 text-xs">
            <div>
              <span className="text-slate-400 font-bold block uppercase text-[10px]">Best Season</span>
              <span className="font-extrabold text-slate-800 mt-0.5 block">{destination.bestTime}</span>
            </div>
            <div>
              <span className="text-slate-400 font-bold block uppercase text-[10px]">Recommended Stay</span>
              <span className="font-extrabold text-slate-800 mt-0.5 block">{destination.recommendedDuration}</span>
            </div>
            <div>
              <span className="text-slate-400 font-bold block uppercase text-[10px]">Starting Budget</span>
              <span className="font-extrabold text-[#0b3b95] mt-0.5 block">
                {formatPrice(destination.estimatedCostNpr)}
              </span>
              <span className="text-[10px] text-slate-400 block">
                {formatSecondaryPrice(destination.estimatedCostNpr)}
              </span>
            </div>
            <div>
              <span className="text-slate-400 font-bold block uppercase text-[10px]">Access / Transport</span>
              <span className="font-extrabold text-slate-800 mt-0.5 block">{destination.transportation.split('or')[0]}</span>
            </div>
          </div>

          {/* Full Description */}
          <div>
            <h3 className="text-base font-extrabold text-slate-900 mb-2 font-display">
              About {destination.name}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {destination.fullDescription}
            </p>
          </div>

          {/* Highlights */}
          <div className="bg-amber-50/60 border border-amber-200/70 rounded-2xl p-5">
            <h3 className="text-sm font-extrabold text-slate-900 mb-3 font-display">
              Key Experiences & Highlights
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {destination.highlights.map((h, i) => (
                <li key={i} className="text-xs sm:text-sm text-slate-700 flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Attractions in this destination */}
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 mb-3 font-display">
              Prominent Attractions & Sights
            </h3>
            <div className="flex flex-wrap gap-2">
              {destination.attractions.map((att, i) => (
                <span
                  key={i}
                  className="bg-slate-100 text-slate-800 text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200"
                >
                  {att}
                </span>
              ))}
            </div>
          </div>

          {/* Related Tours */}
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 mb-3 font-display">
              Available Tour Packages for {destination.name}
            </h3>
            {relatedPackages.length === 0 ? (
              <p className="text-xs text-slate-500">Contact us for custom itineraries for this destination.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {relatedPackages.map((pkg) => (
                  <div
                    key={pkg.id}
                    onClick={() => {
                      onClose();
                      onSelectPackage(pkg);
                    }}
                    className="p-3 border border-slate-200 rounded-xl hover:border-blue-400 hover:shadow-md transition-all flex items-center justify-between cursor-pointer bg-white group"
                  >
                    <div>
                      <h4 className="text-xs font-extrabold text-slate-900 group-hover:text-[#0b3b95] line-clamp-1">
                        {pkg.name}
                      </h4>
                      <span className="text-[11px] text-slate-500">
                        {pkg.durationDays} Days • {formatPrice(pkg.priceNpr)}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#0b3b95] group-hover:translate-x-1 transition-transform" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
