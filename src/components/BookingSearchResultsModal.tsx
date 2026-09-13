import React from 'react';
import { 
  X, 
  Plane, 
  Building2, 
  Briefcase, 
  Anchor, 
  Car, 
  Calendar, 
  Users, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  Luggage,
  Sparkles,
  MapPin,
  Star,
  Fuel,
  LifeBuoy
} from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { CurrencySelector } from './CurrencySelector';

export interface SearchBookingParams {
  category: 'flights' | 'hotels' | 'tours' | 'cruises' | 'cars';
  flightFrom?: { city: string; code: string; airport: string; country: string; type: string };
  flightTo?: { city: string; code: string; airport: string; country: string; type: string };
  tripType?: 'roundtrip' | 'oneway' | 'multicity';
  departDate: string;
  returnDate: string;
  travelers: string;
  hotelLocation?: { title: string; subtitle: string };
  tourDestination?: { title: string; subtitle: string };
  waterExperience?: { title: string; subtitle: string };
  carPickup?: { title: string; subtitle: string };
  carDropoff?: { title: string; subtitle: string };
  vehicleType?: string;
}

interface BookingSearchResultsModalProps {
  params: SearchBookingParams;
  onClose: () => void;
  onOpenBookingInquiry: (details: { title: string; type: string; priceNpr: number; notes: string }) => void;
}

export const BookingSearchResultsModal: React.FC<BookingSearchResultsModalProps> = ({
  params,
  onClose,
  onOpenBookingInquiry,
}) => {
  const { formatPrice, formatSecondaryPrice } = useCurrency();

  const isDomesticFlight =
    params.flightFrom?.country === 'Nepal' && params.flightTo?.country === 'Nepal';

  // Realistic Flight results generator
  const getFlightResults = () => {
    const fromCode = params.flightFrom?.code || 'KTM';
    const toCode = params.flightTo?.code || 'PKR';
    const isKtmPkr = (fromCode === 'KTM' && toCode === 'PKR') || (fromCode === 'PKR' && toCode === 'KTM');
    const isDelKtm = (fromCode === 'DEL' && toCode === 'KTM') || (fromCode === 'KTM' && toCode === 'DEL');
    const isDxbKtm = (fromCode === 'DXB' && toCode === 'KTM') || (fromCode === 'KTM' && toCode === 'DXB');

    if (isKtmPkr) {
      return [
        {
          id: 'fl-1',
          airline: 'Buddha Air',
          flightNum: 'U4-605',
          departTime: '08:30',
          arriveTime: '08:55',
          duration: '25m',
          type: 'Direct Non-Stop',
          aircraft: 'ATR 72-500',
          baggage: '20kg + 7kg Cabin',
          priceNpr: 5400,
          stops: 0,
          refundable: true,
        },
        {
          id: 'fl-2',
          airline: 'Yeti Airlines',
          flightNum: 'YT-671',
          departTime: '11:15',
          arriveTime: '11:40',
          duration: '25m',
          type: 'Direct Non-Stop',
          aircraft: 'ATR 72-500',
          baggage: '20kg + 7kg Cabin',
          priceNpr: 4950,
          stops: 0,
          refundable: true,
        },
        {
          id: 'fl-3',
          airline: 'Shree Airlines',
          flightNum: 'SHA-223',
          departTime: '14:45',
          arriveTime: '15:10',
          duration: '25m',
          type: 'Direct Non-Stop',
          aircraft: 'Bombardier Q400',
          baggage: '20kg + 7kg Cabin',
          priceNpr: 5200,
          stops: 0,
          refundable: true,
        },
      ];
    }

    if (isDelKtm) {
      return [
        {
          id: 'fl-del-1',
          airline: 'Nepal Airlines',
          flightNum: 'RA-206',
          departTime: '10:40',
          arriveTime: '12:20',
          duration: '1h 40m',
          type: 'Direct Non-Stop',
          aircraft: 'Airbus A320-200',
          baggage: '30kg + 7kg Cabin',
          priceNpr: 18500,
          stops: 0,
          refundable: true,
        },
        {
          id: 'fl-del-2',
          airline: 'Air India',
          flightNum: 'AI-213',
          departTime: '07:15',
          arriveTime: '09:00',
          duration: '1h 45m',
          type: 'Direct Non-Stop',
          aircraft: 'Airbus A321neo',
          baggage: '25kg + 7kg Cabin',
          priceNpr: 21000,
          stops: 0,
          refundable: true,
        },
        {
          id: 'fl-del-3',
          airline: 'IndiGo',
          flightNum: '6E-31',
          departTime: '13:50',
          arriveTime: '15:35',
          duration: '1h 45m',
          type: 'Direct Non-Stop',
          aircraft: 'Airbus A320neo',
          baggage: '20kg + 7kg Cabin',
          priceNpr: 16800,
          stops: 0,
          refundable: false,
        },
      ];
    }

    if (isDxbKtm) {
      return [
        {
          id: 'fl-dxb-1',
          airline: 'FlyDubai',
          flightNum: 'FZ-575',
          departTime: '02:10',
          arriveTime: '08:00',
          duration: '4h 20m',
          type: 'Direct Non-Stop',
          aircraft: 'Boeing 737 MAX 8',
          baggage: '30kg + 7kg Cabin',
          priceNpr: 48000,
          stops: 0,
          refundable: true,
        },
        {
          id: 'fl-dxb-2',
          airline: 'Nepal Airlines',
          flightNum: 'RA-230',
          departTime: '23:30',
          arriveTime: '05:45',
          duration: '4h 30m',
          type: 'Direct Non-Stop',
          aircraft: 'Airbus A330-200 Widebody',
          baggage: '40kg + 7kg Cabin',
          priceNpr: 45000,
          stops: 0,
          refundable: true,
        },
        {
          id: 'fl-dxb-3',
          airline: 'Emirates (Codeshare with FlyDubai)',
          flightNum: 'EK-2354',
          departTime: '14:20',
          arriveTime: '20:15',
          duration: '4h 25m',
          type: 'Direct Non-Stop',
          aircraft: 'Boeing 737 MAX 9',
          baggage: '35kg + 7kg Cabin',
          priceNpr: 56000,
          stops: 0,
          refundable: true,
        },
      ];
    }

    // Default general route
    return [
      {
        id: 'fl-gen-1',
        airline: isDomesticFlight ? 'Buddha Air' : 'Qatar Airways',
        flightNum: isDomesticFlight ? 'U4-201' : 'QR-652',
        departTime: '09:00',
        arriveTime: isDomesticFlight ? '09:35' : '16:45',
        duration: isDomesticFlight ? '35m' : '5h 15m',
        type: isDomesticFlight ? 'Direct Domestic Flight' : 'International Scheduled Flight',
        aircraft: isDomesticFlight ? 'ATR 72-500' : 'Boeing 787 Dreamliner',
        baggage: isDomesticFlight ? '20kg + 7kg Cabin' : '30kg + 7kg Cabin',
        priceNpr: isDomesticFlight ? 6200 : 54000,
        stops: isDomesticFlight ? 0 : 1,
        refundable: true,
      },
      {
        id: 'fl-gen-2',
        airline: isDomesticFlight ? 'Yeti Airlines' : 'Nepal Airlines Flag Carrier',
        flightNum: isDomesticFlight ? 'YT-305' : 'RA-416',
        departTime: '13:10',
        arriveTime: isDomesticFlight ? '13:45' : '19:20',
        duration: isDomesticFlight ? '35m' : '4h 40m',
        type: isDomesticFlight ? 'Direct Domestic Flight' : 'Direct International Flight',
        aircraft: isDomesticFlight ? 'ATR 72-500' : 'Airbus A330-200',
        baggage: isDomesticFlight ? '20kg + 7kg Cabin' : '35kg + 7kg Cabin',
        priceNpr: isDomesticFlight ? 5800 : 49000,
        stops: 0,
        refundable: true,
      },
    ];
  };

  // Realistic Nepal Hotel results
  const getHotelResults = () => {
    const loc = params.hotelLocation?.title || 'Kathmandu, Nepal';
    return [
      {
        id: 'ht-1',
        name: `The Heritage Boutique Sanctuary (${loc.split(',')[0]})`,
        location: `${loc}`,
        rating: 4.9,
        reviews: 312,
        amenities: ['Himalayan Courtyard', 'Free Airport Shuttle', 'Organic Breakfast Included', 'High-Speed Wi-Fi'],
        pricePerNightNpr: 8500,
        image: '/images/destinations/kathmandu.jpg',
      },
      {
        id: 'ht-2',
        name: `Grand Alpine Luxury Resort & Spa`,
        location: `${loc}`,
        rating: 4.8,
        reviews: 245,
        amenities: ['Panoramic Mountain View Balcony', 'Infinity Pool', 'Ayurvedic Spa', 'Complimentary Breakfast'],
        pricePerNightNpr: 14200,
        image: '/images/destinations/sarangkot.jpg',
      },
      {
        id: 'ht-3',
        name: `Comfort City Inn & Suites`,
        location: `${loc}`,
        rating: 4.6,
        reviews: 180,
        amenities: ['Central Location', 'Air Conditioned', '24/7 Power Backup', 'Restaurant & Rooftop Bar'],
        pricePerNightNpr: 4800,
        image: '/images/destinations/pokhara.jpg',
      },
    ];
  };

  // Realistic Nepal Car results
  const getCarResults = () => {
    return [
      {
        id: 'cr-1',
        name: '4WD Mountain Jeep (Mahindra Scorpio / Toyota Hilux)',
        category: 'High-Clearance 4x4',
        capacity: '6 Passengers',
        luggage: '4 Large Bags',
        features: ['Professional mountain driver', 'AC & Heating', 'Fuel & all highway tolls included', 'Off-road ready'],
        priceNprPerDay: 12500,
        route: `${params.carPickup?.title || 'Kathmandu'} -> ${params.carDropoff?.title || 'Pokhara'}`,
      },
      {
        id: 'cr-2',
        name: 'Comfort Highway Sedan (Hyundai Accent / Suzuki Dzire)',
        category: 'Economy Sedan',
        capacity: '4 Passengers',
        luggage: '2 Large Bags',
        features: ['Chauffeur included', 'AC', 'Paved highways & city travel', 'Fuel included'],
        priceNprPerDay: 6500,
        route: `${params.carPickup?.title || 'Kathmandu'} -> ${params.carDropoff?.title || 'Pokhara'}`,
      },
      {
        id: 'cr-3',
        name: 'Tourist Van (Toyota HiAce Super Custom 14-Seater)',
        category: 'Group Van',
        capacity: '14 Passengers',
        luggage: '8-10 Bags',
        features: ['Experienced tourist driver', 'Spacious high-roof AC interior', 'Permits included', 'Ideal for families'],
        priceNprPerDay: 11500,
        route: `${params.carPickup?.title || 'Kathmandu'} -> ${params.carDropoff?.title || 'Pokhara'}`,
      },
    ];
  };

  // Realistic Nepal Water Experiences
  const getWaterResults = () => {
    return [
      {
        id: 'wt-1',
        name: params.waterExperience?.title || 'Phewa Lake Traditional Boating — Pokhara',
        type: 'Freshwater Boat Experience (Nepal Lakes & Rivers)',
        duration: '1 to 2.5 Hours',
        rating: 4.9,
        reviews: 215,
        features: ['Certified life jackets included', 'Tal Barahi island temple stop', 'Local experienced boatman or self-row', 'Annapurna reflection vistas'],
        priceNpr: 1500,
      },
      {
        id: 'wt-2',
        name: 'Rapti River Dugout Canoe Wildlife Safari (Chitwan)',
        type: 'Silent National Park River Drift',
        duration: '1.5 Hours',
        rating: 4.95,
        reviews: 189,
        features: ['Spot endangered Gharial crocodiles', 'Expert Tharu river naturalist', 'Water birdwatching', 'Eco-friendly non-motorized canoe'],
        priceNpr: 2500,
      },
      {
        id: 'wt-3',
        name: 'Begnas Lake Peaceful Rowing & Kayaking (Pokhara Valley)',
        type: 'Quiet Freshwater Lake Retreat',
        duration: '2 Hours',
        rating: 4.75,
        reviews: 98,
        features: ['Untouched peaceful waters', 'Terraced hills backdrop', 'Single or double kayaks available', 'Life safety jackets provided'],
        priceNpr: 1800,
      },
    ];
  };

  const getTourResults = () => {
    const dest = params.tourDestination?.title || 'Kathmandu · Pokhara · Chitwan';
    return [
      {
        id: 'tr-1',
        name: `7 Days Nepal Golden Holiday (${dest})`,
        duration: '7 Days / 6 Nights',
        highlights: ['UNESCO Kathmandu monuments', 'Phewa Lake private boating', 'Chitwan jeep safari & rhinos', 'Nagarkot sunrise view'],
        priceNpr: 46000,
      },
      {
        id: 'tr-2',
        name: `Himalayan Scenic Highlights (${dest})`,
        duration: '5 Days / 4 Nights',
        highlights: ['Patan & Bhaktapur medieval squares', 'Sarangkot Annapurna dawn', 'Private AC vehicle throughout', 'Authentic Nepali welcome feast'],
        priceNpr: 35000,
      },
    ];
  };

  return (
    <div id="booking-search-results-modal" className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full my-6 overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-[#145a4e] text-white p-5 sm:p-6 relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-300">
            {params.category === 'flights' && <Plane className="w-4 h-4" />}
            {params.category === 'hotels' && <Building2 className="w-4 h-4" />}
            {params.category === 'tours' && <Briefcase className="w-4 h-4" />}
            {params.category === 'cruises' && <Anchor className="w-4 h-4" />}
            {params.category === 'cars' && <Car className="w-4 h-4" />}
            <span>Available Booking Options</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold mt-1 font-display tracking-tight text-white flex items-center gap-2 flex-wrap">
            {params.category === 'flights' && (
              <>
                <span>{params.flightFrom?.city} ({params.flightFrom?.code})</span>
                <ArrowRight className="w-5 h-5 text-amber-300" />
                <span>{params.flightTo?.city} ({params.flightTo?.code})</span>
              </>
            )}
            {params.category === 'hotels' && (
              <span>Hotels in {params.hotelLocation?.title || 'Kathmandu, Nepal'}</span>
            )}
            {params.category === 'tours' && (
              <span>Tours: {params.tourDestination?.title || 'Nepal Discovery'}</span>
            )}
            {params.category === 'cruises' && (
              <span>Nepal Water & Lake Experiences</span>
            )}
            {params.category === 'cars' && (
              <>
                <span>{params.carPickup?.title || 'Kathmandu'}</span>
                <ArrowRight className="w-5 h-5 text-amber-300" />
                <span>{params.carDropoff?.title || 'Pokhara'}</span>
              </>
            )}
          </h2>

          <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-emerald-100 font-medium">
            <div className="flex items-center gap-1 bg-black/20 px-2.5 py-1 rounded-md">
              <Calendar className="w-3.5 h-3.5 text-amber-300" />
              <span>Depart: {params.departDate}</span>
              {params.tripType === 'roundtrip' && params.returnDate && (
                <span> · Return: {params.returnDate}</span>
              )}
            </div>
            <div className="flex items-center gap-1 bg-black/20 px-2.5 py-1 rounded-md">
              <Users className="w-3.5 h-3.5 text-amber-300" />
              <span>{params.travelers}</span>
            </div>
            {params.category === 'flights' && (
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                isDomesticFlight ? 'bg-emerald-400 text-slate-950' : 'bg-blue-300 text-slate-950'
              }`}>
                {isDomesticFlight ? 'Nepal Domestic Route' : 'International Route'}
              </span>
            )}
            {params.category !== 'flights' && (
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-400 text-slate-950">
                100% Nepal Only
              </span>
            )}
          </div>
        </div>

        {/* Currency reminder banner */}
        <div className="bg-slate-50 px-5 py-2.5 border-b border-slate-100 flex items-center justify-between text-xs text-slate-600 flex-wrap gap-2">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#145a4e]" />
            <span>Instant booking inquiry with 24/7 concierge support in Nepal</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-slate-500">Switch Currency:</span>
            <CurrencySelector variant="compact" />
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 max-h-[60vh] overflow-y-auto space-y-3.5">
          {/* FLIGHT RESULTS */}
          {params.category === 'flights' && (
            <div className="space-y-3">
              {getFlightResults().map((flight) => (
                <div
                  key={flight.id}
                  className="border border-slate-200 hover:border-[#145a4e] rounded-2xl p-4 transition-all bg-white hover:shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm sm:text-base text-slate-900">
                        {flight.airline}
                      </span>
                      <span className="text-xs font-mono font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                        {flight.flightNum}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                        {flight.type}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-slate-700">
                      <div>
                        <div className="text-lg font-black text-slate-900">{flight.departTime}</div>
                        <div className="text-xs text-slate-500 font-semibold">{params.flightFrom?.code}</div>
                      </div>

                      <div className="flex flex-col items-center px-2">
                        <span className="text-[11px] text-slate-500 font-medium">{flight.duration}</span>
                        <div className="w-20 sm:w-28 h-0.5 bg-slate-200 relative my-1">
                          <Plane className="w-3.5 h-3.5 text-[#145a4e] absolute left-1/2 -translate-x-1/2 -top-1.5" />
                        </div>
                        <span className="text-[10px] text-emerald-600 font-semibold">Non-stop</span>
                      </div>

                      <div>
                        <div className="text-lg font-black text-slate-900">{flight.arriveTime}</div>
                        <div className="text-xs text-slate-500 font-semibold">{params.flightTo?.code}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-[11px] text-slate-500">
                      <span className="flex items-center gap-1">
                        <Luggage className="w-3 h-3 text-slate-400" />
                        {flight.baggage}
                      </span>
                      <span>·</span>
                      <span>Aircraft: {flight.aircraft}</span>
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className="md:text-right border-t md:border-t-0 pt-3 md:pt-0 border-slate-100 flex md:flex-col items-center md:items-end justify-between gap-2 shrink-0">
                    <div>
                      <div className="text-xl font-black text-[#145a4e]">
                        {formatPrice(flight.priceNpr)}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {formatSecondaryPrice(flight.priceNpr)} · per person
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        onOpenBookingInquiry({
                          title: `Flight: ${flight.airline} (${params.flightFrom?.code} -> ${params.flightTo?.code})`,
                          type: 'Flight Booking',
                          priceNpr: flight.priceNpr,
                          notes: `Route: ${params.flightFrom?.city} (${params.flightFrom?.code}) to ${params.flightTo?.city} (${params.flightTo?.code}) on ${params.departDate}. Flight: ${flight.flightNum} (${flight.departTime}). Travelers: ${params.travelers}.`,
                        })
                      }
                      className="px-4 py-2 bg-[#145a4e] hover:bg-[#0d4137] text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
                    >
                      Book Flight
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* HOTEL RESULTS */}
          {params.category === 'hotels' && (
            <div className="space-y-3">
              {getHotelResults().map((hotel) => (
                <div
                  key={hotel.id}
                  className="border border-slate-200 hover:border-blue-400 rounded-2xl p-4 transition-all bg-white hover:shadow-md flex flex-col sm:flex-row gap-4"
                >
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full sm:w-36 h-28 object-cover rounded-xl shrink-0"
                    onError={(e) => {
                      e.currentTarget.src = '/images/destinations/kathmandu.jpg';
                    }}
                  />
                  <div className="flex-1 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs text-amber-500 font-bold">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{hotel.rating}</span>
                      <span className="text-slate-400 font-normal">({hotel.reviews} reviews)</span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm sm:text-base">{hotel.name}</h4>
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span>{hotel.location}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {hotel.amenities.map((a, i) => (
                        <span key={i} className="text-[10px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="sm:text-right flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
                    <div>
                      <div className="text-lg font-black text-[#145a4e]">
                        {formatPrice(hotel.pricePerNightNpr)}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {formatSecondaryPrice(hotel.pricePerNightNpr)} / night
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        onOpenBookingInquiry({
                          title: `Hotel: ${hotel.name}`,
                          type: 'Hotel Reservation',
                          priceNpr: hotel.pricePerNightNpr,
                          notes: `Hotel: ${hotel.name} in ${hotel.location}. Check-in: ${params.departDate}, Check-out: ${params.returnDate}. Guests: ${params.travelers}.`,
                        })
                      }
                      className="px-4 py-2 bg-[#145a4e] hover:bg-[#0d4137] text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
                    >
                      Reserve Room
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TOUR RESULTS */}
          {params.category === 'tours' && (
            <div className="space-y-3">
              {getTourResults().map((tour) => (
                <div
                  key={tour.id}
                  className="border border-slate-200 hover:border-emerald-500 rounded-2xl p-4 transition-all bg-white hover:shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                >
                  <div className="space-y-1.5 flex-1">
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                      {tour.duration}
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm sm:text-base">{tour.name}</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs text-slate-600 pt-1">
                      {tour.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                          <span className="truncate">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100 flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0 w-full sm:w-auto">
                    <div>
                      <div className="text-lg font-black text-[#145a4e]">
                        {formatPrice(tour.priceNpr)}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {formatSecondaryPrice(tour.priceNpr)} / person
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        onOpenBookingInquiry({
                          title: `Tour Package: ${tour.name}`,
                          type: 'Tour Package Inquiry',
                          priceNpr: tour.priceNpr,
                          notes: `Tour: ${tour.name} (${tour.duration}). Preferred date: ${params.departDate}. Group size: ${params.travelers}.`,
                        })
                      }
                      className="px-4 py-2 bg-[#145a4e] hover:bg-[#0d4137] text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
                    >
                      Book Package
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* WATER / CRUISES RESULTS */}
          {params.category === 'cruises' && (
            <div className="space-y-3">
              <div className="p-3 bg-cyan-50 border border-cyan-200 rounded-xl text-xs text-cyan-900 font-medium flex items-center gap-2">
                <LifeBuoy className="w-4 h-4 text-cyan-700 shrink-0" />
                <span>
                  Nepal is a landlocked mountain country with pristine alpine lakes and glacial rivers. We provide authentic freshwater lake boating, river safaris, and rafting experiences.
                </span>
              </div>

              {getWaterResults().map((water) => (
                <div
                  key={water.id}
                  className="border border-slate-200 hover:border-cyan-500 rounded-2xl p-4 transition-all bg-white hover:shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-cyan-800 bg-cyan-100 px-2 py-0.5 rounded-full">
                        {water.type}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">· {water.duration}</span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm sm:text-base">{water.name}</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs text-slate-600 pt-1">
                      {water.features.map((f, i) => (
                        <div key={i} className="flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-cyan-600 shrink-0" />
                          <span className="truncate">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100 flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0 w-full sm:w-auto">
                    <div>
                      <div className="text-lg font-black text-[#145a4e]">
                        {formatPrice(water.priceNpr)}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {formatSecondaryPrice(water.priceNpr)} / trip
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        onOpenBookingInquiry({
                          title: `Water Experience: ${water.name}`,
                          type: 'Nepal Water Experience',
                          priceNpr: water.priceNpr,
                          notes: `Experience: ${water.name} (${water.duration}). Date: ${params.departDate}. Participants: ${params.travelers}.`,
                        })
                      }
                      className="px-4 py-2 bg-[#145a4e] hover:bg-[#0d4137] text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
                    >
                      Book Boating
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* CAR RENTAL RESULTS */}
          {params.category === 'cars' && (
            <div className="space-y-3">
              {getCarResults().map((car) => (
                <div
                  key={car.id}
                  className="border border-slate-200 hover:border-amber-500 rounded-2xl p-4 transition-all bg-white hover:shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                        {car.category}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">Route: {car.route}</span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm sm:text-base">{car.name}</h4>
                    <div className="flex flex-wrap gap-2 text-xs text-slate-600 pt-1">
                      <span className="flex items-center gap-1 font-medium">
                        <Users className="w-3 h-3 text-slate-400" /> {car.capacity}
                      </span>
                      <span className="flex items-center gap-1 font-medium">
                        <Luggage className="w-3 h-3 text-slate-400" /> {car.luggage}
                      </span>
                      <span className="flex items-center gap-1 font-medium text-emerald-700">
                        <ShieldCheck className="w-3.5 h-3.5" /> Driver & Fuel Included
                      </span>
                    </div>
                  </div>

                  <div className="sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100 flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0 w-full sm:w-auto">
                    <div>
                      <div className="text-lg font-black text-[#145a4e]">
                        {formatPrice(car.priceNprPerDay)}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {formatSecondaryPrice(car.priceNprPerDay)} / day
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        onOpenBookingInquiry({
                          title: `Car Rental: ${car.name}`,
                          type: 'Nepal Car Rental',
                          priceNpr: car.priceNprPerDay,
                          notes: `Rental: ${car.name}. Pickup: ${params.carPickup?.title || 'Kathmandu'}, Drop-off: ${params.carDropoff?.title || 'Pokhara'}. From ${params.departDate} to ${params.returnDate}. Passengers: ${params.travelers}.`,
                        })
                      }
                      className="px-4 py-2 bg-[#145a4e] hover:bg-[#0d4137] text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
                    >
                      Reserve Vehicle
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-5 py-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1 text-slate-600 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Official Government Registered Nepal Travel Operator · License #2941</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-1.5 text-slate-600 hover:text-slate-900 font-semibold text-xs"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
