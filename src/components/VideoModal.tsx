import React from 'react';
import { X, Play, Compass, Mountain, CheckCircle2 } from 'lucide-react';

interface VideoModalProps {
  onClose: () => void;
  onExplorePackages: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ onClose, onExplorePackages }) => {
  return (
    <div id="video-modal-overlay" className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 text-white rounded-3xl shadow-2xl max-w-3xl w-full my-6 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-4 sm:p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Mountain className="w-5 h-5 text-amber-400" />
            <h3 className="font-extrabold text-sm sm:text-base font-display">
              Experience the Magic of Nepal & The Himalayas
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Responsive Video Container with real Nepal Himalayan travel documentary footage */}
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-black shadow-inner border border-slate-800">
            <iframe
              className="w-full h-full"
              src="https://www.youtube-nocookie.com/embed/1la_u4L0hQY?autoplay=1&mute=0&rel=0"
              title="Nepal Travel & Trekking Documentary"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
              <span className="font-bold text-amber-400 block mb-1">Authentic Guides</span>
              <p className="text-slate-300">Local Sherpa & Kathmandu valley cultural historians.</p>
            </div>
            <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
              <span className="font-bold text-amber-400 block mb-1">Safety First</span>
              <p className="text-slate-300">Daily acclimatization pacing, oximeter checks & medical kits.</p>
            </div>
            <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
              <span className="font-bold text-amber-400 block mb-1">Transparent Pricing</span>
              <p className="text-slate-300">All TIMS permits, national park fees, and taxes included.</p>
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onExplorePackages();
              }}
              className="bg-[#0b3b95] hover:bg-blue-700 text-white font-extrabold text-xs px-6 py-2.5 rounded-xl shadow-md transition-all"
            >
              Explore Nepal Packages
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
