import React, { useState, useEffect } from 'react';
import { 
  X, 
  Settings, 
  Inbox, 
  Package, 
  CheckCircle2, 
  Clock, 
  Save, 
  Edit, 
  AlertCircle,
  ExternalLink,
  MessageSquare,
  Search,
  Sliders
} from 'lucide-react';
import type { BookingInquiry, AgencySettings, TourPackage, InquiryStatus } from '../types';
import { 
  fetchAllInquiries, 
  updateInquiryStatus, 
  saveAgencySettings 
} from '../services/firebase';
import { useCurrency } from '../context/CurrencyContext';
import { CurrencySelector } from './CurrencySelector';

interface AdminDashboardModalProps {
  initialSettings: AgencySettings;
  packages: TourPackage[];
  onClose: () => void;
  onSettingsUpdated: (newSettings: AgencySettings) => void;
  onPackageUpdated?: (updatedPkg: TourPackage) => void;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  initialSettings,
  packages,
  onClose,
  onSettingsUpdated,
  onPackageUpdated,
}) => {
  const { formatPrice, formatSecondaryPrice } = useCurrency();
  const [activeTab, setActiveTab] = useState<'inquiries' | 'settings' | 'packages'>('inquiries');
  const [inquiries, setInquiries] = useState<BookingInquiry[]>([]);
  const [loadingInquiries, setLoadingInquiries] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState<BookingInquiry | null>(null);
  const [adminNote, setAdminNote] = useState('');
  const [inquiryStatus, setInquiryStatus] = useState<InquiryStatus>('New');

  // Agency settings form state
  const [settingsForm, setSettingsForm] = useState<AgencySettings>(initialSettings);
  const [savingSettings, setSavingSettings] = useState(false);
  const [settingsSavedSuccess, setSettingsSavedSuccess] = useState(false);

  // Packages quick price editor
  const [tourList, setTourList] = useState<TourPackage[]>(packages);
  const [editingTourId, setEditingTourId] = useState<string | null>(null);
  const [editingPrice, setEditingPrice] = useState<number>(0);

  useEffect(() => {
    loadInquiries();
  }, []);

  const loadInquiries = async () => {
    setLoadingInquiries(true);
    try {
      const data = await fetchAllInquiries();
      setInquiries(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingInquiries(false);
    }
  };

  const handleSelectInquiry = (inq: BookingInquiry) => {
    setSelectedInquiry(inq);
    setInquiryStatus(inq.status);
    setAdminNote(inq.adminNotes || '');
  };

  const handleUpdateInquiry = async () => {
    if (!selectedInquiry) return;
    try {
      await updateInquiryStatus(selectedInquiry.id, inquiryStatus, adminNote);
      setInquiries((prev) =>
        prev.map((i) =>
          i.id === selectedInquiry.id
            ? { ...i, status: inquiryStatus, adminNotes: adminNote }
            : i
        )
      );
      setSelectedInquiry((prev) =>
        prev ? { ...prev, status: inquiryStatus, adminNotes: adminNote } : null
      );
      alert("Inquiry status updated successfully!");
    } catch (e) {
      console.error(e);
      alert("Error updating inquiry.");
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSettings(true);
    try {
      await saveAgencySettings(settingsForm);
      onSettingsUpdated(settingsForm);
      setSettingsSavedSuccess(true);
      setTimeout(() => setSettingsSavedSuccess(false), 3000);
    } catch (e) {
      console.error(e);
      alert("Failed to save settings.");
    } finally {
      setSavingSettings(false);
    }
  };

  const handleSaveTourPrice = (tourId: string) => {
    const updated = tourList.map((t) =>
      t.id === tourId ? { ...t, priceNpr: editingPrice } : t
    );
    setTourList(updated);
    const target = updated.find((t) => t.id === tourId);
    if (target && onPackageUpdated) {
      onPackageUpdated(target);
    }
    setEditingTourId(null);
  };

  return (
    <div id="admin-modal-overlay" className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full my-6 overflow-hidden max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
              HQ
            </div>
            <div>
              <h3 className="font-extrabold text-base tracking-tight font-display">
                Nepal Operations Management
              </h3>
              <span className="text-[11px] text-slate-400">
                Kathmandu Agency HQ • Inquiries, Settings & Pricing
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-2 shrink-0">
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold border-b-2 cursor-pointer transition-all ${
              activeTab === 'inquiries'
                ? 'border-[#0b3b95] text-[#0b3b95] bg-white rounded-t-xl'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Inbox className="w-4 h-4" />
            <span>Booking Inquiries ({inquiries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('packages')}
            className={`flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold border-b-2 cursor-pointer transition-all ${
              activeTab === 'packages'
                ? 'border-[#0b3b95] text-[#0b3b95] bg-white rounded-t-xl'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Tour Pricing & Deals ({tourList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold border-b-2 cursor-pointer transition-all ${
              activeTab === 'settings'
                ? 'border-[#0b3b95] text-[#0b3b95] bg-white rounded-t-xl'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Agency Settings</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="overflow-y-auto flex-1 p-6">
          {/* TAB 1: INQUIRIES */}
          {activeTab === 'inquiries' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Inquiry List */}
              <div className="lg:col-span-6 space-y-3">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Received Inquiries
                  </h4>
                  <button
                    onClick={loadInquiries}
                    className="text-xs font-bold text-[#0b3b95] hover:underline cursor-pointer"
                  >
                    Refresh
                  </button>
                </div>

                {loadingInquiries ? (
                  <p className="text-xs text-slate-500">Loading inquiries from database...</p>
                ) : inquiries.length === 0 ? (
                  <div className="bg-slate-50 border border-dashed border-slate-200 rounded-2xl p-8 text-center text-xs text-slate-500">
                    No inquiries recorded yet. Submit a test inquiry from the "Book Now" buttons to see it live here!
                  </div>
                ) : (
                  <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
                    {inquiries.map((inq) => {
                      const isSelected = selectedInquiry?.id === inq.id;
                      return (
                        <div
                          key={inq.id}
                          onClick={() => handleSelectInquiry(inq)}
                          className={`p-3.5 rounded-2xl border transition-all cursor-pointer text-left ${
                            isSelected
                              ? 'border-[#0b3b95] bg-blue-50/50 shadow-xs'
                              : 'border-slate-200 hover:border-slate-300 bg-white'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-extrabold text-xs text-slate-900 line-clamp-1">
                              {inq.customerName}
                            </span>
                            <span
                              className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase ${
                                inq.status === 'Confirmed'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : inq.status === 'Cancelled'
                                  ? 'bg-rose-100 text-rose-800'
                                  : inq.status === 'Contacted'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-amber-100 text-amber-800'
                              }`}
                            >
                              {inq.status}
                            </span>
                          </div>

                          <div className="text-xs text-slate-600 font-semibold line-clamp-1">
                            {inq.tourName}
                          </div>

                          <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2">
                            <span>Travel: {inq.travelDate}</span>
                            <span>{inq.travelersCount} Pax</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Inquiry Detail & Status Form */}
              <div className="lg:col-span-6 bg-slate-50 rounded-2xl border border-slate-200 p-5">
                {selectedInquiry ? (
                  <div className="space-y-4 text-left">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase">
                          Ref: #{selectedInquiry.id.slice(-6).toUpperCase()}
                        </span>
                        <h4 className="text-lg font-black text-slate-900 font-display">
                          {selectedInquiry.customerName}
                        </h4>
                      </div>
                      <a
                        href={`https://wa.me/${selectedInquiry.phone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Chat WhatsApp</span>
                      </a>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-slate-400 block font-bold">Email:</span>
                        <span className="text-slate-800 font-medium break-all">{selectedInquiry.email}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block font-bold">Phone:</span>
                        <span className="text-slate-800 font-medium">{selectedInquiry.phone}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block font-bold">Tour:</span>
                        <span className="text-slate-800 font-semibold">{selectedInquiry.tourName}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block font-bold">Travel Date:</span>
                        <span className="text-slate-800 font-semibold">{selectedInquiry.travelDate}</span>
                      </div>
                    </div>

                    {selectedInquiry.specialRequirements && (
                      <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs">
                        <span className="font-bold text-slate-700 block mb-1">Customer Notes:</span>
                        <p className="text-slate-600">{selectedInquiry.specialRequirements}</p>
                      </div>
                    )}

                    <div className="pt-2 border-t border-slate-200 space-y-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1 uppercase">
                          Update Inquiry Status
                        </label>
                        <select
                          value={inquiryStatus}
                          onChange={(e) => setInquiryStatus(e.target.value as any)}
                          className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs font-bold text-slate-800"
                        >
                          <option value="New">New / Unread</option>
                          <option value="Contacted">Contacted via Phone/WhatsApp</option>
                          <option value="Pending">Pending Payment / Schedule</option>
                          <option value="Confirmed">Confirmed & Booked</option>
                          <option value="Cancelled">Cancelled</option>
                          <option value="Completed">Completed Tour</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1 uppercase">
                          Staff Operations Notes
                        </label>
                        <textarea
                          rows={3}
                          value={adminNote}
                          onChange={(e) => setAdminNote(e.target.value)}
                          placeholder="e.g. Flight booked with Buddha Air, Sherpa guide assigned, hotel deposit confirmed..."
                          className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs text-slate-800"
                        />
                      </div>

                      <button
                        onClick={handleUpdateInquiry}
                        className="w-full bg-[#0b3b95] hover:bg-[#082a6b] text-white font-extrabold text-xs py-2.5 rounded-xl shadow-xs transition-all cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save Status & Operational Notes</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-20 text-xs text-slate-500">
                    Select an inquiry from the left to view customer contact details and update operational status.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: PACKAGES & PRICING */}
          {activeTab === 'packages' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Manage Tour Packages & Pricing in NPR
                  </h4>
                  <span className="text-xs text-slate-500">Base catalog prices stored in Nepalese Rupees (NPR). Visitors see automatic conversion based on selected currency.</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-medium">Visitor Preview:</span>
                  <CurrencySelector variant="compact" />
                </div>
              </div>

              <div className="space-y-3">
                {tourList.map((pkg) => (
                  <div
                    key={pkg.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200/80 gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={pkg.heroImage}
                        alt={pkg.name}
                        className="w-14 h-14 rounded-xl object-cover"
                      />
                      <div>
                        <span className="text-[10px] font-bold text-[#0b3b95] bg-blue-100 px-2 py-0.5 rounded">
                          {pkg.category}
                        </span>
                        <h4 className="text-sm font-extrabold text-slate-900 mt-0.5">
                          {pkg.name}
                        </h4>
                        <span className="text-xs text-slate-500">
                          {pkg.durationDays} Days / {pkg.durationNights} Nights • {pkg.destinations.join(', ')}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-center">
                      {editingTourId === pkg.id ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            value={editingPrice}
                            onChange={(e) => setEditingPrice(Number(e.target.value))}
                            className="w-28 bg-white border border-blue-400 rounded-lg px-2 py-1 text-sm font-bold text-slate-900"
                          />
                          <button
                            onClick={() => handleSaveTourPrice(pkg.id)}
                            className="bg-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg cursor-pointer"
                          >
                            Save
                          </button>
                        </div>
                      ) : (
                        <div className="text-right">
                          <span className="text-base font-black text-[#0b3b95] block">
                            NPR {pkg.priceNpr.toLocaleString()}
                          </span>
                          <span className="text-[11px] text-slate-400 block font-medium">
                            ≈ {formatSecondaryPrice(pkg.priceNpr)}
                          </span>
                          <button
                            onClick={() => {
                              setEditingTourId(pkg.id);
                              setEditingPrice(pkg.priceNpr);
                            }}
                            className="block text-[11px] font-bold text-slate-500 hover:text-[#0b3b95] underline cursor-pointer mt-0.5 ml-auto"
                          >
                            Edit Price
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: AGENCY SETTINGS */}
          {activeTab === 'settings' && (
            <form onSubmit={handleSaveSettings} className="space-y-4 max-w-2xl text-left">
              {settingsSavedSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Agency settings saved successfully to Firestore!</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                    Agency Display Name
                  </label>
                  <input
                    type="text"
                    value={settingsForm.agencyName}
                    onChange={(e) => setSettingsForm({ ...settingsForm, agencyName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs sm:text-sm font-bold text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                    Default Currency Code & Symbol
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={settingsForm.defaultCurrency}
                      onChange={(e) => setSettingsForm({ ...settingsForm, defaultCurrency: e.target.value })}
                      className="w-24 bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs sm:text-sm font-bold text-slate-900"
                    />
                    <input
                      type="text"
                      value={settingsForm.currencySymbol}
                      onChange={(e) => setSettingsForm({ ...settingsForm, currencySymbol: e.target.value })}
                      className="w-20 bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs sm:text-sm font-bold text-slate-900"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                    Official Nepal Phone
                  </label>
                  <input
                    type="text"
                    value={settingsForm.phone}
                    onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs sm:text-sm text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                    WhatsApp Hotline
                  </label>
                  <input
                    type="text"
                    value={settingsForm.whatsapp}
                    onChange={(e) => setSettingsForm({ ...settingsForm, whatsapp: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs sm:text-sm text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                    Support Email
                  </label>
                  <input
                    type="email"
                    value={settingsForm.email}
                    onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs sm:text-sm text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                    Timezone
                  </label>
                  <input
                    type="text"
                    value={settingsForm.timezone}
                    onChange={(e) => setSettingsForm({ ...settingsForm, timezone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs sm:text-sm text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                  Office Physical Address in Kathmandu
                </label>
                <input
                  type="text"
                  value={settingsForm.officeAddress}
                  onChange={(e) => setSettingsForm({ ...settingsForm, officeAddress: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs sm:text-sm text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                  Business & Support Hours
                </label>
                <input
                  type="text"
                  value={settingsForm.businessHours}
                  onChange={(e) => setSettingsForm({ ...settingsForm, businessHours: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs sm:text-sm text-slate-900"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={savingSettings}
                  className="bg-[#0b3b95] hover:bg-[#082a6b] text-white font-extrabold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{savingSettings ? 'Saving to Database...' : 'Save Settings'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
