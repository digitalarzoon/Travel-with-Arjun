import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Check, MapPin, Building2, Briefcase, Anchor, Car } from 'lucide-react';

export interface LocationOption {
  id: string;
  title: string;
  subtitle: string;
  badge?: string;
  popular?: boolean;
}

interface NepalLocationDropdownProps {
  label: string;
  selectedOption: LocationOption;
  options: LocationOption[];
  onSelect: (option: LocationOption) => void;
  idPrefix: string;
  type: 'hotel' | 'tour' | 'water' | 'car';
  placeholder?: string;
}

export const NepalLocationDropdown: React.FC<NepalLocationDropdownProps> = ({
  label,
  selectedOption,
  options,
  onSelect,
  idPrefix,
  type,
  placeholder = 'Search Nepal locations...',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Focus input on open
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const filteredOptions = options.filter((opt) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      opt.title.toLowerCase().includes(q) ||
      opt.subtitle.toLowerCase().includes(q) ||
      (opt.badge && opt.badge.toLowerCase().includes(q))
    );
  });

  const getIcon = () => {
    switch (type) {
      case 'hotel':
        return <Building2 className="w-3.5 h-3.5 text-blue-600" />;
      case 'tour':
        return <Briefcase className="w-3.5 h-3.5 text-emerald-600" />;
      case 'water':
        return <Anchor className="w-3.5 h-3.5 text-cyan-600" />;
      case 'car':
        return <Car className="w-3.5 h-3.5 text-amber-600" />;
      default:
        return <MapPin className="w-3.5 h-3.5 text-slate-500" />;
    }
  };

  const handleSelect = (opt: LocationOption) => {
    onSelect(opt);
    setIsOpen(false);
    setSearchQuery('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredOptions.length > 0) {
        handleSelect(filteredOptions[0]);
      } else if (searchQuery.trim().length > 0) {
        const trimmed = searchQuery.trim();
        handleSelect({
          id: `custom-nepal-${trimmed.toLowerCase().replace(/\s+/g, '-')}`,
          title: trimmed,
          subtitle: 'Nepal Destination',
          badge: 'Nepal',
        });
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div ref={dropdownRef} className="relative w-full">
      <button
        type="button"
        id={`${idPrefix}-trigger`}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full text-left border rounded-xl p-2.5 transition-all cursor-pointer ${
          isOpen
            ? 'border-blue-500 bg-white ring-2 ring-blue-100 shadow-xs'
            : 'border-slate-200 bg-slate-50/60 hover:bg-white hover:border-blue-400'
        }`}
      >
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-1 text-[11px] font-bold text-slate-500 uppercase tracking-wider cursor-pointer">
            {getIcon()}
            <span>{label}</span>
          </label>
          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800">
            Nepal Only
          </span>
        </div>

        <div className="mt-0.5">
          <div className="text-sm font-bold text-slate-900 truncate">
            {selectedOption.title}
          </div>
          <div className="text-[11px] text-slate-500 truncate font-medium">
            {selectedOption.subtitle}
          </div>
        </div>
      </button>

      {isOpen && (
        <div
          id={`${idPrefix}-dropdown-panel`}
          className="absolute left-0 w-full sm:w-[380px] md:w-[420px] mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        >
          {/* Search Header */}
          <div className="p-3 bg-slate-50 border-b border-slate-100">
            <div className="relative">
              <Search className="w-4 h-4 text-blue-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                className="w-full bg-white border border-blue-500 ring-2 ring-blue-100 text-xs sm:text-sm font-medium rounded-xl pl-9 pr-8 py-2.5 text-slate-800 placeholder-slate-400 focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
                  title="Clear"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Popular quick picks */}
            {!searchQuery && (
              <div className="mt-2 pt-2 border-t border-slate-200/60 flex items-center gap-1.5 flex-wrap">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Top Destinations:</span>
                {options.filter((o) => o.popular).slice(0, 4).map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelect(opt)}
                    className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-white text-slate-700 hover:bg-blue-50 hover:text-blue-700 border border-slate-200 transition-colors cursor-pointer"
                  >
                    {opt.title.split(',')[0]}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Results List */}
          <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
            {searchQuery.trim().length > 1 && (
              <button
                type="button"
                onClick={() => {
                  const trimmed = searchQuery.trim();
                  handleSelect({
                    id: `custom-nepal-${trimmed.toLowerCase().replace(/\s+/g, '-')}`,
                    title: trimmed,
                    subtitle: 'Custom Nepal Location',
                    badge: 'Nepal',
                  });
                }}
                className="w-full text-left px-3.5 py-2.5 bg-emerald-50/70 hover:bg-emerald-100/80 border-b border-emerald-100 flex items-center justify-between transition-colors cursor-pointer"
              >
                <div className="min-w-0 pr-2">
                  <span className="text-xs sm:text-sm font-bold text-emerald-900 block">
                    Use "{searchQuery.trim()}"
                  </span>
                  <span className="text-[11px] text-emerald-700 font-medium">
                    Select as Nepal destination
                  </span>
                </div>
                <span className="text-[11px] font-bold px-2 py-1 rounded bg-emerald-700 text-white shrink-0">
                  Select
                </span>
              </button>
            )}

            {filteredOptions.length === 0 && searchQuery.trim().length === 0 ? (
              <div className="p-6 text-center text-slate-500 text-xs">
                No Nepal locations found.
              </div>
            ) : filteredOptions.length === 0 && searchQuery.trim().length > 0 ? (
              <div className="p-4 text-center text-slate-500 text-xs">
                No standard match for "{searchQuery}". Click the button above to use it as custom Nepal destination!
              </div>
            ) : (
              filteredOptions.map((opt) => {
                const isSelected = selectedOption.id === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelect(opt)}
                    className={`w-full text-left px-3.5 py-2.5 flex items-center justify-between transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-blue-50/80 text-blue-900'
                        : 'hover:bg-slate-50 text-slate-800'
                    }`}
                  >
                    <div className="min-w-0 pr-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                          {opt.title}
                        </span>
                        {opt.badge && (
                          <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-slate-100 text-slate-700 shrink-0">
                            {opt.badge}
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 truncate mt-0.5">
                        {opt.subtitle}
                      </div>
                    </div>

                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    )}
                  </button>
                );
              })
            )}
          </div>

          <div className="p-2 bg-slate-50 border-t border-slate-100 text-[10px] text-slate-500 text-center font-medium">
            100% authentic Nepal verified locations
          </div>
        </div>
      )}
    </div>
  );
};
