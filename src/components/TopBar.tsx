import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Heart, ShieldCheck, User } from 'lucide-react';
import type { AgencySettings } from '../types';
import { CurrencySelector } from './CurrencySelector';

interface TopBarProps {
  settings: AgencySettings;
  wishlistCount: number;
  onOpenWishlist: () => void;
  onOpenAuth: () => void;
  onOpenAdmin: () => void;
  currentUser: any;
}

export const TopBar: React.FC<TopBarProps> = ({
  settings,
  wishlistCount,
  onOpenWishlist,
  onOpenAuth,
  onOpenAdmin,
  currentUser,
}) => {
  return (
    <div id="top-bar-container" className="bg-white text-slate-600 text-xs py-2 border-b border-slate-100 hidden sm:block">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Left: Contact Info matching mockup */}
        <div className="flex items-center gap-5 sm:gap-6 text-slate-600">
          <a
            id="topbar-phone-link"
            href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
            className="flex items-center gap-1.5 hover:text-blue-700 transition-colors font-medium"
          >
            <Phone className="w-3.5 h-3.5 text-slate-500" />
            <span>{settings.phone}</span>
          </a>

          <a
            id="topbar-email-link"
            href={`mailto:${settings.email}`}
            className="flex items-center gap-1.5 hover:text-[#145a4e] transition-colors font-medium"
          >
            <Mail className="w-3.5 h-3.5 text-slate-500" />
            <span>{settings.email}</span>
          </a>

          <div className="flex items-center gap-1.5 text-slate-500 hidden md:flex font-medium">
            <MapPin className="w-3.5 h-3.5 text-amber-500" />
            <span>{settings.officeAddress || 'Tridevi Marg, Thamel, Kathmandu, Nepal'}</span>
          </div>
        </div>

        {/* Right: Social Follow & Quick Controls */}
        <div className="flex items-center gap-5">
          {/* Follow Us social links matching mockup */}
          <div className="flex items-center gap-2.5 text-slate-600">
            <span className="text-slate-500 font-medium">Follow Us:</span>
            <div className="flex items-center gap-2">
              <a href="#" className="text-slate-600 hover:text-[#145a4e] transition-colors" aria-label="Facebook">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.667 5H18V0h-3.808C10.595 0 9 1.582 9 4.615V8z"/></svg>
              </a>
              <a href="#" className="text-slate-600 hover:text-amber-600 transition-colors" aria-label="Instagram">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="#" className="text-slate-600 hover:text-[#145a4e] transition-colors" aria-label="Twitter">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
              <a href="#" className="text-slate-600 hover:text-red-600 transition-colors" aria-label="YouTube">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>

          <div className="h-3.5 w-px bg-slate-200" />

          {/* Currency Switcher (NPR / USD) */}
          <div className="flex items-center gap-1.5 font-semibold text-slate-700">
            <span className="hidden sm:inline text-xs text-slate-500 font-medium">Currency:</span>
            <CurrencySelector variant="pill" showRateTip />
          </div>

          {/* Admin Panel Link */}
          {onOpenAdmin && (
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
              title="Admin Portal"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Admin</span>
            </button>
          )}

          {/* User Sign In */}
          <button
            onClick={onOpenAuth}
            className="flex items-center gap-1 text-slate-600 hover:text-blue-700 transition-colors cursor-pointer"
          >
            <User className="w-3.5 h-3.5" />
            <span>{currentUser ? currentUser.displayName || currentUser.email?.split('@')[0] || 'Account' : 'Sign In'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

