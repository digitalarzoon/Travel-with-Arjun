import React, { useState } from 'react';
import { 
  X, 
  Plane, 
  Calendar, 
  Users, 
  MessageSquare, 
  Phone, 
  Mail, 
  MapPin, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import type { TourPackage, AgencySettings, BookingInquiry } from '../types';
import { submitBookingInquiry } from '../services/firebase';
import { useCurrency } from '../context/CurrencyContext';
import { CurrencySelector } from './CurrencySelector';

interface BookingInquiryModalProps {
  pkg?: TourPackage | null;
  allPackages: TourPackage[];
  settings: AgencySettings;
  currentUser?: any;
  onClose: () => void;
  onInquirySubmitted?: (inquiry: BookingInquiry) => void;
}

export const BookingInquiryModal: React.FC<BookingInquiryModalProps> = ({
  pkg,
  allPackages,
  settings,
  currentUser,
  onClose,
  onInquirySubmitted,
}) => {
  const { formatPrice, formatSecondaryPrice } = useCurrency();
  const [selectedTourId, setSelectedTourId] = useState<string>(pkg?.id || allPackages[0]?.id || '');
  const [customerName, setCustomerName] = useState<string>(currentUser?.displayName || '');
  const [email, setEmail] = useState<string>(currentUser?.email || '');
  const [phone, setPhone] = useState<string>('');
  const [whatsapp, setWhatsapp] = useState<string>('');
  const [travelersCount, setTravelersCount] = useState<number>(2);
  const [travelDate, setTravelDate] = useState<string>('');
  const [isFlexibleDate, setIsFlexibleDate] = useState<boolean>(true);
  const [pickupLocation, setPickupLocation] = useState<string>('Tribhuvan International Airport (KTM)');
  const [specialRequirements, setSpecialRequirements] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedInquiry, setSubmittedInquiry] = useState<BookingInquiry | null>(null);

  const selectedPkg = allPackages.find((p) => p.id === selectedTourId) || pkg || allPackages[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !email || !travelDate) {
      alert("Please complete all required fields including your travel date.");
      return;
    }

    setIsSubmitting(true);
    try {
      const estimatedTotal = selectedPkg ? selectedPkg.priceNpr * travelersCount : undefined;
      const inquiry = await submitBookingInquiry({
        customerName,
        email,
        phone: phone || whatsapp,
        whatsapp: whatsapp || phone,
        travelersCount,
        travelDate,
        isFlexibleDate,
        tourId: selectedPkg?.id || 'custom',
        tourName: selectedPkg?.name || 'Custom Nepal Holiday',
        pickupLocation,
        specialRequirements,
        estimatedTotalNpr: estimatedTotal,
        userId: currentUser?.uid,
      });

      setSubmittedInquiry(inquiry);
      if (onInquirySubmitted) onInquirySubmitted(inquiry);
    } catch (err) {
      console.error("Submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const directWhatsappUrl = submittedInquiry
    ? `https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
        `Namaste NepalVoyage! I just submitted an inquiry (Ref: #${submittedInquiry.id.slice(-6).toUpperCase()}) for "${submittedInquiry.tourName}" for ${submittedInquiry.travelersCount} travelers starting around ${submittedInquiry.travelDate}. My name is ${submittedInquiry.customerName}.`
      )}`
    : '';

  return (
    <div id="booking-modal-overlay" className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full my-6 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#0b3b95] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Plane className="w-5 h-5 text-amber-300 rotate-45" />
            <h3 className="font-extrabold text-lg tracking-tight font-display">
              {submittedInquiry ? 'Booking Inquiry Received' : 'Book Your Nepal Journey'}
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <CurrencySelector variant="compact" />
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-white/10 transition-colors text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {submittedInquiry ? (
            /* Confirmation Screen */
            <div className="text-center py-4 space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">
                  Status: New / Inquiry Received
                </span>
                <h4 className="text-2xl font-black text-slate-900 mt-1 font-display">
                  Dhanyabad, {submittedInquiry.customerName}!
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-md mx-auto">
                  Your trip inquiry for <strong>{submittedInquiry.tourName}</strong> has been received by our Kathmandu office.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left max-w-md mx-auto text-xs space-y-2 text-slate-700">
                <div className="flex justify-between border-b border-slate-200 pb-1.5">
                  <span className="text-slate-400 font-bold">Reference ID:</span>
                  <span className="font-mono font-bold text-slate-900">
                    #{submittedInquiry.id.slice(-6).toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-1.5">
                  <span className="text-slate-400 font-bold">Travel Date:</span>
                  <span className="font-semibold">{submittedInquiry.travelDate}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-1.5">
                  <span className="text-slate-400 font-bold">Travelers:</span>
                  <span className="font-semibold">{submittedInquiry.travelersCount} Person(s)</span>
                </div>
                {submittedInquiry.estimatedTotalNpr && (
                  <div className="flex justify-between font-black text-sm text-[#0b3b95] pt-1">
                    <span>Estimated Total:</span>
                    <div className="text-right">
                      <div>{formatPrice(submittedInquiry.estimatedTotalNpr)}</div>
                      <div className="text-[10px] text-slate-400 font-normal">Approx. {formatSecondaryPrice(submittedInquiry.estimatedTotalNpr)}</div>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={directWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Connect Instantly on WhatsApp</span>
                </a>

                <button
                  onClick={onClose}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition-all cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              {/* Tour Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Selected Tour Package *
                </label>
                <select
                  value={selectedTourId}
                  onChange={(e) => setSelectedTourId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#0b3b95]"
                >
                  {allPackages.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} — {formatPrice(p.priceNpr)} ({p.durationDays} Days)
                    </option>
                  ))}
                </select>
              </div>

              {/* Name and Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Smith"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#0b3b95]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#0b3b95]"
                  />
                </div>
              </div>

              {/* Phone & WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Phone Number (with country code) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+977 98XXXXXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#0b3b95]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    placeholder="Same as phone or WhatsApp"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#0b3b95]"
                  />
                </div>
              </div>

              {/* Travelers & Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Number of Travelers *
                  </label>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-slate-400" />
                    <select
                      value={travelersCount}
                      onChange={(e) => setTravelersCount(Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#0b3b95]"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 15].map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? 'Person' : 'Persons'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Preferred Travel Date *
                  </label>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <input
                      type="date"
                      required
                      value={travelDate}
                      onChange={(e) => setTravelDate(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#0b3b95]"
                    />
                  </div>
                </div>
              </div>

              {/* Flexible date toggle */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="flexible-date-check"
                  checked={isFlexibleDate}
                  onChange={(e) => setIsFlexibleDate(e.target.checked)}
                  className="rounded text-[#0b3b95] focus:ring-blue-500 w-4 h-4 cursor-pointer"
                />
                <label htmlFor="flexible-date-check" className="text-xs text-slate-600 font-medium cursor-pointer">
                  My travel dates are flexible (+/- 3 days)
                </label>
              </div>

              {/* Pickup location */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Pickup Location in Nepal
                </label>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    placeholder="Tribhuvan International Airport (KTM) or Hotel name"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#0b3b95]"
                  />
                </div>
              </div>

              {/* Special Requirements */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Special Requirements / Customization Requests
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Vegetarian meals, private room supplement, extra day in Pokhara, high-altitude gear rental inquiry..."
                  value={specialRequirements}
                  onChange={(e) => setSpecialRequirements(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#0b3b95]"
                />
              </div>

              {/* Price summary */}
              {selectedPkg && (
                <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-3.5 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-700 block">
                      {selectedPkg.name} ({travelersCount} Travelers)
                    </span>
                    <span className="text-slate-500">
                      Standard package price: {formatPrice(selectedPkg.priceNpr)} per person
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Est.</span>
                    <span className="text-base font-black text-[#0b3b95] font-display">
                      {formatPrice(selectedPkg.priceNpr * travelersCount)}
                    </span>
                    <span className="block text-[10px] text-slate-400">
                      Approx. {formatSecondaryPrice(selectedPkg.priceNpr * travelersCount)}
                    </span>
                  </div>
                </div>
              )}

              {/* Submit button */}
              <div className="pt-3">
                <button
                  id="submit-booking-inquiry-btn"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#0b3b95] hover:bg-[#082a6b] disabled:bg-slate-400 text-white font-extrabold text-sm py-3.5 rounded-xl shadow-lg shadow-blue-900/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Submitting to Kathmandu Operations...</span>
                  ) : (
                    <>
                      <span>Submit Booking Inquiry</span>
                      <Plane className="w-4 h-4 text-amber-300 rotate-45" />
                    </>
                  )}
                </button>
                <p className="text-[11px] text-slate-400 text-center mt-2">
                  No advance payment required for inquiry. Our team will verify availability and respond within 2-4 hours.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
