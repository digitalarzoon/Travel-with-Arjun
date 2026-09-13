import React from 'react';
import { MapPin, FileCheck, CreditCard, Send, ArrowRight } from 'lucide-react';

export const HowToBookSection: React.FC = () => {
  const steps = [
    {
      stepNumber: 1,
      title: 'Choose Destination',
      desc: 'Pick your dream destination.',
      icon: MapPin,
      color: 'from-sky-400 to-blue-600',
    },
    {
      stepNumber: 2,
      title: 'Select Package',
      desc: 'Choose the best package for you.',
      icon: FileCheck,
      color: 'from-blue-500 to-indigo-600',
    },
    {
      stepNumber: 3,
      title: 'Make Payment',
      desc: 'Secure your booking with easy payment.',
      icon: CreditCard,
      color: 'from-indigo-500 to-blue-600',
    },
    {
      stepNumber: 4,
      title: 'Enjoy Your Trip',
      desc: 'Pack your bags and make memories!',
      icon: Send,
      color: 'from-sky-500 to-blue-700',
      tilt: '-rotate-12',
    },
  ];

  return (
    <section id="how-to-book-section" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Centered Heading with blue underline matching mockup */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 tracking-tight uppercase inline-block relative">
            HOW TO BOOK
            <span className="block w-16 h-1 bg-[#0066cc] mx-auto mt-2 rounded-full" />
          </h2>
          <p className="text-slate-500 text-sm mt-3">
            Simple 4-step seamless booking process designed for your peace of mind.
          </p>
        </div>

        {/* 4 Steps Row with Connecting Arrows */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            const isLast = idx === steps.length - 1;

            return (
              <div key={item.stepNumber} className="relative flex flex-col items-center text-center group">
                
                {/* Connecting arrow for large screens */}
                {!isLast && (
                  <div className="hidden lg:block absolute top-10 left-[68%] w-[65%] pointer-events-none z-0">
                    <svg viewBox="0 0 140 24" className="w-full h-6 text-sky-300" fill="none">
                      <path
                        d="M 0 12 L 120 12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                      />
                      <path
                        d="M 115 7 L 125 12 L 115 17"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                      />
                    </svg>
                  </div>
                )}

                {/* 3D Circular Step Icon with step number */}
                <div className="relative mb-5 z-10">
                  <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-sky-50 via-sky-100/70 to-blue-100 border border-sky-200 flex items-center justify-center shadow-lg shadow-sky-100 group-hover:scale-110 transition-transform duration-300">
                    <div className={`w-13 h-13 rounded-2xl bg-gradient-to-tr ${item.color} flex items-center justify-center text-white shadow-md`}>
                      <Icon className={`w-6 h-6 ${item.tilt || ''}`} />
                    </div>
                  </div>

                  {/* Step Number Badge */}
                  <span className="absolute -top-1.5 -right-1.5 w-7 h-7 rounded-full bg-[#0066cc] text-white text-xs font-black flex items-center justify-center shadow-sm border-2 border-white">
                    {item.stepNumber}
                  </span>
                </div>

                {/* Step Title & Description matching mockup */}
                <h3 className="font-display font-extrabold text-base sm:text-lg text-slate-900 mb-1.5">
                  {item.stepNumber}. {item.title}
                </h3>
                <p className="text-slate-500 text-xs sm:text-sm max-w-[220px]">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
