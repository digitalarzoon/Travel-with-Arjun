import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Check, PlaneTakeoff, PlaneLanding } from 'lucide-react';
import { FLIGHT_LOCATIONS, FlightLocation } from '../data/bookingLocationsData';

interface AirportSearchDropdownProps {
  label: 'FROM' | 'TO';
  selectedLocation: FlightLocation;
  onSelect: (location: FlightLocation) => void;
  idPrefix: string;
}

export const AirportSearchDropdown: React.FC<AirportSearchDropdownProps> = ({
  label,
  selectedLocation,
  onSelect,
  idPrefix,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'domestic' | 'international'>('all');
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

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Filtered airports based on search query and category tab
  const filteredAirports = FLIGHT_LOCATIONS.filter((loc) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      loc.city.toLowerCase().includes(q) ||
      loc.code.toLowerCase().includes(q) ||
      loc.airport.toLowerCase().includes(q) ||
      loc.country.toLowerCase().includes(q);

    if (!matchesSearch) return false;

    if (activeTab === 'domestic') return loc.type === 'domestic';
    if (activeTab === 'international') return loc.type === 'international';
    return true;
  });

  const popularQuickPicks = ['KTM', 'PKR', 'DEL', 'DXB', 'BKK', 'DOH', 'LHR', 'JFK'];

  const handleSelectAirport = (loc: FlightLocation) => {
    onSelect(loc);
    setIsOpen(false);
    setSearchQuery('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredAirports.length > 0) {
        handleSelectAirport(filteredAirports[0]);
      } else if (searchQuery.trim().length > 0) {
        const trimmed = searchQuery.trim();
        handleSelectAirport({
          id: `custom-${trimmed.toLowerCase().replace(/\s+/g, '-')}`,
          code: trimmed.slice(0, 3).toUpperCase(),
          city: trimmed,
          airport: `${trimmed} Airport`,
          country: 'International',
          type: 'international',
        });
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const isFrom = label === 'FROM';

  return (
    <div ref={dropdownRef} className="relative w-full">
      {/* Trigger Box matching existing UI */}
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
            {isFrom ? (
              <PlaneTakeoff className="w-3.5 h-3.5 text-blue-600" />
            ) : (
              <PlaneLanding className="w-3.5 h-3.5 text-amber-500" />
            )}
            <span>{label}</span>
          </label>
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-slate-200/80 text-slate-700 font-mono">
            {selectedLocation.code}
          </span>
        </div>

        <div className="mt-0.5">
          <div className="text-sm font-bold text-slate-900 truncate">
            {selectedLocation.city} ({selectedLocation.code})
          </div>
          <div className="text-[11px] text-slate-500 truncate font-medium">
            {selectedLocation.airport} · {selectedLocation.country}
          </div>
        </div>
      </button>

      {/* Search Dropdown Panel matching Image 3 */}
      {isOpen && (
        <div
          id={`${idPrefix}-dropdown-panel`}
          className={`absolute ${isFrom ? 'left-0' : 'left-0 sm:left-auto sm:right-0'} w-full sm:w-[380px] md:w-[420px] mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150`}
        >
          {/* Header with Search Input matching Image 3 */}
          <div className="p-3 bg-slate-50 border-b border-slate-100">
            <div className="relative">
              <Search className="w-4 h-4 text-blue-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search city, airport name, or code (e.g. KTM, DEL, Dubai)..."
                className="w-full bg-white border border-blue-500 ring-2 ring-blue-100 text-xs sm:text-sm font-medium rounded-xl pl-9 pr-8 py-2.5 text-slate-800 placeholder-slate-400 focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
                  title="Clear input"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 mt-2.5">
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer ${
                  activeTab === 'all'
                    ? 'bg-[#145a4e] text-white'
                    : 'bg-white text-slate-600 hover:bg-slate-200/70 border border-slate-200'
                }`}
              >
                All Airports
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('domestic')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer ${
                  activeTab === 'domestic'
                    ? 'bg-[#145a4e] text-white'
                    : 'bg-white text-slate-600 hover:bg-slate-200/70 border border-slate-200'
                }`}
              >
                Nepal Domestic
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('international')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer ${
                  activeTab === 'international'
                    ? 'bg-[#145a4e] text-white'
                    : 'bg-white text-slate-600 hover:bg-slate-200/70 border border-slate-200'
                }`}
              >
                International
              </button>
            </div>

            {/* Quick Pick Chips */}
            {!searchQuery && (
              <div className="mt-2.5 pt-2 border-t border-slate-200/60 flex items-center gap-1.5 flex-wrap">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Popular:</span>
                {popularQuickPicks.map((code) => {
                  const loc = FLIGHT_LOCATIONS.find((l) => l.code === code);
                  if (!loc) return null;
                  const isCurrent = selectedLocation.code === code;
                  return (
                    <button
                      key={code}
                      type="button"
                      onClick={() => handleSelectAirport(loc)}
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-md transition-colors cursor-pointer ${
                        isCurrent
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-slate-700 hover:bg-blue-50 hover:text-blue-700 border border-slate-200'
                      }`}
                    >
                      {code}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Results List */}
          <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
            {/* Custom City Option if user entered text that didn't match existing codes perfectly */}
            {searchQuery.trim().length > 1 && (
              <button
                type="button"
                onClick={() => {
                  const trimmed = searchQuery.trim();
                  handleSelectAirport({
                    id: `custom-${trimmed.toLowerCase().replace(/\s+/g, '-')}`,
                    code: trimmed.slice(0, 3).toUpperCase(),
                    city: trimmed,
                    airport: `${trimmed} Airport`,
                    country: 'International',
                    type: 'international',
                  });
                }}
                className="w-full text-left px-3.5 py-2.5 bg-blue-50/60 hover:bg-blue-100/80 border-b border-blue-100 flex items-center justify-between transition-colors cursor-pointer"
              >
                <div className="min-w-0 pr-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs sm:text-sm font-bold text-blue-900">
                      Use "{searchQuery.trim()}"
                    </span>
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-blue-200 text-blue-900">
                      {searchQuery.trim().slice(0, 3).toUpperCase()}
                    </span>
                  </div>
                  <div className="text-[11px] text-blue-700 font-medium mt-0.5">
                    Select custom departure/arrival city name
                  </div>
                </div>
                <span className="text-[11px] font-bold px-2 py-1 rounded bg-blue-600 text-white shrink-0">
                  Select
                </span>
              </button>
            )}

            {filteredAirports.length === 0 && searchQuery.trim().length === 0 ? (
              <div className="p-6 text-center text-slate-500 text-xs">
                Enter a city name or select an airport above.
              </div>
            ) : filteredAirports.length === 0 && searchQuery.trim().length > 0 ? (
              <div className="p-4 text-center text-slate-500 text-xs">
                No standard airport matches for "{searchQuery}". Click the button above to use it as a custom city!
              </div>
            ) : (
              filteredAirports.map((loc) => {
                const isSelected = selectedLocation.id === loc.id;
                return (
                  <button
                    key={loc.id}
                    type="button"
                    onClick={() => handleSelectAirport(loc)}
                    className={`w-full text-left px-3.5 py-2.5 flex items-center justify-between transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-blue-50/80 text-blue-900'
                        : 'hover:bg-slate-50 text-slate-800'
                    }`}
                  >
                    <div className="min-w-0 pr-2">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                          {loc.city}
                        </span>
                        <span className="text-[11px] font-mono font-extrabold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                          {loc.code}
                        </span>
                        {loc.type === 'domestic' ? (
                          <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800">
                            Nepal
                          </span>
                        ) : (
                          <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-blue-100 text-blue-800">
                            {loc.country}
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 truncate mt-0.5">
                        {loc.airport}
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

          {/* Footer note */}
          <div className="p-2 bg-slate-50 border-t border-slate-100 text-[10px] text-slate-500 text-center font-medium">
            Type any city name or airport code (press Enter to choose)
          </div>
        </div>
      )}
    </div>
  );
};
