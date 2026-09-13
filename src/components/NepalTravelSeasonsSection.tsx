import React from 'react';
import { Sun, CloudRain, Snowflake, Flower2, CheckCircle2 } from 'lucide-react';

export const NepalTravelSeasonsSection: React.FC = () => {
  const seasons = [
    {
      id: 'autumn',
      name: 'Autumn',
      months: 'September – November',
      icon: Sun,
      color: 'from-amber-500 to-orange-600',
      badge: 'Peak Season ⭐',
      tag: 'Crystal Clear Skies & Festive Atmosphere',
      summary: 'The undisputed king of trekking seasons in Nepal. Fresh clean air after the monsoon, pristine visibility of mountain summits, and mild daytime temperatures.',
      recommended: ['Everest Base Camp', 'Annapurna Circuit', 'Pokhara & Sarangkot', 'Dashain & Tihar Festivals'],
      bestFor: 'High-altitude trekking, mountain photography, cultural celebrations.',
    },
    {
      id: 'spring',
      name: 'Spring',
      months: 'March – May',
      icon: Flower2,
      color: 'from-emerald-500 to-teal-600',
      badge: 'Flower Blooms 🌸',
      tag: 'Rhododendron Forests & Climbing Expeditions',
      summary: 'Hillsides blaze with wild red, pink, and white rhododendrons. Moderate daytime warmth, longer daylight hours, and prime season for Himalayan peak climbing.',
      recommended: ['Ghorepani Poon Hill', 'Mardi Himal', 'Langtang Valley', 'Chitwan Wildlife Safari'],
      bestFor: 'Forest trekking, wildlife spotting, Everest summit expeditions.',
    },
    {
      id: 'winter',
      name: 'Winter',
      months: 'December – February',
      icon: Snowflake,
      color: 'from-cyan-600 to-blue-700',
      badge: 'Crisp Days ❄️',
      tag: 'Sunny Days in Valleys & Snow-Capped Vistas',
      summary: 'Clear blue skies with minimal haze in Kathmandu and Pokhara. Days are sunny and pleasant, while mountain nights are sub-zero. Quiet trails with fewer crowds.',
      recommended: ['Kathmandu Heritage', 'Pokhara & Begnas Lake', 'Chitwan Jungle Safari', 'Nagarkot & Bandipur'],
      bestFor: 'Lower altitude treks, city tours, luxury romantic escapes.',
    },
    {
      id: 'monsoon',
      name: 'Monsoon',
      months: 'June – August',
      icon: CloudRain,
      color: 'from-indigo-600 to-violet-700',
      badge: 'Rain Shadow 🌧️',
      tag: 'Lush Terraces & Rain-Shadow Deserts',
      summary: 'Warm summer rains bring emerald-green rice terraces and vibrant waterfalls. The trans-Himalayan Tibetan plateau behind the Annapurna range remains completely dry!',
      recommended: ['Upper Mustang (Rain Shadow)', 'Dolpo & Rara Lake', 'Kathmandu Yoga & Meditation', 'Ayurvedic Retreats'],
      bestFor: 'Upper Mustang 4WD expeditions, botanical studies, peaceful retreats.',
    },
  ];

  return (
    <section id="trekking-section" className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-black uppercase tracking-widest text-[#0b3b95] bg-blue-50 px-3 py-1 rounded-full">
            CLIMATE & PLANNING GUIDE
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-display mt-2">
            When to Travel in Nepal
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Nepal's topography rises from 60 meters to 8,848 meters, creating diverse microclimates across its four distinct seasons.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {seasons.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.id}
                id={`season-card-${s.id}`}
                className="bg-slate-50/80 rounded-2xl p-6 border border-slate-200/80 flex flex-col justify-between hover:shadow-lg transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${s.color} text-white flex items-center justify-center shadow-md`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-extrabold px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-800 shadow-2xs">
                      {s.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-slate-900 font-display">
                    {s.name}
                  </h3>
                  <span className="text-xs font-bold text-[#0b3b95] block mb-2">
                    {s.months}
                  </span>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {s.summary}
                  </p>

                  <div className="border-t border-slate-200/80 pt-3">
                    <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block mb-1.5">
                      Top Destinations:
                    </span>
                    <ul className="space-y-1">
                      {s.recommended.map((item, idx) => (
                        <li key={idx} className="text-xs text-slate-700 flex items-center gap-1.5 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-200 text-[11px] text-slate-500 italic">
                  <strong>Best for:</strong> {s.bestFor}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
