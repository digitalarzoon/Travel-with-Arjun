import React, { useState } from 'react';
import { Mail, Plane, CheckCircle2 } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
    }, 3500);
  };

  return (
    <section id="newsletter-section" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Full-width deep emerald card matching the emblem colors */}
        <div className="bg-gradient-to-r from-[#145a4e] via-[#104b41] to-[#0a3830] rounded-2xl p-6 sm:p-10 text-white shadow-xl shadow-teal-950/20 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10 relative overflow-hidden">
          
          {/* Subtle background decorative shapes */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white/5 pointer-events-none" />

          {/* Left info */}
          <div className="flex items-center gap-4 sm:gap-5 w-full lg:w-auto">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-amber-400 shrink-0">
              <Mail className="w-6 h-6 sm:w-7 sm:h-7 text-amber-400" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white font-display tracking-tight">
                Subscribe to Our Newsletter
              </h3>
              <p className="text-teal-100/90 text-xs sm:text-sm mt-1 max-w-md">
                Get the latest updates, exclusive deals, and travel inspiration directly in your inbox.
              </p>
            </div>
          </div>

          {/* Right Form matching mockup */}
          <div className="w-full lg:w-auto lg:min-w-[420px]">
            {subscribed ? (
              <div className="bg-emerald-500/20 border border-emerald-400/40 text-emerald-100 px-5 py-3 rounded-xl flex items-center gap-2 text-sm font-bold">
                <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0" />
                <span>Thank you! You are subscribed to Travel with Arjun updates.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5">
                <input
                  id="newsletter-email-input"
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-white text-slate-900 placeholder:text-slate-400 text-sm font-medium px-4 py-3 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-400"
                />
                <button
                  id="newsletter-subscribe-btn"
                  type="submit"
                  className="bg-[#f9a825] hover:bg-[#ffb703] text-slate-950 font-bold text-sm px-6 py-3 rounded-lg shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0 active:scale-95"
                >
                  <span>Subscribe</span>
                  <Plane className="w-4 h-4 rotate-45 text-slate-950" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

