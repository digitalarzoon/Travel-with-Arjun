import React, { useState } from 'react';
import { Menu, X, Heart, ChevronDown } from 'lucide-react';
import type { AgencySettings } from '../types';
import { CurrencySelector } from './CurrencySelector';
import { BrandLogo } from './BrandLogo';

interface NavbarProps {
  settings: AgencySettings;
  wishlistCount: number;
  onOpenWishlist: () => void;
  onBookNowClick: () => void;
  onOpenAuth?: () => void;
  onOpenAdmin?: () => void;
  currentUser?: any;
  onNavigateSection: (sectionId: string) => void;
  onSelectDestination?: (destId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  settings,
  wishlistCount,
  onOpenWishlist,
  onBookNowClick,
  onOpenAuth,
  onOpenAdmin,
  currentUser,
  onNavigateSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');

  const navItems = [
    { label: 'Home', section: 'hero-section' },
    { label: 'Destinations', section: 'destinations-section', hasDropdown: true },
    { label: 'Packages', section: 'packages-section', hasDropdown: true },
    { label: 'Tours', section: 'pricing-section', hasDropdown: true },
    { label: 'Pages', section: 'how-to-book-section', hasDropdown: true },
    { label: 'Blog', section: 'about-section' },
    { label: 'Contact', section: 'contact-section' },
  ];

  const handleNavClick = (label: string, sectionId: string) => {
    setActiveTab(label);
    onNavigateSection(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/98 backdrop-blur-md shadow-xs border-b border-slate-100 text-slate-800 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo with Mockup styling */}
          <div 
            id="brand-logo"
            onClick={() => handleNavClick('Home', 'hero-section')}
            className="flex items-center gap-3 cursor-pointer py-1"
          >
            <BrandLogo variant="dark" size="md" />
          </div>

          {/* Desktop Navigation Links matching mockup */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.label;
              return (
                <button
                  key={item.label}
                  id={`nav-link-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => handleNavClick(item.label, item.section)}
                  className={`px-3 py-2 text-sm font-medium transition-all cursor-pointer flex items-center gap-1 relative ${
                    isActive 
                      ? 'text-[#145a4e] font-bold' 
                      : 'text-slate-700 hover:text-[#145a4e]'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.hasDropdown && (
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#145a4e] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Controls: Wishlist + Deep Emerald "Book Now ✈" Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Wishlist quick link */}
            <button
              id="navbar-wishlist-btn"
              onClick={onOpenWishlist}
              className="flex items-center gap-1.5 px-3 py-2 rounded-md text-slate-700 hover:text-[#145a4e] hover:bg-slate-50 transition-colors cursor-pointer text-sm font-medium"
              title="Saved Wishlist"
            >
              <div className="relative">
                <Heart className="w-4 h-4 text-slate-600" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-rose-500 text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                    {wishlistCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline">Wishlist</span>
            </button>

            {/* Book Now Button matching emblem colors */}
            <button
              id="navbar-book-now-btn"
              onClick={onBookNowClick}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#145a4e] hover:bg-[#0d4137] text-white font-semibold text-sm tracking-wide transition-all shadow-sm hover:shadow-md cursor-pointer active:scale-95"
            >
              <span>Book Now</span>
              <svg className="w-3.5 h-3.5 fill-amber-300 rotate-45" viewBox="0 0 24 24">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>

            {/* Mobile menu toggle */}
            <div className="flex lg:hidden items-center ml-1">
              <button
                id="mobile-menu-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div id="mobile-menu-drawer" className="lg:hidden bg-white border-t border-slate-100 px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top duration-200">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.label, item.section)}
              className="w-full text-left px-3 py-2.5 rounded-md text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors flex items-center justify-between"
            >
              <span>{item.label}</span>
              {item.hasDropdown && <ChevronDown className="w-4 h-4 text-slate-400" />}
            </button>
          ))}
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
            <div className="flex items-center justify-between px-3 py-2 rounded-md bg-slate-50 text-sm font-medium text-slate-700">
              <span className="text-xs text-slate-500 font-semibold">Select Currency:</span>
              <CurrencySelector variant="pill" showRateTip />
            </div>
            <button
              onClick={() => {
                onOpenWishlist();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-between px-3 py-2 rounded-md bg-slate-50 text-sm font-medium text-slate-700"
            >
              <span className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-500" />
                Wishlist
              </span>
              <span className="text-xs font-bold bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full">
                {wishlistCount} saved
              </span>
            </button>
            <button
              onClick={() => {
                onBookNowClick();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded-md bg-[#0a3e94] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-xs"
            >
              <span>Book Now</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
