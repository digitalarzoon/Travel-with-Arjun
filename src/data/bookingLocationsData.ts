export interface FlightLocation {
  id: string;
  code: string;
  city: string;
  airport: string;
  country: string;
  type: 'domestic' | 'international';
  popular?: boolean;
}

export interface HotelLocation {
  id: string;
  city: string;
  area: string;
  label: string;
  popular?: boolean;
}

export interface TourDestination {
  id: string;
  name: string;
  region: string;
  tagline: string;
  popular?: boolean;
}

export interface WaterExperience {
  id: string;
  name: string;
  location: string;
  type: string;
  duration: string;
  priceNpr: number;
  highlight: string;
  popular?: boolean;
}

export interface CarLocation {
  id: string;
  name: string;
  district: string;
  popular?: boolean;
}

export interface VehicleType {
  id: string;
  name: string;
  category: string;
  capacity: string;
  luggage: string;
  terrain: string;
  basePriceNprPerDay: number;
  popular?: boolean;
}

export const FLIGHT_LOCATIONS: FlightLocation[] = [
  // Nepal Domestic Major Airports
  {
    id: 'ktm',
    code: 'KTM',
    city: 'Kathmandu',
    airport: 'Tribhuvan International Airport',
    country: 'Nepal',
    type: 'domestic',
    popular: true,
  },
  {
    id: 'pkr',
    code: 'PKR',
    city: 'Pokhara',
    airport: 'Pokhara International Airport',
    country: 'Nepal',
    type: 'domestic',
    popular: true,
  },
  {
    id: 'bhr',
    code: 'BHR',
    city: 'Bharatpur',
    airport: 'Bharatpur Airport (Chitwan)',
    country: 'Nepal',
    type: 'domestic',
    popular: true,
  },
  {
    id: 'bwa',
    code: 'BWA',
    city: 'Bhairahawa',
    airport: 'Gautam Buddha International Airport (Lumbini)',
    country: 'Nepal',
    type: 'domestic',
    popular: true,
  },
  {
    id: 'kep',
    code: 'KEP',
    city: 'Nepalgunj',
    airport: 'Nepalgunj Airport',
    country: 'Nepal',
    type: 'domestic',
    popular: false,
  },
  {
    id: 'bir',
    code: 'BIR',
    city: 'Biratnagar',
    airport: 'Biratnagar Airport',
    country: 'Nepal',
    type: 'domestic',
    popular: false,
  },
  {
    id: 'dhi',
    code: 'DHI',
    city: 'Dhangadhi',
    airport: 'Dhangadhi Airport',
    country: 'Nepal',
    type: 'domestic',
    popular: false,
  },
  {
    id: 'jkr',
    code: 'JKR',
    city: 'Janakpur',
    airport: 'Janakpur Airport',
    country: 'Nepal',
    type: 'domestic',
    popular: false,
  },
  {
    id: 'sif',
    code: 'SIF',
    city: 'Simara',
    airport: 'Simara Airport',
    country: 'Nepal',
    type: 'domestic',
    popular: false,
  },
  {
    id: 'bdp',
    code: 'BDP',
    city: 'Bhadrapur',
    airport: 'Bhadrapur Airport (Jhapa)',
    country: 'Nepal',
    type: 'domestic',
    popular: false,
  },
  {
    id: 'tmi',
    code: 'TMI',
    city: 'Tumlingtar',
    airport: 'Tumlingtar Airport (Makalu Region)',
    country: 'Nepal',
    type: 'domestic',
    popular: false,
  },
  {
    id: 'lua',
    code: 'LUA',
    city: 'Lukla',
    airport: 'Tenzing-Hillary Airport (Everest Gateway)',
    country: 'Nepal',
    type: 'domestic',
    popular: true,
  },
  {
    id: 'jmo',
    code: 'JMO',
    city: 'Jomsom',
    airport: 'Jomsom Airport (Mustang Gateway)',
    country: 'Nepal',
    type: 'domestic',
    popular: true,
  },

  // Major International Airports (Inbound & Outbound for Nepal)
  {
    id: 'del',
    code: 'DEL',
    city: 'Delhi',
    airport: 'Indira Gandhi International Airport',
    country: 'India',
    type: 'international',
    popular: true,
  },
  {
    id: 'bom',
    code: 'BOM',
    city: 'Mumbai',
    airport: 'Chhatrapati Shivaji Maharaj International Airport',
    country: 'India',
    type: 'international',
    popular: true,
  },
  {
    id: 'dxb',
    code: 'DXB',
    city: 'Dubai',
    airport: 'Dubai International Airport',
    country: 'UAE',
    type: 'international',
    popular: true,
  },
  {
    id: 'doh',
    code: 'DOH',
    city: 'Doha',
    airport: 'Hamad International Airport',
    country: 'Qatar',
    type: 'international',
    popular: true,
  },
  {
    id: 'bkk',
    code: 'BKK',
    city: 'Bangkok',
    airport: 'Suvarnabhumi Airport',
    country: 'Thailand',
    type: 'international',
    popular: true,
  },
  {
    id: 'sin',
    code: 'SIN',
    city: 'Singapore',
    airport: 'Singapore Changi Airport',
    country: 'Singapore',
    type: 'international',
    popular: true,
  },
  {
    id: 'kul',
    code: 'KUL',
    city: 'Kuala Lumpur',
    airport: 'Kuala Lumpur International Airport',
    country: 'Malaysia',
    type: 'international',
    popular: true,
  },
  {
    id: 'lhr',
    code: 'LHR',
    city: 'London',
    airport: 'London Heathrow Airport',
    country: 'UK',
    type: 'international',
    popular: true,
  },
  {
    id: 'jfk',
    code: 'JFK',
    city: 'New York',
    airport: 'John F. Kennedy International Airport',
    country: 'USA',
    type: 'international',
    popular: true,
  },
  {
    id: 'syd',
    code: 'SYD',
    city: 'Sydney',
    airport: 'Sydney Kingsford Smith Airport',
    country: 'Australia',
    type: 'international',
    popular: true,
  },
  {
    id: 'ist',
    code: 'IST',
    city: 'Istanbul',
    airport: 'Istanbul Airport',
    country: 'Turkey',
    type: 'international',
    popular: true,
  },
  {
    id: 'hkg',
    code: 'HKG',
    city: 'Hong Kong',
    airport: 'Hong Kong International Airport',
    country: 'Hong Kong',
    type: 'international',
    popular: true,
  },
  {
    id: 'nrt',
    code: 'NRT',
    city: 'Tokyo (Narita)',
    airport: 'Narita International Airport',
    country: 'Japan',
    type: 'international',
    popular: true,
  },
  {
    id: 'hnd',
    code: 'HND',
    city: 'Tokyo (Haneda)',
    airport: 'Tokyo Haneda Airport',
    country: 'Japan',
    type: 'international',
    popular: false,
  },
];

// Hotels — strictly Nepal only
export const NEPAL_HOTEL_LOCATIONS: HotelLocation[] = [
  { id: 'ktm-all', city: 'Kathmandu', area: 'Thamel, Durbar Marg & Boudha', label: 'Kathmandu, Nepal', popular: true },
  { id: 'pkr-all', city: 'Pokhara', area: 'Lakeside & Sarangkot Viewpoints', label: 'Pokhara, Nepal', popular: true },
  { id: 'chitwan-all', city: 'Chitwan', area: 'Sauraha & National Park Buffer Zone', label: 'Sauraha, Chitwan, Nepal', popular: true },
  { id: 'nagarkot-all', city: 'Nagarkot', area: 'Sunrise Ridge & Panoramic Mountain Resorts', label: 'Nagarkot, Nepal', popular: true },
  { id: 'lumbini-all', city: 'Lumbini', area: 'Sacred Garden & Monastic Zone', label: 'Lumbini, Nepal', popular: true },
  { id: 'bandipur-all', city: 'Bandipur', area: 'Historic Newari Hilltop Settlement', label: 'Bandipur, Nepal', popular: true },
  { id: 'dhulikhel-all', city: 'Dhulikhel', area: 'Arniko Highway & Himalayan Overlooks', label: 'Dhulikhel, Nepal', popular: true },
  { id: 'everest-all', city: 'Everest / Khumbu', area: 'Namche Bazaar & Lukla Mountain Lodges', label: 'Everest / Khumbu, Nepal', popular: true },
  { id: 'mustang-all', city: 'Mustang', area: 'Jomsom, Kagbeni & Lo Manthang', label: 'Mustang, Nepal', popular: true },
  { id: 'manang-all', city: 'Manang', area: 'Annapurna Circuit Valley', label: 'Manang, Nepal', popular: false },
  { id: 'bhaktapur-all', city: 'Bhaktapur', area: 'Durbar Square & Pottery Square Heritage Inns', label: 'Bhaktapur, Nepal', popular: false },
  { id: 'lalitpur-all', city: 'Lalitpur', area: 'Patan Durbar Square & Jhamsikhel', label: 'Lalitpur, Nepal', popular: false },
  { id: 'janakpur-all', city: 'Janakpur', area: 'Janaki Temple & Mithila Heritage', label: 'Janakpur, Nepal', popular: false },
  { id: 'ilam-all', city: 'Ilam', area: 'Kanyam Tea Gardens & Antu Danda', label: 'Ilam, Nepal', popular: false },
  { id: 'nepalgunj-all', city: 'Nepalgunj', area: 'City Center & Bardia Gateway', label: 'Nepalgunj, Nepal', popular: false },
  { id: 'biratnagar-all', city: 'Biratnagar', area: 'Eastern Commercial Hub', label: 'Biratnagar, Nepal', popular: false },
  { id: 'butwal-all', city: 'Butwal', area: 'Tinau River & Lumbini Crossroads', label: 'Butwal, Nepal', popular: false },
  { id: 'dharan-all', city: 'Dharan', area: 'Bhedetar Foothills & Eastern Gateway', label: 'Dharan, Nepal', popular: false },
];

// Tour Packages — strictly Nepal only
export const NEPAL_TOUR_DESTINATIONS: TourDestination[] = [
  { id: 'ktm-pkr-chitwan', name: 'Kathmandu · Pokhara · Chitwan', region: 'Golden Triangle', tagline: 'Culture, Lakes & Jungle Safari', popular: true },
  { id: 'ebc', name: 'Everest Base Camp & Kala Patthar', region: 'Khumbu', tagline: 'Legendary High Himalaya Trek', popular: true },
  { id: 'abc', name: 'Annapurna Base Camp Sanctuary', region: 'Annapurna', tagline: '360° Amphitheater of Snow Peaks', popular: true },
  { id: 'poon-hill', name: 'Ghorepani / Poon Hill Sunrise', region: 'Annapurna', tagline: 'Rhododendron Forest & Dhaulagiri Dawn', popular: true },
  { id: 'mardi', name: 'Mardi Himal Scenic Ridge', region: 'Annapurna', tagline: 'Intimate Machapuchare Vistas', popular: true },
  { id: 'mustang', name: 'Upper Mustang Kingdom of Lo', region: 'Rain Shadow', tagline: 'Ancient Walled Cities & Red Canyons', popular: true },
  { id: 'manang-tilicho', name: 'Manang & Tilicho Lake', region: 'Annapurna Circuit', tagline: 'Highest Altitude Glacial Lake', popular: false },
  { id: 'langtang', name: 'Langtang Valley & Kyanjin Gompa', region: 'Central Himalaya', tagline: 'Tamang Heritage & Glacial Valleys', popular: false },
  { id: 'nagarkot-bandipur', name: 'Nagarkot & Bandipur Hill Retreat', region: 'Central Ridge', tagline: 'Medieval Newari Streets & Sunrise', popular: true },
  { id: 'lumbini-pilgrimage', name: 'Lumbini & Buddhist Heritage Circuit', region: 'Terai', tagline: 'Birthplace of Lord Buddha', popular: true },
  { id: 'rara-lake', name: 'Rara Lake Untamed Wilds', region: 'Karnali West', tagline: 'Queen of Nepal Alpine Lakes', popular: false },
  { id: 'khaptad', name: 'Khaptad Plateau National Park', region: 'Far-West', tagline: 'Rolling Meadows & Meditation Shrines', popular: false },
  { id: 'gosaikunda', name: 'Gosaikunda Sacred Alpine Lakes', region: 'Langtang', tagline: 'Holy Shiva Glacial Lakes at 4,380m', popular: false },
  { id: 'ilam-tea', name: 'Ilam Tea Garden Trails', region: 'Eastern Hills', tagline: 'Rolling Tea Hills & Kanchenjunga Vistas', popular: false },
  { id: 'janakpur-mithila', name: 'Janakpurdham Cultural Odyssey', region: 'Mithila', tagline: 'Janaki Temple & Living Folk Art', popular: false },
  { id: 'tansen-palpa', name: 'Tansen Palpa & Rani Mahal', region: 'Western Hills', tagline: 'Taj Mahal of Nepal on Kali Gandaki', popular: false },
  { id: 'dhorpatan', name: 'Dhorpatan Hunting Reserve', region: 'Dhaulagiri', tagline: 'Blue Sheep & Pristine High Steppes', popular: false },
];

// Cruises / Water Experiences — strictly Nepal only (Freshwater lakes & rivers)
export const NEPAL_WATER_EXPERIENCES: WaterExperience[] = [
  {
    id: 'phewa-boating',
    name: 'Phewa Lake Traditional Boating — Pokhara',
    location: 'Lakeside, Pokhara',
    type: 'Wooden Doonga Boat & Kayak',
    duration: '1 to 3 Hours',
    priceNpr: 1200,
    highlight: 'Sail to Tal Barahi Island Temple with stunning Annapurna reflections on calm waters.',
    popular: true,
  },
  {
    id: 'begnas-boating',
    name: 'Begnas Lake Peaceful Rowing — Pokhara',
    location: 'Begnas Lake, Pokhara Valley',
    type: 'Quiet Eco-Rowing Boat',
    duration: '2 Hours',
    priceNpr: 1500,
    highlight: 'A serene freshwater retreat surrounded by lush terraced hills away from city crowds.',
    popular: true,
  },
  {
    id: 'rapti-canoe',
    name: 'Rapti River Dugout Canoe Safari — Chitwan',
    location: 'Sauraha, Chitwan National Park',
    type: 'Traditional Dugout Canoe',
    duration: '45 Minutes to 1.5 Hours',
    priceNpr: 2500,
    highlight: 'Silent river glide observing endangered fish-eating Gharials and exotic migratory birds.',
    popular: true,
  },
  {
    id: 'narayani-cruise',
    name: 'Narayani River Scenic Boat Safari — Chitwan',
    location: 'Meghauli / Nawalpur, Chitwan',
    type: 'Motorized River Safari & Sunset Drift',
    duration: '2 to 3 Hours',
    priceNpr: 3500,
    highlight: 'Spacious flat-bottom boat cruise along the wide Narayani River with sunset drinks.',
    popular: true,
  },
  {
    id: 'rara-boating',
    name: 'Rara Lake Alpine Boat Expedition — Mugu',
    location: 'Rara National Park (2,990m)',
    type: 'High-Altitude Alpine Lake Boat',
    duration: '1 to 2 Hours',
    priceNpr: 2800,
    highlight: 'Paddle across crystal-clear deep blue waters surrounded by pine and juniper forests.',
    popular: false,
  },
  {
    id: 'trishuli-scenic-float',
    name: 'Trishuli River Scenic Float & Drift',
    location: 'Chharaundi to Kurintar',
    type: 'Scenic Inflatable Raft Float',
    duration: 'Half Day (3 Hours)',
    priceNpr: 3200,
    highlight: 'Gentle river gorge floating with scenic limestone cliffs and sandy riverside beaches.',
    popular: false,
  },
];

// Car Rentals — strictly Nepal only
export const NEPAL_CAR_LOCATIONS: CarLocation[] = [
  { id: 'ktm', name: 'Kathmandu', district: 'Bagmati Province (TIA Airport / Thamel)', popular: true },
  { id: 'pkr', name: 'Pokhara', district: 'Gandaki Province (Lakeside / Airport)', popular: true },
  { id: 'chitwan', name: 'Chitwan / Bharatpur', district: 'Bagmati Province (Sauraha / Airport)', popular: true },
  { id: 'bwa', name: 'Bhairahawa / Gautam Buddha', district: 'Lumbini Province (Airport)', popular: true },
  { id: 'lumbini', name: 'Lumbini', district: 'Lumbini Province (Monastic Zone)', popular: true },
  { id: 'nagarkot', name: 'Nagarkot', district: 'Bhaktapur / Ridge', popular: true },
  { id: 'dhulikhel', name: 'Dhulikhel', district: 'Kavrepalanchok', popular: false },
  { id: 'nepalgunj', name: 'Nepalgunj', district: 'Banke (Bardia Gateway)', popular: false },
  { id: 'biratnagar', name: 'Biratnagar', district: 'Morang (Koshi Province)', popular: false },
  { id: 'janakpur', name: 'Janakpur', district: 'Dhanusha (Madhesh Province)', popular: false },
  { id: 'dharan', name: 'Dharan', district: 'Sunsari Foothills', popular: false },
  { id: 'butwal', name: 'Butwal', district: 'Rupandehi', popular: false },
];

export const NEPAL_VEHICLE_TYPES: VehicleType[] = [
  {
    id: 'economy',
    name: 'Economy Hatchback (Suzuki Alto / WagonR)',
    category: 'Economy',
    capacity: '3-4 Passengers',
    luggage: '2 Small Bags',
    terrain: 'City roads & paved highways',
    basePriceNprPerDay: 4500,
    popular: true,
  },
  {
    id: 'sedan',
    name: 'Comfort Sedan (Hyundai Accent / Suzuki Dzire)',
    category: 'Sedan',
    capacity: '4 Passengers',
    luggage: '2 Large + 1 Small Bag',
    terrain: 'Inter-city highways (KTM-PKR-Chitwan)',
    basePriceNprPerDay: 6000,
    popular: true,
  },
  {
    id: 'suv',
    name: 'Premium SUV (Hyundai Creta / Toyota Fortuner)',
    category: 'SUV',
    capacity: '5-7 Passengers',
    luggage: '4 Large Bags',
    terrain: 'Hilly terrain, Nagarkot & Bandipur ridges',
    basePriceNprPerDay: 9500,
    popular: true,
  },
  {
    id: 'jeep-4wd',
    name: '4WD Mountain Jeep (Mahindra Scorpio / Land Cruiser)',
    category: '4WD Off-Road',
    capacity: '6-8 Passengers',
    luggage: 'Heavy Luggage / Backpacks',
    terrain: 'Mustang, Manang, Upper Hills & Rugged Trails',
    basePriceNprPerDay: 13500,
    popular: true,
  },
  {
    id: 'van-hiace',
    name: 'Tourist Van (Toyota HiAce Super Custom)',
    category: 'Van',
    capacity: '10-14 Passengers',
    luggage: '8-10 Bags',
    terrain: 'Family & Group tours across Nepal',
    basePriceNprPerDay: 11000,
    popular: true,
  },
  {
    id: 'coaster',
    name: 'Tourist Coaster Bus (Toyota Coaster / Rosa)',
    category: 'Mini Coach',
    capacity: '20-25 Passengers',
    luggage: 'Large Luggage Compartment',
    terrain: 'Highways & major tourist corridors',
    basePriceNprPerDay: 18000,
    popular: false,
  },
  {
    id: 'driver-chauffeur',
    name: 'Dedicated Private Car with Experienced Mountain Driver',
    category: 'Chauffeur Driven',
    capacity: 'Customized',
    luggage: 'Flexible',
    terrain: 'All Nepal routes with fuel, tolls & driver stay included',
    basePriceNprPerDay: 8500,
    popular: true,
  },
];
