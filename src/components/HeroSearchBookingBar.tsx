import React, { useState } from 'react';
import { 
  Plane, 
  Building2, 
  Briefcase, 
  Anchor, 
  Car, 
  ArrowLeftRight, 
  Calendar as CalendarIcon, 
  Users, 
  Search,
  Check,
  Plus,
  Trash2,
  AlertCircle
} from 'lucide-react';
import { CurrencySelector } from './CurrencySelector';
import { AirportSearchDropdown } from './AirportSearchDropdown';
import { NepalLocationDropdown, LocationOption } from './NepalLocationDropdown';
import { 
  FLIGHT_LOCATIONS, 
  FlightLocation,
  NEPAL_HOTEL_LOCATIONS,
  NEPAL_TOUR_DESTINATIONS,
  NEPAL_WATER_EXPERIENCES,
  NEPAL_CAR_LOCATIONS,
  NEPAL_VEHICLE_TYPES
} from '../data/bookingLocationsData';
import { BookingSearchResultsModal, SearchBookingParams } from './BookingSearchResultsModal';

interface HeroSearchBookingBarProps {
  onSearch: (params: {
    destination: string;
    category: string;
    travelDate: string;
    travelers: number;
  }) => void;
  onOpenDirectInquiry?: (details: { title: string; type: string; priceNpr: number; notes: string }) => void;
}

export const HeroSearchBookingBar: React.FC<HeroSearchBookingBarProps> = ({ 
  onSearch,
  onOpenDirectInquiry
}) => {
  const [activeTab, setActiveTab] = useState<'flights' | 'hotels' | 'tours' | 'cruises' | 'cars'>('flights');
  
  // 1. FLIGHTS STATE — Defaults: KTM -> PKR, 2026-04-10 to 2026-04-24, 2 Adults 1 Child
  const defaultFrom = FLIGHT_LOCATIONS.find((l) => l.code === 'KTM') || FLIGHT_LOCATIONS[0];
  const defaultTo = FLIGHT_LOCATIONS.find((l) => l.code === 'PKR') || FLIGHT_LOCATIONS[1];
  
  const [flightFrom, setFlightFrom] = useState<FlightLocation>(defaultFrom);
  const [flightTo, setFlightTo] = useState<FlightLocation>(defaultTo);
  const [flightTripType, setFlightTripType] = useState<'roundtrip' | 'oneway' | 'multicity'>('roundtrip');
  const [multiCitySegments, setMultiCitySegments] = useState<Array<{ from: FlightLocation; to: FlightLocation; date: string }>>([
    { from: defaultFrom, to: defaultTo, date: '2026-04-10' },
    { 
      from: defaultTo, 
      to: FLIGHT_LOCATIONS.find((l) => l.code === 'BHR') || defaultFrom, 
      date: '2026-04-15' 
    },
  ]);

  // Dates
  const [departDate, setDepartDate] = useState('2026-04-10');
  const [returnDate, setReturnDate] = useState('2026-04-24');
  const [travelers, setTravelers] = useState('2 Adults, 1 Child');

  // 2. HOTELS STATE (Nepal only)
  const hotelOptions: LocationOption[] = NEPAL_HOTEL_LOCATIONS.map((h) => ({
    id: h.id,
    title: h.label,
    subtitle: h.area,
    badge: 'Nepal Hotel',
    popular: h.popular,
  }));
  const [selectedHotelLocation, setSelectedHotelLocation] = useState<LocationOption>(hotelOptions[0]);
  const [hotelCheckIn, setHotelCheckIn] = useState('2026-04-10');
  const [hotelCheckOut, setHotelCheckOut] = useState('2026-04-15');
  const [hotelRooms, setHotelRooms] = useState('1 Room, 2 Guests');

  // 3. TOUR PACKAGES STATE (Nepal only)
  const tourOptions: LocationOption[] = NEPAL_TOUR_DESTINATIONS.map((t) => ({
    id: t.id,
    title: t.name,
    subtitle: `${t.region} · ${t.tagline}`,
    badge: t.region,
    popular: t.popular,
  }));
  const [selectedTourDestination, setSelectedTourDestination] = useState<LocationOption>(tourOptions[0]);
  const [tourDurationFilter, setTourDurationFilter] = useState('All Durations');
  const [tourStartDate, setTourStartDate] = useState('2026-04-10');

  // 4. CRUISES / WATER EXPERIENCES STATE (Nepal only - Freshwater lakes & rivers)
  const waterOptions: LocationOption[] = NEPAL_WATER_EXPERIENCES.map((w) => ({
    id: w.id,
    title: w.name,
    subtitle: `${w.location} · ${w.type} (${w.duration})`,
    badge: 'Lake & River',
    popular: w.popular,
  }));
  const [selectedWaterExp, setSelectedWaterExp] = useState<LocationOption>(waterOptions[0]);
  const [waterExpDate, setWaterExpDate] = useState('2026-04-12');
  const [waterParticipants, setWaterParticipants] = useState('2 Persons');

  // 5. CAR RENTALS STATE (Nepal only)
  const carLocationOptions: LocationOption[] = NEPAL_CAR_LOCATIONS.map((c) => ({
    id: c.id,
    title: c.name,
    subtitle: c.district,
    badge: 'Nepal City',
    popular: c.popular,
  }));
  const [carPickup, setCarPickup] = useState<LocationOption>(carLocationOptions[0]); // Kathmandu
  const [carDropoff, setCarDropoff] = useState<LocationOption>(carLocationOptions[1]); // Pokhara
  const [carPickupDate, setCarPickupDate] = useState('2026-04-10');
  const [carReturnDate, setCarReturnDate] = useState('2026-04-15');
  const [selectedVehicleType, setSelectedVehicleType] = useState<string>(NEPAL_VEHICLE_TYPES[3].id); // 4WD Jeep

  // Search Results Modal State
  const [activeSearchParams, setActiveSearchParams] = useState<SearchBookingParams | null>(null);

  const tabs = [
    { id: 'flights', label: 'Flights', icon: Plane },
    { id: 'hotels', label: 'Hotels', icon: Building2 },
    { id: 'tours', label: 'Tour Packages', icon: Briefcase },
    { id: 'cruises', label: 'Cruises', icon: Anchor, note: 'Nepal Water Experiences' },
    { id: 'cars', label: 'Car Rentals', icon: Car },
  ] as const;

  // Handle Swap Locations for Flights
  const handleSwapFlightLocations = () => {
    const temp = flightFrom;
    setFlightFrom(flightTo);
    setFlightTo(temp);
  };

  // Handle Depart Date Change (ensures Return Date is >= Depart Date)
  const handleDepartDateChange = (val: string) => {
    setDepartDate(val);
    if (returnDate && val > returnDate) {
      // Auto-set return date 7 days later
      const d = new Date(val);
      d.setDate(d.getDate() + 7);
      const iso = d.toISOString().split('T')[0];
      setReturnDate(iso);
    }
  };

  // Handle Hotel Check-in change
  const handleHotelCheckInChange = (val: string) => {
    setHotelCheckIn(val);
    if (hotelCheckOut && val > hotelCheckOut) {
      const d = new Date(val);
      d.setDate(d.getDate() + 5);
      setHotelCheckOut(d.toISOString().split('T')[0]);
    }
  };

  // Handle Car Pickup date change
  const handleCarPickupDateChange = (val: string) => {
    setCarPickupDate(val);
    if (carReturnDate && val > carReturnDate) {
      const d = new Date(val);
      d.setDate(d.getDate() + 5);
      setCarReturnDate(d.toISOString().split('T')[0]);
    }
  };

  // Multi-city handlers
  const handleAddSegment = () => {
    if (multiCitySegments.length >= 4) return;
    const lastSeg = multiCitySegments[multiCitySegments.length - 1];
    setMultiCitySegments([
      ...multiCitySegments,
      {
        from: lastSeg.to,
        to: FLIGHT_LOCATIONS.find((l) => l.code === 'KTM') || defaultFrom,
        date: lastSeg.date,
      },
    ]);
  };

  const handleRemoveSegment = (index: number) => {
    if (multiCitySegments.length <= 2) return;
    setMultiCitySegments(multiCitySegments.filter((_, i) => i !== index));
  };

  const handleUpdateSegment = (
    index: number,
    field: 'from' | 'to' | 'date',
    val: any
  ) => {
    const copy = [...multiCitySegments];
    copy[index] = { ...copy[index], [field]: val };
    setMultiCitySegments(copy);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let destName = flightTo.city;
    if (activeTab === 'hotels') destName = selectedHotelLocation.title;
    if (activeTab === 'tours') destName = selectedTourDestination.title;
    if (activeTab === 'cruises') destName = selectedWaterExp.title;
    if (activeTab === 'cars') destName = `${carPickup.title} -> ${carDropoff.title}`;

    const searchPayload: SearchBookingParams = {
      category: activeTab,
      flightFrom: {
        city: flightFrom.city,
        code: flightFrom.code,
        airport: flightFrom.airport,
        country: flightFrom.country,
        type: flightFrom.type,
      },
      flightTo: {
        city: flightTo.city,
        code: flightTo.code,
        airport: flightTo.airport,
        country: flightTo.country,
        type: flightTo.type,
      },
      tripType: flightTripType,
      departDate: activeTab === 'hotels' ? hotelCheckIn : activeTab === 'cars' ? carPickupDate : activeTab === 'cruises' ? waterExpDate : departDate,
      returnDate: activeTab === 'hotels' ? hotelCheckOut : activeTab === 'cars' ? carReturnDate : returnDate,
      travelers: activeTab === 'hotels' ? hotelRooms : activeTab === 'cruises' ? waterParticipants : travelers,
      hotelLocation: selectedHotelLocation,
      tourDestination: selectedTourDestination,
      waterExperience: selectedWaterExp,
      carPickup,
      carDropoff,
      vehicleType: selectedVehicleType,
    };

    setActiveSearchParams(searchPayload);

    onSearch({
      destination: destName,
      category: activeTab,
      travelDate: departDate,
      travelers: 2,
    });
  };

  return (
    <>
      <div id="hero-search-bar" className="relative z-30 max-w-6xl mx-auto px-4 sm:px-6 -mt-14 sm:-mt-20">
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-900/10 border border-slate-100 relative">
          
          {/* Top 5 Service Tabs matching mockup */}
          <div className="flex items-center gap-1 sm:gap-2 px-3 sm:px-6 pt-3 bg-slate-50/90 border-b border-slate-100 overflow-x-auto scrollbar-none rounded-t-2xl">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`search-tab-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  type="button"
                  className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold tracking-wide transition-all cursor-pointer whitespace-nowrap mb-2.5 ${
                    isActive
                      ? 'bg-[#145a4e] text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-slate-500'}`} />
                  <span>{tab.label}</span>
                  {tab.id === 'cruises' && (
                    <span className="hidden md:inline-block text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-200">
                      Nepal Lakes
                    </span>
                  )}
                  {tab.id !== 'flights' && (
                    <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      Nepal
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* FLIGHT SUB-HEADER: Trip Type Selector (Round Trip, One Way, Multi-City) */}
          {activeTab === 'flights' && (
            <div className="px-4 sm:px-6 pt-3 pb-0 flex flex-wrap items-center justify-between gap-3 text-xs border-b border-slate-100 bg-white">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setFlightTripType('roundtrip')}
                  className={`px-3 py-1 rounded-full font-bold transition-all cursor-pointer ${
                    flightTripType === 'roundtrip'
                      ? 'bg-[#145a4e] text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Round Trip
                </button>
                <button
                  type="button"
                  onClick={() => setFlightTripType('oneway')}
                  className={`px-3 py-1 rounded-full font-bold transition-all cursor-pointer ${
                    flightTripType === 'oneway'
                      ? 'bg-[#145a4e] text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  One Way
                </button>
                <button
                  type="button"
                  onClick={() => setFlightTripType('multicity')}
                  className={`px-3 py-1 rounded-full font-bold transition-all cursor-pointer ${
                    flightTripType === 'multicity'
                      ? 'bg-[#145a4e] text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Multi-City
                </button>
              </div>

              <div className="text-[11px] font-semibold text-slate-500 hidden sm:flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
                <span>Supports International Inbound/Outbound & Nepal Domestic Routes</span>
              </div>
            </div>
          )}

          {/* NEPAL ONLY Notice for Other Tabs */}
          {activeTab !== 'flights' && (
            <div className="px-4 sm:px-6 py-2 bg-emerald-50/70 border-b border-emerald-100 text-[11px] text-emerald-800 font-medium flex items-center justify-between">
              <span>
                {activeTab === 'hotels' && '🏨 100% Nepal Hotels & Lodges — Search Kathmandu, Pokhara, Chitwan, Nagarkot & more.'}
                {activeTab === 'tours' && '🏔️ 100% Nepal Tour Packages — Trekking, Cultural Circuits, Safaris & Pilgrimages.'}
                {activeTab === 'cruises' && '🚣 Nepal Water Experiences — Landlocked Country: Enjoy Phewa & Begnas Lake boating, Rapti & Narayani river safaris.'}
                {activeTab === 'cars' && '🚗 100% Nepal Car & Jeep Rentals — Kathmandu, Pokhara, Chitwan with experienced drivers.'}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900 shrink-0 hidden sm:inline-block">
                Nepal Only
              </span>
            </div>
          )}

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-4 sm:p-5">
            
            {/* 1. FLIGHTS TAB FORM */}
            {activeTab === 'flights' && flightTripType !== 'multicity' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-3.5 items-center">
                {/* FROM Airport Selector with Useful Default */}
                <div className="lg:col-span-3">
                  <AirportSearchDropdown
                    label="FROM"
                    selectedLocation={flightFrom}
                    onSelect={(loc) => setFlightFrom(loc)}
                    idPrefix="flight-from"
                  />
                </div>

                {/* Swap Button */}
                <div className="hidden lg:flex lg:col-span-1 justify-center -mx-2">
                  <button
                    type="button"
                    onClick={handleSwapFlightLocations}
                    className="w-8 h-8 rounded-full bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-700 flex items-center justify-center border border-slate-200 shadow-xs transition-colors cursor-pointer"
                    title="Swap locations (FROM <-> TO)"
                  >
                    <ArrowLeftRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* TO Airport Selector with Useful Default */}
                <div className="lg:col-span-3">
                  <AirportSearchDropdown
                    label="TO"
                    selectedLocation={flightTo}
                    onSelect={(loc) => setFlightTo(loc)}
                    idPrefix="flight-to"
                  />
                </div>

                {/* Depart Date */}
                <div className={flightTripType === 'roundtrip' ? 'lg:col-span-2' : 'lg:col-span-3'}>
                  <div className="border border-slate-200 rounded-xl p-2.5 bg-slate-50/60 hover:bg-white hover:border-blue-400 transition-all focus-within:ring-2 focus-within:ring-blue-100 focus-within:bg-white">
                    <label className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                      <CalendarIcon className="w-3 h-3 text-blue-600" />
                      <span>Departure</span>
                    </label>
                    <input
                      type="date"
                      value={departDate}
                      onChange={(e) => handleDepartDateChange(e.target.value)}
                      className="w-full bg-transparent text-xs sm:text-sm font-bold text-slate-800 focus:outline-hidden pt-0.5 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Return Date (Enabled for Round Trip, Disabled for One Way) */}
                {flightTripType === 'roundtrip' ? (
                  <div className="lg:col-span-2">
                    <div className="border border-slate-200 rounded-xl p-2.5 bg-slate-50/60 hover:bg-white hover:border-blue-400 transition-all focus-within:ring-2 focus-within:ring-blue-100 focus-within:bg-white">
                      <label className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                        <CalendarIcon className="w-3 h-3 text-blue-600" />
                        <span>Return</span>
                      </label>
                      <input
                        type="date"
                        min={departDate}
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                        className="w-full bg-transparent text-xs sm:text-sm font-bold text-slate-800 focus:outline-hidden pt-0.5 cursor-pointer"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="lg:col-span-1 hidden lg:flex flex-col justify-center text-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">One Way</span>
                    <span className="text-[11px] text-slate-500">No return</span>
                  </div>
                )}

                {/* Search CTA */}
                <div className="lg:col-span-1 flex items-center justify-end w-full">
                  <button
                    id="search-submit-btn"
                    type="submit"
                    className="w-full h-11 sm:h-12 bg-[#145a4e] hover:bg-[#0d4137] text-white rounded-xl font-bold text-sm tracking-wide shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                  >
                    <span>Search</span>
                    <Search className="w-3.5 h-3.5 text-amber-300" />
                  </button>
                </div>
              </div>
            )}

            {/* FLIGHTS MULTI-CITY BUILDER */}
            {activeTab === 'flights' && flightTripType === 'multicity' && (
              <div className="space-y-3">
                {multiCitySegments.map((seg, idx) => (
                  <div key={idx} className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-center p-2 bg-slate-50/70 rounded-xl border border-slate-200">
                    <div className="sm:col-span-1 text-center font-bold text-xs text-slate-500">
                      Flight {idx + 1}
                    </div>
                    <div className="sm:col-span-4">
                      <AirportSearchDropdown
                        label="FROM"
                        selectedLocation={seg.from}
                        onSelect={(loc) => handleUpdateSegment(idx, 'from', loc)}
                        idPrefix={`multicity-from-${idx}`}
                      />
                    </div>
                    <div className="sm:col-span-4">
                      <AirportSearchDropdown
                        label="TO"
                        selectedLocation={seg.to}
                        onSelect={(loc) => handleUpdateSegment(idx, 'to', loc)}
                        idPrefix={`multicity-to-${idx}`}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <input
                        type="date"
                        value={seg.date}
                        onChange={(e) => handleUpdateSegment(idx, 'date', e.target.value)}
                        className="w-full border border-slate-200 rounded-xl p-2 bg-white text-xs font-bold text-slate-800"
                      />
                    </div>
                    <div className="sm:col-span-1 flex justify-center">
                      {multiCitySegments.length > 2 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveSegment(idx)}
                          className="p-1.5 text-red-500 hover:text-red-700 rounded-lg hover:bg-red-50 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={handleAddSegment}
                    disabled={multiCitySegments.length >= 4}
                    className="flex items-center gap-1.5 text-xs font-bold text-[#145a4e] hover:text-[#0d4137] cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Another Flight Segment</span>
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#145a4e] hover:bg-[#0d4137] text-white rounded-xl font-bold text-sm flex items-center gap-2"
                  >
                    <span>Search Multi-City</span>
                    <Search className="w-4 h-4 text-amber-300" />
                  </button>
                </div>
              </div>
            )}

            {/* 2. HOTELS TAB FORM (Nepal only) */}
            {activeTab === 'hotels' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-3.5 items-center">
                <div className="lg:col-span-4">
                  <NepalLocationDropdown
                    label="NEPAL HOTEL LOCATION"
                    selectedOption={selectedHotelLocation}
                    options={hotelOptions}
                    onSelect={(opt) => setSelectedHotelLocation(opt)}
                    idPrefix="hotel-loc"
                    type="hotel"
                    placeholder="Search Kathmandu, Pokhara, Chitwan, Nagarkot..."
                  />
                </div>

                <div className="lg:col-span-3">
                  <div className="border border-slate-200 rounded-xl p-2.5 bg-slate-50/60 hover:bg-white hover:border-blue-400 transition-all focus-within:ring-2 focus-within:ring-blue-100 focus-within:bg-white">
                    <label className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                      <CalendarIcon className="w-3 h-3 text-blue-600" />
                      <span>Check-In</span>
                    </label>
                    <input
                      type="date"
                      value={hotelCheckIn}
                      onChange={(e) => handleHotelCheckInChange(e.target.value)}
                      className="w-full bg-transparent text-xs sm:text-sm font-bold text-slate-800 focus:outline-hidden pt-0.5 cursor-pointer"
                    />
                  </div>
                </div>

                <div className="lg:col-span-3">
                  <div className="border border-slate-200 rounded-xl p-2.5 bg-slate-50/60 hover:bg-white hover:border-blue-400 transition-all focus-within:ring-2 focus-within:ring-blue-100 focus-within:bg-white">
                    <label className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                      <CalendarIcon className="w-3 h-3 text-blue-600" />
                      <span>Check-Out</span>
                    </label>
                    <input
                      type="date"
                      min={hotelCheckIn}
                      value={hotelCheckOut}
                      onChange={(e) => setHotelCheckOut(e.target.value)}
                      className="w-full bg-transparent text-xs sm:text-sm font-bold text-slate-800 focus:outline-hidden pt-0.5 cursor-pointer"
                    />
                  </div>
                </div>

                <div className="lg:col-span-2 flex items-center justify-end w-full">
                  <button
                    type="submit"
                    className="w-full h-11 sm:h-12 bg-[#145a4e] hover:bg-[#0d4137] text-white rounded-xl font-bold text-sm tracking-wide shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                  >
                    <span>Search</span>
                    <Search className="w-3.5 h-3.5 text-amber-300" />
                  </button>
                </div>
              </div>
            )}

            {/* 3. TOUR PACKAGES TAB FORM (Nepal only) */}
            {activeTab === 'tours' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-3.5 items-center">
                <div className="lg:col-span-5">
                  <NepalLocationDropdown
                    label="NEPAL DESTINATION / TOUR"
                    selectedOption={selectedTourDestination}
                    options={tourOptions}
                    onSelect={(opt) => setSelectedTourDestination(opt)}
                    idPrefix="tour-dest"
                    type="tour"
                    placeholder="Search Everest, Annapurna, Chitwan, Mustang, Pokhara..."
                  />
                </div>

                <div className="lg:col-span-3">
                  <div className="border border-slate-200 rounded-xl p-2.5 bg-slate-50/60 hover:bg-white hover:border-emerald-400 transition-all">
                    <label className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                      <Briefcase className="w-3 h-3 text-emerald-600" />
                      <span>Duration Filter</span>
                    </label>
                    <select
                      value={tourDurationFilter}
                      onChange={(e) => setTourDurationFilter(e.target.value)}
                      className="w-full bg-transparent text-xs sm:text-sm font-bold text-slate-800 focus:outline-hidden pt-0.5 cursor-pointer"
                    >
                      <option value="All Durations">All Durations (1 to 21 Days)</option>
                      <option value="1-3 Days">Short Escapes (1-3 Days)</option>
                      <option value="4-7 Days">Classic Circuits (4-7 Days)</option>
                      <option value="8-14 Days">Himalayan Treks (8-14 Days)</option>
                      <option value="15+ Days">Full Expeditions (15+ Days)</option>
                    </select>
                  </div>
                </div>

                <div className="lg:col-span-2">
                  <div className="border border-slate-200 rounded-xl p-2.5 bg-slate-50/60 hover:bg-white hover:border-emerald-400 transition-all">
                    <label className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                      <CalendarIcon className="w-3 h-3 text-emerald-600" />
                      <span>Start Date</span>
                    </label>
                    <input
                      type="date"
                      value={tourStartDate}
                      onChange={(e) => setTourStartDate(e.target.value)}
                      className="w-full bg-transparent text-xs sm:text-sm font-bold text-slate-800 focus:outline-hidden pt-0.5 cursor-pointer"
                    />
                  </div>
                </div>

                <div className="lg:col-span-2 flex items-center justify-end w-full">
                  <button
                    type="submit"
                    className="w-full h-11 sm:h-12 bg-[#145a4e] hover:bg-[#0d4137] text-white rounded-xl font-bold text-sm tracking-wide shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                  >
                    <span>Search</span>
                    <Search className="w-3.5 h-3.5 text-amber-300" />
                  </button>
                </div>
              </div>
            )}

            {/* 4. CRUISES TAB FORM (Nepal Water Experiences) */}
            {activeTab === 'cruises' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-3.5 items-center">
                <div className="lg:col-span-6">
                  <NepalLocationDropdown
                    label="NEPAL WATER EXPERIENCE (LAKES & RIVERS)"
                    selectedOption={selectedWaterExp}
                    options={waterOptions}
                    onSelect={(opt) => setSelectedWaterExp(opt)}
                    idPrefix="water-exp"
                    type="water"
                    placeholder="Phewa Lake, Begnas Lake, Rapti River, Rara Lake..."
                  />
                </div>

                <div className="lg:col-span-4">
                  <div className="border border-slate-200 rounded-xl p-2.5 bg-slate-50/60 hover:bg-white hover:border-cyan-400 transition-all">
                    <label className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                      <CalendarIcon className="w-3 h-3 text-cyan-600" />
                      <span>Experience Date</span>
                    </label>
                    <input
                      type="date"
                      value={waterExpDate}
                      onChange={(e) => setWaterExpDate(e.target.value)}
                      className="w-full bg-transparent text-xs sm:text-sm font-bold text-slate-800 focus:outline-hidden pt-0.5 cursor-pointer"
                    />
                  </div>
                </div>

                <div className="lg:col-span-2 flex items-center justify-end w-full">
                  <button
                    type="submit"
                    className="w-full h-11 sm:h-12 bg-[#145a4e] hover:bg-[#0d4137] text-white rounded-xl font-bold text-sm tracking-wide shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                  >
                    <span>Search</span>
                    <Search className="w-3.5 h-3.5 text-amber-300" />
                  </button>
                </div>
              </div>
            )}

            {/* 5. CAR RENTALS TAB FORM (Nepal only) */}
            {activeTab === 'cars' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-3.5 items-center">
                <div className="lg:col-span-3">
                  <NepalLocationDropdown
                    label="PICKUP CITY"
                    selectedOption={carPickup}
                    options={carLocationOptions}
                    onSelect={(opt) => setCarPickup(opt)}
                    idPrefix="car-pickup"
                    type="car"
                    placeholder="Kathmandu, Pokhara, Chitwan..."
                  />
                </div>

                <div className="lg:col-span-3">
                  <NepalLocationDropdown
                    label="DROP-OFF CITY"
                    selectedOption={carDropoff}
                    options={carLocationOptions}
                    onSelect={(opt) => setCarDropoff(opt)}
                    idPrefix="car-dropoff"
                    type="car"
                    placeholder="Pokhara, Kathmandu, Chitwan..."
                  />
                </div>

                <div className="lg:col-span-2">
                  <div className="border border-slate-200 rounded-xl p-2.5 bg-slate-50/60 hover:bg-white hover:border-amber-400 transition-all">
                    <label className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                      <CalendarIcon className="w-3 h-3 text-amber-600" />
                      <span>Pickup Date</span>
                    </label>
                    <input
                      type="date"
                      value={carPickupDate}
                      onChange={(e) => handleCarPickupDateChange(e.target.value)}
                      className="w-full bg-transparent text-xs sm:text-sm font-bold text-slate-800 focus:outline-hidden pt-0.5 cursor-pointer"
                    />
                  </div>
                </div>

                <div className="lg:col-span-2">
                  <div className="border border-slate-200 rounded-xl p-2.5 bg-slate-50/60 hover:bg-white hover:border-amber-400 transition-all">
                    <label className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                      <Car className="w-3 h-3 text-amber-600" />
                      <span>Vehicle Type</span>
                    </label>
                    <select
                      value={selectedVehicleType}
                      onChange={(e) => setSelectedVehicleType(e.target.value)}
                      className="w-full bg-transparent text-xs font-bold text-slate-800 focus:outline-hidden pt-0.5 cursor-pointer"
                    >
                      {NEPAL_VEHICLE_TYPES.map((v) => (
                        <option key={v.id} value={v.id}>
                          {v.category} ({v.capacity})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="lg:col-span-2 flex items-center justify-end w-full">
                  <button
                    type="submit"
                    className="w-full h-11 sm:h-12 bg-[#145a4e] hover:bg-[#0d4137] text-white rounded-xl font-bold text-sm tracking-wide shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                  >
                    <span>Search</span>
                    <Search className="w-3.5 h-3.5 text-amber-300" />
                  </button>
                </div>
              </div>
            )}

            {/* Travelers and Currency Helper Row matching mockup */}
            <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <Users className="w-3.5 h-3.5 text-[#145a4e]" />
                <span className="font-medium text-slate-700">
                  {activeTab === 'hotels' ? 'Rooms & Guests:' : activeTab === 'cars' ? 'Passengers:' : 'Travelers:'}
                </span>
                
                {activeTab === 'hotels' ? (
                  <select
                    value={hotelRooms}
                    onChange={(e) => setHotelRooms(e.target.value)}
                    className="bg-slate-100 text-slate-800 font-bold px-2.5 py-1 rounded-md border-0 cursor-pointer focus:outline-hidden"
                  >
                    <option value="1 Room, 1 Guest">1 Room, 1 Guest</option>
                    <option value="1 Room, 2 Guests">1 Room, 2 Guests</option>
                    <option value="2 Rooms, 4 Guests">2 Rooms, 4 Guests</option>
                    <option value="3+ Rooms (Group)">3+ Rooms (Group)</option>
                  </select>
                ) : activeTab === 'cruises' ? (
                  <select
                    value={waterParticipants}
                    onChange={(e) => setWaterParticipants(e.target.value)}
                    className="bg-slate-100 text-slate-800 font-bold px-2.5 py-1 rounded-md border-0 cursor-pointer focus:outline-hidden"
                  >
                    <option value="1 Person">1 Person (Single Kayak)</option>
                    <option value="2 Persons">2 Persons (Couple Boat)</option>
                    <option value="Family (3-5 Persons)">Family (3-5 Persons)</option>
                    <option value="Large Group (6+)">Large Group (6+)</option>
                  </select>
                ) : (
                  <select
                    value={travelers}
                    onChange={(e) => setTravelers(e.target.value)}
                    className="bg-slate-100 text-slate-800 font-bold px-2.5 py-1 rounded-md border-0 cursor-pointer focus:outline-hidden"
                  >
                    <option value="1 Adult">1 Adult</option>
                    <option value="2 Adults">2 Adults</option>
                    <option value="2 Adults, 1 Child">2 Adults, 1 Child</option>
                    <option value="2 Adults, 2 Children">2 Adults, 2 Children</option>
                    <option value="Family / Group">Family / Group (5+)</option>
                  </select>
                )}
              </div>

              <div className="flex items-center gap-2 text-slate-600 font-medium">
                <span>Display Prices:</span>
                <CurrencySelector variant="pill" showRateTip />
              </div>
            </div>

          </form>

        </div>
      </div>

      {/* Search Results Preview Modal */}
      {activeSearchParams && (
        <BookingSearchResultsModal
          params={activeSearchParams}
          onClose={() => setActiveSearchParams(null)}
          onOpenBookingInquiry={(details) => {
            setActiveSearchParams(null);
            if (onOpenDirectInquiry) {
              onOpenDirectInquiry(details);
            }
          }}
        />
      )}
    </>
  );
};
