import React from 'react';

interface BrandLogoProps {
  variant?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ 
  variant = 'dark', 
  size = 'md',
  showSubtitle = false 
}) => {
  const isLight = variant === 'light';

  return (
    <div className="flex items-center gap-2.5 select-none cursor-pointer group">
      {/* Mountain & Summit Star Emblem matching attached mockup */}
      <div className="relative flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shrink-0">
        <svg 
          viewBox="0 0 100 100" 
          className={`${size === 'sm' ? 'w-9 h-9' : size === 'lg' ? 'w-13 h-13' : 'w-11 h-11'} drop-shadow-md`}
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Squircle gradient matching the image's deep emerald / rich teal */}
            <linearGradient id="logoBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1a6e5f" />
              <stop offset="50%" stopColor="#145a4e" />
              <stop offset="100%" stopColor="#0d4137" />
            </linearGradient>

            {/* Radiant gold gradient for star */}
            <linearGradient id="goldStarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffd464" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>

            {/* Tie / diamond needle gradients for 3D depth */}
            <linearGradient id="tieLeftGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>

            <linearGradient id="tieRightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>
          </defs>

          {/* Squircle Background with soft rounded corners */}
          <rect width="100" height="100" rx="24" fill="url(#logoBgGrad)" />
          <rect width="100" height="100" rx="24" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="1.5" fill="none" />

          {/* Concentric radar / sonar rings centered near the summit */}
          <circle cx="50" cy="50" r="37" stroke="rgba(255, 255, 255, 0.14)" strokeWidth="1.5" />
          <circle cx="50" cy="50" r="27" stroke="rgba(255, 255, 255, 0.18)" strokeWidth="1.5" />
          <circle cx="50" cy="50" r="17" stroke="rgba(255, 255, 255, 0.22)" strokeWidth="1.5" />

          {/* Mountain Silhouettes */}
          {/* Right peak (behind, darker translucent teal) */}
          <polygon points="34,75 63,36 85,75" fill="#0c4439" fillOpacity="0.75" />
          <polygon points="63,36 85,75 74,75" fill="#07332b" fillOpacity="0.5" />

          {/* Left peak (primary foreground peak pointing to star) */}
          <polygon points="15,75 42,32 68,75" fill="#2dd4bf" fillOpacity="0.35" />
          <polygon points="42,32 68,75 55,75" fill="#145e51" fillOpacity="0.45" />

          {/* Golden 5-pointed Star on left summit peak */}
          <polygon
            points="42,20 45,26.5 52,27.5 47,32 48.5,39 42,35.5 35.5,39 37,32 32,27.5 39,26.5"
            fill="url(#goldStarGrad)"
            filter="drop-shadow(0px 1px 2px rgba(0,0,0,0.3))"
          />

          {/* White Collar / Waypoint Pin Head */}
          <circle cx="50" cy="46" r="3.75" fill="#ffffff" filter="drop-shadow(0px 1px 1px rgba(0,0,0,0.2))" />

          {/* Golden Tie / Faceted Compass Needle */}
          {/* Left facet */}
          <polygon points="50,51 46,63 50,75 50,51" fill="url(#tieLeftGrad)" />
          {/* Right facet */}
          <polygon points="50,51 54,63 50,75 50,51" fill="url(#tieRightGrad)" />
        </svg>
      </div>

      {/* Brand Typography matching mockup (word "Travel Agency" completely removed) */}
      <div className="flex flex-col leading-tight">
        <span 
          className={`font-display font-black tracking-tight ${
            size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'
          } ${isLight ? 'text-white' : 'text-[#0f3d34]'}`}
        >
          Travel with Arjun
        </span>
        {showSubtitle && (
          <span 
            className={`text-[9px] sm:text-[10px] tracking-[0.2em] uppercase font-bold mt-0.5 ${
              isLight ? 'text-teal-200' : 'text-[#166557]'
            }`}
          >
            Peak Adventures • Endless Horizons
          </span>
        )}
      </div>
    </div>
  );
};



