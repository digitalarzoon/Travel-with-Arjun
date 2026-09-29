import React, { useState, useEffect } from 'react';
import { CheckCircle2, X, MapPin, Sparkles } from 'lucide-react';
import type { TourPackage } from '../types';

interface BookingNotification {
  id: string;
  customerName: string;
  origin: string;
  flag: string;
  timeAgo: string;
  partySize: string;
  tourSlugOrKeyword: string;
}

const SAMPLE_BOOKINGS: BookingNotification[] = [
  {
    id: 'b1',
    customerName: 'Aarav & Shreya',
    origin: 'Kathmandu, Nepal',
    flag: '🇳🇵',
    timeAgo: 'Just now',
    partySize: '2 Travelers',
    tourSlugOrKeyword: 'everest',
  },
  {
    id: 'b2',
    customerName: 'Liam & Chloe',
    origin: 'Sydney, Australia',
    flag: '🇦🇺',
    timeAgo: '3m ago',
    partySize: 'Couple',
    tourSlugOrKeyword: 'luxury',
  },
  {
    id: 'b3',
    customerName: 'Pooja Sharma',
    origin: 'New Delhi, India',
    flag: '🇮🇳',
    timeAgo: '7m ago',
    partySize: 'Family of 3',
    tourSlugOrKeyword: 'pokhara',
  },
  {
    id: 'b4',
    customerName: 'Marcus Vance',
    origin: 'London, UK',
    flag: '🇬🇧',
    timeAgo: '12m ago',
    partySize: 'Solo Traveler',
    tourSlugOrKeyword: 'annapurna',
  },
  {
    id: 'b5',
    customerName: 'Bikram Thapa',
    origin: 'Pokhara, Nepal',
    flag: '🇳🇵',
    timeAgo: '18m ago',
    partySize: '2 Travelers',
    tourSlugOrKeyword: 'chitwan',
  },
  {
    id: 'b6',
    customerName: 'Elena Rostova',
    origin: 'Munich, Germany',
    flag: '🇩🇪',
    timeAgo: '25m ago',
    partySize: 'Small Group',
    tourSlugOrKeyword: 'mustang',
  },
  {
    id: 'b7',
    customerName: 'Kenji Takahashi',
    origin: 'Tokyo, Japan',
    flag: '🇯🇵',
    timeAgo: '34m ago',
    partySize: '2 Travelers',
    tourSlugOrKeyword: 'mardi',
  },
];

interface RecentBookingPopupProps {
  packages: TourPackage[];
  onSelectTour?: (pkg: TourPackage) => void;
}

export const RecentBookingPopup: React.FC<RecentBookingPopupProps> = ({
  packages,
  onSelectTour,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isDismissed || packages.length === 0) return;

    // Initial appearance delay after 4 seconds
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, 4000);

    return () => clearTimeout(initialTimer);
  }, [isDismissed, packages.length]);

  useEffect(() => {
    if (isDismissed || !isVisible || isPaused) return;

    // Display for 6 seconds, then hide and cycle
    const hideTimer = setTimeout(() => {
      setIsVisible(false);

      // Wait 9 seconds before showing next booking
      const nextTimer = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % SAMPLE_BOOKINGS.length);
        setIsVisible(true);
      }, 9000);

      return () => clearTimeout(nextTimer);
    }, 6000);

    return () => clearTimeout(hideTimer);
  }, [isVisible, isPaused, isDismissed]);

  if (isDismissed || !isVisible || packages.length === 0) {
    return null;
  }

  const notification = SAMPLE_BOOKINGS[currentIndex % SAMPLE_BOOKINGS.length];

  // Match corresponding tour package or fallback
  const matchedTour =
    packages.find((p) =>
      p.name.toLowerCase().includes(notification.tourSlugOrKeyword.toLowerCase()) ||
      p.slug.toLowerCase().includes(notification.tourSlugOrKeyword.toLowerCase())
    ) || packages[currentIndex % packages.length];

  const handleCardClick = () => {
    if (onSelectTour && matchedTour) {
      onSelectTour(matchedTour);
    }
  };

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsVisible(false);
    // Snooze for 60 seconds if user explicitly closed it
    setIsDismissed(true);
    setTimeout(() => {
      setIsDismissed(false);
      setIsVisible(true);
    }, 60000);
  };

  return (
    <aside
      aria-label="Recent booking notification"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onClick={handleCardClick}
      className="fixed bottom-5 left-4 sm:left-6 z-40 max-w-[340px] sm:max-w-sm w-[calc(100vw-2rem)] sm:w-auto animate-toast-slide cursor-pointer group select-none"
    >
      <div className="bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-xl shadow-slate-900/10 hover:shadow-2xl hover:border-emerald-300/80 rounded-2xl p-2.5 sm:p-3 transition-all duration-300 relative flex items-center gap-3">
        {/* Destination Thumbnail with subtle shine */}
        <div className="relative shrink-0 w-13 h-13 sm:w-14 sm:h-14 rounded-xl overflow-hidden bg-slate-100 shadow-xs">
          <img
            src={matchedTour.heroImage || 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=400&q=80'}
            alt={matchedTour.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          <div className="absolute top-1 left-1 bg-black/60 backdrop-blur-xs rounded-full px-1.5 py-0.5 text-[9px] font-bold text-white flex items-center gap-0.5">
            <span className="text-[10px]">{notification.flag}</span>
          </div>
        </div>

        {/* Booking Details */}
        <div className="flex-1 min-w-0 pr-5">
          {/* Top header: Verified badge & time */}
          <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold text-slate-500 mb-0.5">
            <span className="flex items-center gap-1 text-emerald-600 font-bold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Booked
            </span>
            <span className="text-slate-300">•</span>
            <span>{notification.timeAgo}</span>
          </div>

          {/* Traveler info */}
          <p className="text-xs sm:text-[13px] font-bold text-slate-900 truncate leading-tight">
            {notification.customerName}
            <span className="text-slate-500 font-normal text-[11px] ml-1">
              ({notification.origin.split(',')[0]})
            </span>
          </p>

          {/* Tour Package booked */}
          <p className="text-[11px] sm:text-xs text-emerald-700 font-medium truncate mt-0.5 group-hover:text-emerald-800 transition-colors">
            {matchedTour.name}
          </p>
        </div>

        {/* Close Button */}
        <button
          onClick={handleDismiss}
          className="absolute top-2 right-2 p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          title="Dismiss notification"
          aria-label="Dismiss notification"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
};
