import React, { useState, useEffect } from 'react';
import { MessageSquare } from 'lucide-react';
import type { AgencySettings } from '../types';

interface FloatingWhatsAppProps {
  settings: AgencySettings;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ settings }) => {
  const [isPopping, setIsPopping] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [isEntering, setIsEntering] = useState(true);

  useEffect(() => {
    // Allows the smooth slide-in-up entrance to complete before handing over to standard hover/active transforms
    const timer = setTimeout(() => {
      setIsEntering(false);
    }, 1100);
    return () => clearTimeout(timer);
  }, []);

  const whatsappUrl = `https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    'Namaste! I would like to inquire about Nepal tours and trekking packages.'
  )}`;

  const playPopSound = () => {
    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;

      const ctx = new AudioContextClass();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const now = ctx.currentTime;

      // Subtle bubble pop: short frequency sweep (320Hz -> 760Hz)
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(760, now + 0.04);

      // Gentle, non-intrusive volume curve
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 0.005);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.065);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.07);

      setTimeout(() => {
        ctx.close().catch(() => {});
      }, 120);
    } catch (_) {
      // Graceful fallback if Web Audio is restricted
    }
  };

  const handleClick = () => {
    // Play subtle synthesized Web Audio pop sound
    playPopSound();

    // Trigger pop transform state
    setIsPopping(true);
    setClickCount((prev) => prev + 1);

    // Subtle device haptic feedback if supported by browser/device
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(25);
      } catch (_) {}
    }

    // Reset after animation finishes (matches 0.48s spring animation)
    setTimeout(() => {
      setIsPopping(false);
    }, 500);
  };

  return (
    <aside aria-label="WhatsApp Support" className="fixed bottom-6 right-6 z-40 flex items-center group">
      {/* Tooltip on hover */}
      <span className="hidden sm:inline-block mr-3 bg-slate-900 text-white text-xs font-semibold px-3 py-1.5 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Chat with Nepal team on WhatsApp
      </span>

      <a
        id="floating-whatsapp-btn"
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className={`w-14 h-14 text-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-200 active:scale-90 active:rotate-[-4deg] relative ${
          isPopping
            ? 'bg-emerald-400 shadow-emerald-400/50 animate-pop ring-4 ring-emerald-300/80'
            : 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-600/40 hover:scale-110'
        } ${isEntering && !isPopping ? 'animate-slide-in-up' : ''}`}
        title="Chat on WhatsApp"
      >
        {/* Continuous soft pulsing ring */}
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-40 pointer-events-none" />

        {/* Dynamic haptic ripple burst when clicked */}
        {isPopping && (
          <span
            key={clickCount}
            className="absolute inset-0 rounded-full border-2 border-emerald-300 animate-ping opacity-75 pointer-events-none"
          />
        )}

        <MessageSquare className={`w-7 h-7 fill-white transition-transform duration-200 ${isPopping ? 'scale-110' : ''}`} />
      </a>
    </aside>
  );
};
