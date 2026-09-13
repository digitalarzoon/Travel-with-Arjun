import React from 'react';
import { Plane, Users, Package, Headphones, Star, Heart } from 'lucide-react';

export const StatsTestimonialBar: React.FC = () => {
  const stats = [
    { icon: Plane, count: '150+', label: 'Destinations', tilt: '-rotate-12' },
    { icon: Users, count: '10K+', label: 'Happy Travelers', tilt: '' },
    { icon: Package, count: '500+', label: 'Travel Packages', tilt: '' },
    { icon: Headphones, count: '24/7', label: 'Support', tilt: '' },
  ];

  return (
    <section className="bg-[#0066cc] text-white py-14 sm:py-16 relative overflow-hidden">
      {/* Background soft lighting effects */}
      <div className="absolute top-0 right-1/4 w-96 h-40 bg-white/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Stats: 4 Columns (matching mockup) */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center text-white mb-3 shadow-xs">
                    <Icon className={`w-5 h-5 ${stat.tilt}`} />
                  </div>
                  <div className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight">
                    {stat.count}
                  </div>
                  <div className="text-xs sm:text-sm text-sky-100 font-semibold mt-0.5">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Testimonial Card (matching mockup) */}
          <div className="lg:col-span-5">
            <div className="bg-white text-slate-800 rounded-3xl p-6 sm:p-7 shadow-2xl relative">
              
              {/* Origami 3D Heart in top right of card */}
              <div className="absolute -top-4 -right-2 w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-400 flex items-center justify-center text-white shadow-lg rotate-12">
                <Heart className="w-5 h-5 fill-white text-white" />
              </div>

              {/* Quotation mark */}
              <span className="font-serif text-5xl sm:text-6xl text-[#0066cc]/30 leading-none block -mb-4">
                “
              </span>

              {/* Quote text */}
              <p className="font-medium text-slate-700 text-sm sm:text-base leading-relaxed italic mb-4">
                The best travel experience we've ever had! Everything was perfectly organized from airport pickup to Himalayan summits.
              </p>

              {/* Author & 5 Gold Stars */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <div>
                  <div className="font-display font-bold text-slate-900 text-sm">
                    — Sarah J., New York, USA
                  </div>
                  <div className="text-[11px] text-slate-400 font-medium">
                    Verified Nepal Traveler
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
