import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User,
  Auth
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  query, 
  orderBy, 
  setDoc,
  Firestore
} from 'firebase/firestore';
import type { BookingInquiry, AgencySettings } from '../types';

// Import config
import firebaseConfigJson from '../../firebase-applet-config.json';

const firebaseConfig = {
  apiKey: firebaseConfigJson.apiKey,
  authDomain: firebaseConfigJson.authDomain,
  projectId: firebaseConfigJson.projectId,
  storageBucket: firebaseConfigJson.storageBucket,
  messagingSenderId: firebaseConfigJson.messagingSenderId,
  appId: firebaseConfigJson.appId,
};

let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

export const auth: Auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// If custom firestoreDatabaseId is provided, use it, else default
export const db: Firestore = firebaseConfigJson.firestoreDatabaseId && firebaseConfigJson.firestoreDatabaseId !== '(default)'
  ? getFirestore(app, firebaseConfigJson.firestoreDatabaseId)
  : getFirestore(app);

// Auth Helpers
export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error: any) {
    console.error("Google login error:", error);
    throw error;
  }
};

export const signInWithGooglePopup = loginWithGoogle;

export const signInWithEmailPassword = async (email: string, pass: string) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, pass);
    return res.user;
  } catch (error) {
    console.error("Email login error:", error);
    throw error;
  }
};

export const registerWithEmailPassword = async (email: string, pass: string, displayName?: string) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, pass);
    return res.user;
  } catch (error) {
    console.error("Register error:", error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Sign out error:", error);
  }
};

export const logOutUser = logoutUser;

export const onAuthChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

export { onAuthStateChanged };
export type { User };

// Firestore Helpers with robust local storage fallback
const LOCAL_INQUIRIES_KEY = 'nepalvoyage_inquiries';
const LOCAL_FAVORITES_KEY = 'nepalvoyage_favorites';
const LOCAL_SETTINGS_KEY = 'travelwitharjun_agency_settings_v3';

export const submitBookingInquiry = async (inquiry: Omit<BookingInquiry, 'id' | 'createdAt' | 'status'>): Promise<BookingInquiry> => {
  const newInquiry: BookingInquiry = {
    ...inquiry,
    id: 'inq_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    createdAt: new Date().toISOString(),
    status: 'New',
  };

  try {
    const docRef = await addDoc(collection(db, 'inquiries'), {
      ...newInquiry,
      timestamp: new Date().toISOString(),
    });
    newInquiry.id = docRef.id;
  } catch (err) {
    console.warn("Firestore save warning (fallback to local cache):", err);
  }

  // Always save to local cache for instant viewing & offline reliability
  try {
    const existing = JSON.parse(localStorage.getItem(LOCAL_INQUIRIES_KEY) || '[]');
    localStorage.setItem(LOCAL_INQUIRIES_KEY, JSON.stringify([newInquiry, ...existing]));
  } catch (e) {
    console.error("Local storage error:", e);
  }

  return newInquiry;
};

export const fetchAllInquiries = async (): Promise<BookingInquiry[]> => {
  let list: BookingInquiry[] = [];
  try {
    const q = query(collection(db, 'inquiries'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    snapshot.forEach((d) => {
      const data = d.data() as BookingInquiry;
      list.push({ ...data, id: d.id });
    });
  } catch (err) {
    console.warn("Firestore fetch warning, using local cache:", err);
  }

  if (list.length === 0) {
    try {
      list = JSON.parse(localStorage.getItem(LOCAL_INQUIRIES_KEY) || '[]');
    } catch (e) {
      list = [];
    }
  }

  return list;
};

export const updateInquiryStatusInDb = async (inquiryId: string, status: BookingInquiry['status'], adminNotes?: string) => {
  try {
    const docRef = doc(db, 'inquiries', inquiryId);
    await updateDoc(docRef, { status, adminNotes: adminNotes || '' });
  } catch (e) {
    console.warn("Firestore update warning (updating local cache):", e);
  }

  // Update in local cache
  try {
    const existing: BookingInquiry[] = JSON.parse(localStorage.getItem(LOCAL_INQUIRIES_KEY) || '[]');
    const updated = existing.map(item => {
      if (item.id === inquiryId) {
        return { ...item, status, adminNotes: adminNotes ?? item.adminNotes };
      }
      return item;
    });
    localStorage.setItem(LOCAL_INQUIRIES_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error(e);
  }
};

export const updateInquiryStatus = updateInquiryStatusInDb;

export const getSavedFavorites = (): string[] => {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_FAVORITES_KEY) || '["ebc-trek", "pokhara-adventure", "chitwan-safari"]');
  } catch {
    return ["ebc-trek", "pokhara-adventure"];
  }
};

export const toggleSavedFavorite = (tourId: string): string[] => {
  try {
    const current = getSavedFavorites();
    let updated: string[];
    if (current.includes(tourId)) {
      updated = current.filter(id => id !== tourId);
    } else {
      updated = [...current, tourId];
    }
    localStorage.setItem(LOCAL_FAVORITES_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
};

export const fetchAgencySettings = async (defaultSettings: AgencySettings): Promise<AgencySettings> => {
  try {
    const docRef = doc(db, 'settings', 'agency');
    const snapshot = await getDocs(collection(db, 'settings'));
    let found: any = null;
    snapshot.forEach(d => {
      if (d.id === 'agency') found = d.data();
    });
    if (found) return { ...defaultSettings, ...found };
  } catch (e) {
    console.warn("Could not fetch remote settings, using local/default:", e);
  }

  try {
    const local = localStorage.getItem(LOCAL_SETTINGS_KEY);
    if (local) return { ...defaultSettings, ...JSON.parse(local) };
  } catch (e) {}

  return defaultSettings;
};

export const saveAgencySettingsToDb = async (settings: AgencySettings): Promise<void> => {
  try {
    await setDoc(doc(db, 'settings', 'agency'), settings);
  } catch (e) {
    console.warn("Firestore settings update fallback to local:", e);
  }
  try {
    localStorage.setItem(LOCAL_SETTINGS_KEY, JSON.stringify(settings));
  } catch (e) {}
};

export const saveAgencySettings = saveAgencySettingsToDb;

export const getAgencySettings = async (defaultSettings?: AgencySettings): Promise<AgencySettings | null> => {
  try {
    const fallback: AgencySettings = defaultSettings || {
      agencyName: 'Travel with Arjun',
      tagline: 'Explore. Dream. Discover. Travel Around the World & Nepal.',
      officeAddress: 'Tridevi Marg, Thamel, Kathmandu 44600, Nepal',
      city: 'Kathmandu',
      district: 'Kathmandu',
      country: 'Nepal',
      phone: '+1 2014745227',
      whatsapp: '+1 2014745227',
      email: 'info@digitalarzoon.com',
      businessHours: 'Sun – Fri: 8:00 AM – 7:00 PM (NPT)',
      timezone: 'Asia/Kathmandu (+05:45)',
      defaultCurrency: 'NPR',
      currencySymbol: 'NPR',
      countryCode: '+1',
      aboutText: 'Travel with Arjun offers world tour packages and Himalayan adventures with transparent pricing in Nepalese Rupees (NPR).',
      emergencyContact: '+1 2014745227 (24/7 Hotline)',
      tourismBoardLicense: 'Govt. License: NTB-4821',
      taanMemberNo: 'TAAN Member #1029'
    };
    return await fetchAgencySettings(fallback);
  } catch (e) {
    return null;
  }
};
