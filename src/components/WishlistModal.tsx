import React from 'react';
import { X, Heart, Trash2, ArrowRight, Plane } from 'lucide-react';
import type { TourPackage, AgencySettings } from '../types';
import { useCurrency } from '../context/CurrencyContext';
import { CurrencySelector } from './CurrencySelector';

interface WishlistModalProps {
  favorites: string[];
  allPackages: TourPackage[];
  settings: AgencySettings;
  onRemoveFavorite: (id: string) => void;
  onClose: () => void;
  onSelectPackage: (pkg: TourPackage) => void;
  onBookPackage: (pkg: TourPackage) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  favorites,
  allPackages,
  settings,
  onRemoveFavorite,
  onClose,
  onSelectPackage,
  onBookPackage,
}) => {
  const { formatPrice, formatSecondaryPrice } = useCurrency();
  const favoritePackages = allPackages.filter((p) => favorites.includes(p.id));

  return (
    <div id="wishlist-modal-overlay" className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full my-6 overflow-hidden max-h-[85vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        <div className="bg-[#0b3b95] text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 fill-rose-400 text-rose-400" />
            <h3 className="font-extrabold text-lg tracking-tight font-display">
              Saved Tour Packages ({favoritePackages.length})
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <CurrencySelector variant="compact" />
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-white/10 text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto flex-1 p-6 space-y-4">
          {favoritePackages.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                <Heart className="w-8 h-8" />
              </div>
              <h4 className="text-base font-extrabold text-slate-800">Your Wishlist is Empty</h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Explore our Nepal packages and click the heart icon to save itineraries for later comparison.
              </p>
            </div>
          ) : (
            favoritePackages.map((pkg) => (
              <div
                key={pkg.id}
                className="flex flex-col sm:flex-row items-center gap-4 p-3 bg-slate-50 rounded-2xl border border-slate-200/80 hover:shadow-md transition-all"
              >
                <img
                  src={pkg.heroImage}
                  alt={pkg.name}
                  className="w-full sm:w-28 h-24 rounded-xl object-cover"
                />

                <div className="flex-1 text-left w-full">
                  <span className="text-[10px] font-extrabold uppercase text-[#0b3b95] bg-blue-100/60 px-2 py-0.5 rounded">
                    {pkg.category}
                  </span>
                  <h4 
                    onClick={() => {
                      onClose();
                      onSelectPackage(pkg);
                    }}
                    className="text-sm font-extrabold text-slate-900 hover:text-[#0b3b95] cursor-pointer line-clamp-1 mt-1"
                  >
                    {pkg.name}
                  </h4>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {pkg.durationDays} Days • Starts at {formatPrice(pkg.priceNpr)} <span className="text-slate-400">({formatSecondaryPrice(pkg.priceNpr)})</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  <button
                    onClick={() => {
                      onClose();
                      onBookPackage(pkg);
                    }}
                    className="bg-[#0b3b95] hover:bg-[#082a6b] text-white text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1 cursor-pointer"
                  >
                    <span>Book</span>
                    <Plane className="w-3.5 h-3.5 rotate-45 text-amber-300" />
                  </button>

                  <button
                    onClick={() => onRemoveFavorite(pkg.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
