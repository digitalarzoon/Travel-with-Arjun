import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageSquare,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin
} from 'lucide-react';
import type { AgencySettings } from '../types';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  settings: AgencySettings;
  onNavigateSection: (sectionId: string) => void;
  onSelectDestinationById: (destId: string) => void;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  settings,
  onNavigateSection,
  onSelectDestinationById,
  onOpenContact,
}) => {
  return (
    <footer id="contact-section" className="bg-[#081d19] text-slate-300 pt-16 pb-8 border-t border-[#133d34]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-column grid matching mockup */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#14443a]">
          
          {/* Col 1: Brand & Logo & Socials */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <BrandLogo variant="light" size="lg" />
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6 max-w-sm">
              Discover breathtaking destinations, unforgettable experiences, and seamless travel planning worldwide. Expert tours and personalized itineraries guaranteed in NPR.
            </p>

            {/* Social Icons row matching mockup */}
            <div className="flex items-center gap-2.5">
              <a
                href={settings.socialLinks?.facebook || 'https://facebook.com'}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800/80 hover:bg-[#f9a825] hover:text-slate-950 text-slate-300 flex items-center justify-center transition-all"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={settings.socialLinks?.twitter || 'https://twitter.com'}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800/80 hover:bg-[#f9a825] hover:text-slate-950 text-slate-300 flex items-center justify-center transition-all"
                title="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href={settings.socialLinks?.instagram || 'https://instagram.com'}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800/80 hover:bg-[#f9a825] hover:text-slate-950 text-slate-300 flex items-center justify-center transition-all"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={settings.socialLinks?.youtube || 'https://youtube.com'}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800/80 hover:bg-[#f9a825] hover:text-slate-950 text-slate-300 flex items-center justify-center transition-all"
                title="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800/80 hover:bg-[#f9a825] hover:text-slate-950 text-slate-300 flex items-center justify-center transition-all"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 font-display">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400 font-medium">
              <li>
                <button
                  onClick={() => onNavigateSection('hero-section')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('packages-section')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  Popular Packages
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('pricing-section')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  Pricing Details
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('how-to-book-section')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  How to Book
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('destinations-section')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  Destinations
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenContact}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Top Destinations */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 font-display">
              Top Destinations
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400 font-medium">
              <li>
                <button
                  onClick={() => onSelectDestinationById('everest-region')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  Everest Base Camp
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectDestinationById('annapurna-region')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  Annapurna Circuit
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectDestinationById('pokhara')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  Pokhara & Phewa Lake
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectDestinationById('chitwan')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  Chitwan Safari
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectDestinationById('kathmandu')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  Kathmandu Valley
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Arjun */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 font-display">
              Contact Arjun
            </h4>
            <div className="space-y-3 text-xs sm:text-sm">
              <a
                href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
                className="flex items-start gap-2.5 text-slate-300 hover:text-amber-300 transition-colors"
              >
                <Phone className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{settings.phone}</span>
              </a>

              <a
                href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hello Arjun! I would like to inquire about a tour package with Travel with Arjun.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2.5 text-emerald-400 hover:text-emerald-300 transition-colors font-semibold"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>WhatsApp: {settings.whatsapp}</span>
              </a>

              <a
                href={`mailto:${settings.email}`}
                className="flex items-start gap-2.5 text-slate-300 hover:text-amber-300 transition-colors"
              >
                <Mail className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="break-all">{settings.email}</span>
              </a>

              <div className="flex items-start gap-2.5 text-slate-400">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{settings.officeAddress}</span>
              </div>

              <div className="flex items-start gap-2.5 text-slate-400">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{settings.businessHours}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar with payment badges & copyright matching mockup */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} {settings.agencyName}. All rights reserved.
          </div>

          <div className="flex items-center gap-2 font-semibold">
            <span>Currency:</span>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/30">
              NPR
            </span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] text-slate-400 mr-1">We Accept:</span>
            <span className="px-2 py-0.5 bg-slate-800 border border-slate-700 rounded text-[10px] text-white font-bold">VISA</span>
            <span className="px-2 py-0.5 bg-slate-800 border border-slate-700 rounded text-[10px] text-white font-bold">MasterCard</span>
            <span className="px-2 py-0.5 bg-slate-800 border border-slate-700 rounded text-[10px] text-white font-bold">AMEX</span>
            <span className="px-2 py-0.5 bg-slate-800 border border-slate-700 rounded text-[10px] text-white font-bold">PayPal</span>
            <span className="px-2 py-0.5 bg-slate-800 border border-slate-700 rounded text-[10px] text-white font-bold">Apple Pay</span>
            <span className="px-2 py-0.5 bg-slate-800 border border-slate-700 rounded text-[10px] text-white font-bold">eSewa</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

