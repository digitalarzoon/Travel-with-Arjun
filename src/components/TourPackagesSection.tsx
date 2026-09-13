import React, { useState, useMemo } from 'react';
import { 
  MapPin, 
  Sparkles, 
  Star, 
  ArrowRight, 
  SlidersHorizontal,
  Heart,
  Calendar
} from 'lucide-react';
import type { TourPackage, AgencySettings } from '../types';
import { useCurrency } from '../context/CurrencyContext';
import { CurrencySelector } from './CurrencySelector';

interface TourPackagesSectionProps {
  packages: TourPackage[];
  settings: AgencySettings;
  favorites: string[];
  onToggleFavorite: (tourId: string) => void;
  onSelectPackage: (pkg: TourPackage) => void;
  onBookPackage: (pkg: TourPackage) => void;
  selectedCategory?: string;
}

export const TourPackagesSection: React.FC<TourPackagesSectionProps> = ({
  packages,
  settings,
  favorites,
  onToggleFavorite,
  onSelectPackage,
  onBookPackage,
  selectedCategory = 'all',
}) => {
  const { formatPrice, formatSecondaryPrice } = useCurrency();
  const [activeCategory, setActiveCategory] = useState<string>(selectedCategory);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'duration'>('featured');

  const categories = [
    { id: 'all', label: 'All Packages' },
    { id: 'Trekking', label: 'Himalayan Treks' },
    { id: 'Cultural & Heritage', label: 'Cultural & Heritage' },
    { id: 'Wildlife & Safari', label: 'Wildlife & Safari' },
    { id: 'Helicopter & Flight', label: 'Helicopter Tours' },
    { id: 'Adventure', label: 'Adventure Sports' },
  ];

  const filteredPackages = useMemo(() => {
    let list = [...packages];
    if (activeCategory !== 'all') {
      list = list.filter((p) => p.category === activeCategory || p.category.includes(activeCategory));
    }
    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.priceNpr - b.priceNpr);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.priceNpr - a.priceNpr);
    } else if (sortBy === 'duration') {
      list.sort((a, b) => b.durationDays - a.durationDays);
    } else {
      list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
    return list;
  }, [packages, activeCategory, sortBy]);

  return (
    <section id="packages-section" className="py-16 sm:py-20 bg-slate-50/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Bar matching mockup: "POPULAR PACKAGES" on left, "View All Packages →" on right */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#0066cc] block mb-1">
              Top Rated Worldwide & Himalayan Journeys
            </span>
            <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-slate-900 tracking-tight uppercase">
              POPULAR PACKAGES
            </h2>
          </div>

          <button
            onClick={() => setActiveCategory('all')}
            className="text-xs sm:text-sm font-extrabold text-[#0066cc] hover:text-[#0055b3] flex items-center gap-1.5 transition-colors group self-start sm:self-auto cursor-pointer"
          >
            <span>View All Packages</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Filter Pills & Sorting */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8 bg-white p-2.5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-[#0066cc] text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3 self-end">
            <CurrencySelector variant="pill" />
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
              <span>Sort:</span>
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="bg-slate-100 text-slate-800 font-bold px-2 py-1 rounded-lg border-0 cursor-pointer focus:outline-hidden"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="duration">Duration: Longest</option>
              </select>
            </div>
          </div>
        </div>

        {/* 4-Column Card Grid matching exact mockup design */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPackages.map((pkg) => {
            const isFav = favorites.includes(pkg.id);
            return (
              <div
                key={pkg.id}
                id={`package-card-${pkg.id}`}
                className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-lg shadow-slate-200/60 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Image with curved/rounded top and hover zoom */}
                  <div className="relative h-52 overflow-hidden bg-slate-100">
                    <img
                      src={pkg.heroImage}
                      alt={pkg.name}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = '/images/destinations/sarangkot.jpg';
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />

                    {/* Category pill */}
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-extrabold text-[#0066cc] shadow-xs">
                      {pkg.category}
                    </span>

                    {/* Wishlist toggle */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(pkg.id);
                      }}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-700 hover:text-rose-600 transition-colors shadow-xs cursor-pointer"
                      title={isFav ? 'Remove from wishlist' : 'Save to wishlist'}
                    >
                      <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : 'text-slate-600'}`} />
                    </button>
                  </div>

                  {/* Card Content matching mockup */}
                  <div className="p-5 pb-3">
                    {/* Title */}
                    <h3 
                      onClick={() => onSelectPackage(pkg)}
                      className="font-display font-extrabold text-base text-slate-900 group-hover:text-[#0066cc] transition-colors line-clamp-1 cursor-pointer"
                    >
                      {pkg.name}
                    </h3>

                    {/* Location & Duration Row matching mockup: 📍 Country & ✦ Days/Nights */}
                    <div className="flex items-center justify-between text-xs text-slate-500 mt-2 font-medium">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#0066cc] shrink-0" />
                        <span className="line-clamp-1">{pkg.destinations[0] || 'Nepal'}</span>
                      </div>

                      <div className="flex items-center gap-1 text-slate-500 font-semibold">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span>{pkg.durationDays} Days / {pkg.durationNights} Nights</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Row matching mockup: Price in NPR / USD, Star Rating, and Sky-Blue Circle Arrow */}
                <div className="p-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="text-base sm:text-lg font-black text-[#0066cc] font-display">
                      {formatPrice(pkg.priceNpr)}
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-slate-400 font-semibold">
                      <span className="uppercase">Per Person</span>
                      <span>•</span>
                      <span className="text-slate-500 font-medium">
                        {formatSecondaryPrice(pkg.priceNpr)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Rating badge */}
                    <div className="flex items-center gap-1 text-xs font-bold text-amber-600">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{pkg.rating}</span>
                    </div>

                    {/* Circular Blue Action Button matching mockup */}
                    <button
                      onClick={() => onSelectPackage(pkg)}
                      className="w-9 h-9 rounded-full bg-sky-100 hover:bg-[#0066cc] text-[#0066cc] hover:text-white flex items-center justify-center transition-all shadow-xs cursor-pointer group-hover:scale-105"
                      title="View Details & Itinerary"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
