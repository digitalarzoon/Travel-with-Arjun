import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Calendar, 
  Users, 
  ShieldCheck, 
  Star, 
  Heart, 
  MessageSquare, 
  Plane, 
  Check, 
  AlertCircle, 
  Luggage, 
  Utensils, 
  Wifi, 
  Compass, 
  UserCheck,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import type { TourPackage, AgencySettings } from '../types';
import { useCurrency } from '../context/CurrencyContext';
import { CurrencySelector } from './CurrencySelector';

interface TourDetailModalProps {
  pkg: TourPackage | null;
  settings: AgencySettings;
  isFavorite: boolean;
  onToggleFavorite: (tourId: string) => void;
  onClose: () => void;
  onBookNow: (pkg: TourPackage) => void;
}

export const TourDetailModal: React.FC<TourDetailModalProps> = ({
  pkg,
  settings,
  isFavorite,
  onToggleFavorite,
  onClose,
  onBookNow,
}) => {
  if (!pkg) return null;

  const { formatPrice, formatSecondaryPrice, currency } = useCurrency();
  const [activeTab, setActiveTab] = useState<'itinerary' | 'cost' | 'details' | 'logistics'>('itinerary');
  const [expandedDay, setExpandedDay] = useState<number>(1);
  const [selectedImage, setSelectedImage] = useState<string>(pkg.heroImage);

  const whatsappUrl = `https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    `Namaste Travel with Arjun! I am interested in booking the "${pkg.name}" (${pkg.durationDays} Days, ${formatPrice(pkg.priceNpr)} / approx. ${formatSecondaryPrice(pkg.priceNpr)}). Could you please share available dates and customized details?`
  )}`;

  return (
    <div id="tour-detail-modal" className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full my-6 overflow-hidden max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Top Bar */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2">
            <span className="bg-amber-500 text-slate-950 text-xs font-black px-2.5 py-0.5 rounded-full uppercase">
              {pkg.category}
            </span>
            <span className="text-xs text-slate-300 hidden sm:inline">
              {pkg.destinations.join(' • ')}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onToggleFavorite(pkg.id)}
              className="p-2 rounded-full hover:bg-slate-800 text-slate-300 hover:text-rose-400 transition-colors cursor-pointer"
              title={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 p-5 sm:p-8 space-y-8">
          {/* Header & Main Info */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 font-display max-w-xl">
                {pkg.name}
              </h1>
              <div className="text-right">
                <div className="flex items-center justify-end gap-2 mb-1">
                  <span className="text-xs text-slate-400 font-bold uppercase">Package Price</span>
                  <CurrencySelector variant="compact" />
                </div>
                <div className="flex items-baseline gap-1 justify-end">
                  <span className="text-3xl font-black text-[#0b3b95] font-display">
                    {formatPrice(pkg.priceNpr)}
                  </span>
                  <span className="text-xs text-slate-500 font-semibold">/ {pkg.priceType}</span>
                </div>
                <div className="text-[11px] text-slate-400 font-medium">
                  Equiv: {formatSecondaryPrice(pkg.priceNpr)}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 mt-2">
              <div className="flex items-center gap-1 text-amber-500 font-bold">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{pkg.rating}</span>
                <span className="text-slate-400">({pkg.reviewsCount} verified traveler reviews)</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>Starts & Ends: {pkg.startingPoint}</span>
              </div>
            </div>
          </div>

          {/* Media Showcase: Main image + gallery thumbnails */}
          <div className="space-y-3">
            <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden bg-slate-100 shadow-md">
              <img
                src={selectedImage}
                alt={pkg.name}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/images/destinations/sarangkot.jpg';
                }}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-xl">
                {pkg.durationDays} Days / {pkg.durationNights} Nights
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {[pkg.heroImage, ...(pkg.gallery || [])].map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                    selectedImage === img ? 'border-[#0b3b95] scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img 
                    src={img} 
                    alt="Thumbnail" 
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = '/images/destinations/sarangkot.jpg';
                    }}
                    className="w-full h-full object-cover" 
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Stats Grid (Trip Information) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
            <div className="p-3 bg-white rounded-xl border border-slate-100 shadow-2xs">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Duration</span>
              <div className="flex items-center gap-1.5 mt-1 text-sm font-black text-slate-800">
                <Calendar className="w-4 h-4 text-[#0b3b95]" />
                <span>{pkg.durationDays}D / {pkg.durationNights}N</span>
              </div>
            </div>

            <div className="p-3 bg-white rounded-xl border border-slate-100 shadow-2xs">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Difficulty</span>
              <div className="flex items-center gap-1.5 mt-1 text-sm font-black text-slate-800">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>{pkg.difficulty}</span>
              </div>
            </div>

            <div className="p-3 bg-white rounded-xl border border-slate-100 shadow-2xs">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Best Season</span>
              <div className="flex items-center gap-1.5 mt-1 text-sm font-black text-slate-800">
                <Compass className="w-4 h-4 text-amber-500" />
                <span>{pkg.bestSeason}</span>
              </div>
            </div>

            <div className="p-3 bg-white rounded-xl border border-slate-100 shadow-2xs">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Group Size</span>
              <div className="flex items-center gap-1.5 mt-1 text-sm font-black text-slate-800">
                <Users className="w-4 h-4 text-blue-600" />
                <span>{pkg.groupSize}</span>
              </div>
            </div>
          </div>

          {/* Highlights Section */}
          <div className="bg-amber-50/50 border border-amber-200/60 rounded-2xl p-6">
            <h3 className="text-base font-extrabold text-slate-900 mb-3 font-display flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-500 fill-amber-400" />
              <span>Tour Highlights</span>
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {pkg.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-800 font-medium">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation Tabs for Deep Details */}
          <div>
            <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-1">
              {[
                { id: 'itinerary', label: 'Day-by-Day Itinerary' },
                { id: 'cost', label: 'Cost Includes & Excludes' },
                { id: 'details', label: 'What to Pack & Season' },
                { id: 'logistics', label: 'Food, Lodges & Safety' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? 'border-[#0b3b95] text-[#0b3b95]'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab 1: Day-by-Day Itinerary */}
            {activeTab === 'itinerary' && (
              <div className="pt-6 space-y-3">
                <p className="text-xs text-slate-500 mb-4">
                  Carefully planned by our Nepal ground team with optimal acclimatization, scenic rest points, and authentic local food stops.
                </p>

                {pkg.itinerary.map((day) => {
                  const isExpanded = expandedDay === day.day;
                  return (
                    <div
                      key={day.day}
                      className="border border-slate-200 rounded-2xl overflow-hidden transition-all bg-white"
                    >
                      <button
                        onClick={() => setExpandedDay(isExpanded ? 0 : day.day)}
                        className="w-full text-left p-4 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-lg bg-[#0b3b95] text-white font-black text-xs flex items-center justify-center shrink-0">
                            D{day.day}
                          </span>
                          <div>
                            <h4 className="text-sm font-extrabold text-slate-900">
                              {day.title}
                            </h4>
                            {day.altitude && (
                              <span className="text-[11px] text-amber-600 font-semibold">
                                Max Altitude: {day.altitude}
                              </span>
                            )}
                          </div>
                        </div>

                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-slate-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-slate-400" />
                        )}
                      </button>

                      {isExpanded && (
                        <div className="p-4 pt-0 border-t border-slate-100 text-xs sm:text-sm text-slate-700 space-y-2 bg-slate-50/50">
                          <p className="leading-relaxed">{day.activities}</p>
                          <div className="flex flex-wrap gap-4 text-xs text-slate-500 pt-2 border-t border-slate-200/50">
                            {day.transportation && (
                              <span><strong>Transport:</strong> {day.transportation}</span>
                            )}
                            {day.accommodation && (
                              <span><strong>Stay:</strong> {day.accommodation}</span>
                            )}
                            {day.meals && (
                              <span><strong>Meals:</strong> {day.meals}</span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Tab 2: Cost Details */}
            {activeTab === 'cost' && (
              <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Cost Includes */}
                <div className="bg-emerald-50/50 border border-emerald-200/70 rounded-2xl p-6">
                  <h4 className="text-sm font-extrabold text-emerald-900 mb-3 flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Cost Includes</span>
                  </h4>
                  <ul className="space-y-2">
                    {pkg.inclusions.map((item, i) => (
                      <li key={i} className="text-xs sm:text-sm text-slate-800 flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Cost Excludes */}
                <div className="bg-rose-50/50 border border-rose-200/70 rounded-2xl p-6">
                  <h4 className="text-sm font-extrabold text-rose-900 mb-3 flex items-center gap-2">
                    <X className="w-4 h-4 text-rose-600" />
                    <span>Cost Excludes</span>
                  </h4>
                  <ul className="space-y-2">
                    {pkg.exclusions.map((item, i) => (
                      <li key={i} className="text-xs sm:text-sm text-slate-800 flex items-start gap-2">
                        <X className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Tab 3: What to Pack & Season */}
            {activeTab === 'details' && (
              <div className="pt-6 space-y-6">
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                  <h4 className="text-sm font-extrabold text-slate-900 mb-3 flex items-center gap-2">
                    <Luggage className="w-4 h-4 text-[#0b3b95]" />
                    <span>Recommended Packing Checklist</span>
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {pkg.whatToPack.map((item, i) => (
                      <li key={i} className="text-xs sm:text-sm text-slate-700 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0b3b95] mt-1.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-blue-50/50 border border-blue-200/60 rounded-2xl p-5">
                  <h4 className="text-sm font-extrabold text-slate-900 mb-1">
                    Best Season for this Package
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    Recommended: <strong>{pkg.bestSeason}</strong>. Please note high mountain conditions can change; our Kathmandu flight and ground crew monitor regional conditions daily.
                  </p>
                </div>
              </div>
            )}

            {/* Tab 4: Logistics & Reality Guide */}
            {activeTab === 'logistics' && (
              <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 mb-1.5">
                    <Utensils className="w-3.5 h-3.5 text-amber-500" />
                    Food & Dining
                  </h4>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {pkg.foodInfo}
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 mb-1.5">
                    <Wifi className="w-3.5 h-3.5 text-blue-500" />
                    Electricity & Wi-Fi
                  </h4>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {pkg.electricityWifiInfo}
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 mb-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-emerald-500" />
                    Guides & Porters
                  </h4>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {pkg.guideInfo}
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 mb-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-rose-500" />
                    Safety & Medical
                  </h4>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {pkg.safetyInfo}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Bottom Fixed CTA Actions matching image theme */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          <div>
            <span className="text-xs text-slate-500 font-bold block">
              Total Estimated Price
            </span>
            <span className="text-2xl font-black text-[#0b3b95] font-display">
              {formatPrice(pkg.priceNpr)}{' '}
              <span className="text-xs font-normal text-slate-600">per person ({formatSecondaryPrice(pkg.priceNpr)})</span>
            </span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl transition-colors shadow-sm"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Inquiry</span>
            </a>

            <button
              onClick={() => {
                onClose();
                onBookNow(pkg);
              }}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-[#0b3b95] hover:bg-[#082a6b] text-white font-extrabold text-xs sm:text-sm px-7 py-3 rounded-xl shadow-md transition-all cursor-pointer transform active:scale-95"
            >
              <span>Book / Send Inquiry</span>
              <Plane className="w-4 h-4 text-amber-300 rotate-45" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
