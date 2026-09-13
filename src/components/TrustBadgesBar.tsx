import React from 'react';
import { Award, Headphones, Building2, ShieldCheck } from 'lucide-react';

export const TrustBadgesBar: React.FC = () => {
  const trustFeatures = [
    {
      id: 'best-price',
      title: 'Best Price Guarantee',
      desc: 'We ensure the best price for your travel',
      icon: Award,
    },
    {
      id: 'support-24-7',
      title: '24/7 Customer Support',
      desc: 'We are here to help you anytime',
      icon: Headphones,
    },
    {
      id: 'handpicked-hotels',
      title: 'Handpicked Hotels',
      desc: 'Carefully selected for your comfort',
      icon: Building2,
    },
    {
      id: 'secure-booking',
      title: 'Secure Booking',
      desc: '100% secure payments and easy bookings',
      icon: ShieldCheck,
    },
  ];

  return (
    <section className="py-10 sm:py-14 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {trustFeatures.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors group"
              >
                {/* Circular ring icon matching mockup */}
                <div className="w-12 h-12 rounded-full bg-blue-50 text-[#0a3e94] flex items-center justify-center shrink-0 border border-blue-100 group-hover:scale-105 group-hover:bg-[#0a3e94] group-hover:text-white transition-all shadow-xs">
                  <Icon className="w-6 h-6" />
                </div>

                <div className="flex flex-col text-left">
                  <h3 className="font-display font-bold text-slate-900 text-sm sm:text-base mb-1">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

