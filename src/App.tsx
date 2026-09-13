import React, { useState, useEffect } from 'react';
import { TopBar } from './components/TopBar';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { HeroSearchBookingBar } from './components/HeroSearchBookingBar';
import { TrustBadgesBar } from './components/TrustBadgesBar';
import { PopularDestinationsSection } from './components/PopularDestinationsSection';
import { BentoOfferSection } from './components/BentoOfferSection';
import { TourPackagesSection } from './components/TourPackagesSection';
import { PricingSection } from './components/PricingSection';
import { HowToBookSection } from './components/HowToBookSection';
import { StatsTestimonialBar } from './components/StatsTestimonialBar';
import { AttractionsSection } from './components/AttractionsSection';
import { NepalTravelSeasonsSection } from './components/NepalTravelSeasonsSection';
import { ReviewsSection } from './components/ReviewsSection';
import { NewsletterSection } from './components/NewsletterSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

// Modals
import { TourDetailModal } from './components/TourDetailModal';
import { BookingInquiryModal } from './components/BookingInquiryModal';
import { DestinationDetailModal } from './components/DestinationDetailModal';
import { AttractionDetailModal } from './components/AttractionDetailModal';
import { WishlistModal } from './components/WishlistModal';
import { AuthModal } from './components/AuthModal';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { VideoModal } from './components/VideoModal';

// Data & Firebase
import { 
  nepalTourPackages, 
  nepalDestinations, 
  nepalAttractions, 
  nepalReviews, 
  defaultAgencySettings 
} from './data/nepalData';
import type { 
  TourPackage, 
  Destination, 
  Attraction, 
  AgencySettings 
} from './types';
import { 
  getAgencySettings, 
  getSavedFavorites, 
  toggleSavedFavorite,
  onAuthChange,
  logOutUser
} from './services/firebase';

export default function App() {
  const [settings, setSettings] = useState<AgencySettings>(defaultAgencySettings);
  const [packages, setPackages] = useState<TourPackage[]>(nepalTourPackages);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Filter state triggered from Hero Search Bar
  const [searchCategory, setSearchCategory] = useState<string>('all');

  // Modal States
  const [selectedTour, setSelectedTour] = useState<TourPackage | null>(null);
  const [bookingTour, setBookingTour] = useState<TourPackage | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [selectedAttraction, setSelectedAttraction] = useState<Attraction | null>(null);
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [isVideoOpen, setIsVideoOpen] = useState<boolean>(false);

  // Initialize from Firebase and Local Persistence
  useEffect(() => {
    // 1. Fetch persistent agency settings
    getAgencySettings().then((remoteSettings) => {
      if (remoteSettings) {
        setSettings(remoteSettings);
      }
    }).catch(console.error);

    // 2. Load wishlist
    setFavorites(getSavedFavorites());

    // 3. Listen to auth changes
    const unsubscribe = onAuthChange((user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleToggleFavorite = (tourId: string) => {
    const updated = toggleSavedFavorite(tourId);
    setFavorites(updated);
  };

  const handleOpenBooking = (pkg?: TourPackage) => {
    if (pkg) {
      setBookingTour(pkg);
    } else {
      setBookingTour(packages[0]);
    }
    setIsBookingOpen(true);
  };

  const handleHeroSearch = (params: {
    destination: string;
    category: string;
    travelDate: string;
    travelers: number;
  }) => {
    if (params.category && params.category !== 'all') {
      setSearchCategory(params.category);
    } else {
      setSearchCategory('all');
    }

    if (params.destination && params.destination !== 'all') {
      const matched = nepalDestinations.find((d) =>
        d.name.toLowerCase().includes(params.destination.toLowerCase())
      );
      if (matched) {
        setSelectedDestination(matched);
      }
    }

    // Smooth scroll down to packages section
    const el = document.getElementById('packages-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectDestinationById = (destId: string) => {
    const found = nepalDestinations.find((d) => d.id === destId);
    if (found) {
      setSelectedDestination(found);
    } else {
      handleNavigateSection('destinations-section');
    }
  };

  const handlePackageUpdated = (updatedPkg: TourPackage) => {
    setPackages((prev) =>
      prev.map((p) => (p.id === updatedPkg.id ? updatedPkg : p))
    );
  };

  const handleSelectPricingTier = (tierName: string, priceNpr: number) => {
    const tierPkg: TourPackage = {
      ...packages[0],
      id: `tier-${tierName.toLowerCase()}`,
      name: `${tierName} Travel Tier - Travel with Arjun`,
      priceNpr: priceNpr,
      shortDescription: `Curated ${tierName} package tier with flights, transfers, accommodations, and guided excursions in Nepal.`,
    };
    handleOpenBooking(tierPkg);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-sky-200 selection:text-slate-900">
      {/* 1. Top Contact & Currency Bar */}
      <TopBar
        settings={settings}
        currentUser={currentUser}
        wishlistCount={favorites.length}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* 2. Primary Navigation Bar matching mockup */}
      <Navbar
        settings={settings}
        wishlistCount={favorites.length}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onBookNowClick={() => handleOpenBooking(packages[0])}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        currentUser={currentUser}
        onNavigateSection={handleNavigateSection}
        onSelectDestination={handleSelectDestinationById}
      />

      <main>
        {/* 3. Hero Section matching mockup with Origami Paper Plane and Low-Poly Landmarks */}
        <HeroSection
          onExplorePackages={() => handleNavigateSection('packages-section')}
          onOpenVideoModal={() => setIsVideoOpen(true)}
        />

        {/* 4. Floating Booking & Search Bar matching mockup with Flights/Hotels/Cars/Experiences & NPR */}
        <HeroSearchBookingBar 
          onSearch={handleHeroSearch}
          onOpenDirectInquiry={(details) => {
            const basePkg = packages[0] || nepalTourPackages[0];
            const customPkg: TourPackage = {
              ...basePkg,
              id: `custom-${Date.now()}`,
              name: details.title,
              slug: `custom-${Date.now()}`,
              priceNpr: details.priceNpr,
              discountPercent: 0,
              shortDescription: details.notes,
              fullDescription: details.notes,
              highlights: [
                details.title,
                'Verified Nepal Licensed Operator',
                'Instant Booking Confirmation',
                '24/7 Local Concierge Support'
              ],
              itinerary: [
                {
                  day: 1,
                  title: 'Reserved Service Schedule',
                  activities: details.notes,
                }
              ],
            };
            setBookingTour(customPkg);
            setIsBookingOpen(true);
          }}
        />

        {/* 5. 4 Trust Cards matching mockup (Best Price, Secure Booking, 24/7 Support, Custom Packages) */}
        <TrustBadgesBar />

        {/* 6. Popular Packages Section matching mockup 4-card grid */}
        <TourPackagesSection
          packages={packages}
          settings={settings}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          onSelectPackage={(pkg) => setSelectedTour(pkg)}
          onBookPackage={(pkg) => handleOpenBooking(pkg)}
          selectedCategory={searchCategory}
        />

        {/* 7. Pricing Details Section matching mockup 4 tiers in NPR */}
        <PricingSection
          settings={settings}
          onSelectTier={handleSelectPricingTier}
        />

        {/* 8. How to Book Section matching mockup 4 steps with arrows */}
        <HowToBookSection />

        {/* 9. Stats & Testimonial Bar matching mockup */}
        <StatsTestimonialBar />

        {/* 10. Destinations Section */}
        <PopularDestinationsSection
          destinations={nepalDestinations}
          settings={settings}
          onSelectDestination={(dest) => setSelectedDestination(dest)}
          onViewAllDestinations={() => handleNavigateSection('destinations-section')}
        />

        {/* 11. Special Offers & Benefits */}
        <BentoOfferSection
          settings={settings}
          onExploreDeals={() => {
            setSearchCategory('all');
            handleNavigateSection('packages-section');
          }}
        />

        {/* 12. Best Tourist Attractions */}
        <AttractionsSection
          attractions={nepalAttractions}
          onSelectAttraction={(att) => setSelectedAttraction(att)}
        />

        {/* 13. Travel Seasons Guide */}
        <NepalTravelSeasonsSection />

        {/* 14. Customer Reviews */}
        <ReviewsSection reviews={nepalReviews} />

        {/* 15. Newsletter Subscription */}
        <NewsletterSection />
      </main>

      {/* 13. Comprehensive Agency Footer */}
      <Footer
        settings={settings}
        onNavigateSection={handleNavigateSection}
        onSelectDestinationById={handleSelectDestinationById}
        onOpenContact={() => handleNavigateSection('contact-section')}
      />

      {/* 14. Floating WhatsApp Action Button */}
      <FloatingWhatsApp settings={settings} />

      {/* MODALS */}
      {/* Tour Detail Modal */}
      {selectedTour && (
        <TourDetailModal
          pkg={selectedTour}
          settings={settings}
          isFavorite={favorites.includes(selectedTour.id)}
          onToggleFavorite={handleToggleFavorite}
          onClose={() => setSelectedTour(null)}
          onBookNow={(pkg) => {
            setSelectedTour(null);
            handleOpenBooking(pkg);
          }}
        />
      )}

      {/* Booking / Inquiry Modal */}
      {isBookingOpen && (
        <BookingInquiryModal
          pkg={bookingTour}
          allPackages={packages}
          settings={settings}
          currentUser={currentUser}
          onClose={() => setIsBookingOpen(false)}
        />
      )}

      {/* Destination Detail Modal */}
      {selectedDestination && (
        <DestinationDetailModal
          destination={selectedDestination}
          allPackages={packages}
          settings={settings}
          onClose={() => setSelectedDestination(null)}
          onSelectPackage={(pkg) => {
            setSelectedDestination(null);
            setSelectedTour(pkg);
          }}
        />
      )}

      {/* Attraction Detail Modal */}
      {selectedAttraction && (
        <AttractionDetailModal
          attraction={selectedAttraction}
          allPackages={packages}
          settings={settings}
          onClose={() => setSelectedAttraction(null)}
          onSelectPackage={(pkg) => {
            setSelectedAttraction(null);
            setSelectedTour(pkg);
          }}
        />
      )}

      {/* Wishlist Modal */}
      {isWishlistOpen && (
        <WishlistModal
          favorites={favorites}
          allPackages={packages}
          settings={settings}
          onRemoveFavorite={handleToggleFavorite}
          onClose={() => setIsWishlistOpen(false)}
          onSelectPackage={(pkg) => {
            setIsWishlistOpen(false);
            setSelectedTour(pkg);
          }}
          onBookPackage={(pkg) => {
            setIsWishlistOpen(false);
            handleOpenBooking(pkg);
          }}
        />
      )}

      {/* Auth Modal */}
      {isAuthOpen && (
        <AuthModal
          onClose={() => setIsAuthOpen(false)}
          onSuccess={() => setIsAuthOpen(false)}
        />
      )}

      {/* Admin HQ Dashboard Modal */}
      {isAdminOpen && (
        <AdminDashboardModal
          initialSettings={settings}
          packages={packages}
          onClose={() => setIsAdminOpen(false)}
          onSettingsUpdated={(newSettings) => setSettings(newSettings)}
          onPackageUpdated={handlePackageUpdated}
        />
      )}

      {/* Video Modal */}
      {isVideoOpen && (
        <VideoModal
          onClose={() => setIsVideoOpen(false)}
          onExplorePackages={() => handleNavigateSection('packages-section')}
        />
      )}
    </div>
  );
}
