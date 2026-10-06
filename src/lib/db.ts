export interface MenuItem {
  id: string;
  name: string;
  category: 'pusaka' | 'paling_laris' | 'besek' | 'paket_campur';
  description: string;
  portionDetails: string;
  price: number;
  rating: number;
  reviewsCount: number;
  image: string;
  ingredients: string[];
  allergens: string[];
  isAvailable: boolean;
  stockRemaining: number;
  preparationTimeMins: number;
}

export interface OrderItem {
  menuId: string;
  name: string;
  quantity: number;
  price: number;
  notes?: string;
}

export interface Order {
  id: string;
  userId: string;
  customerName: string;
  customerPhone: string;
  items: OrderItem[];
  totalPrice: number;
  pickupType: 'TAKEAWAY_NOW' | 'SCHEDULED_PICKUP';
  pickupDate: string;
  pickupTimeSlot: string;
  paymentMethod: string;
  paymentStatus: 'PAID' | 'PENDING';
  kitchenStatus: 'QUEUED_IN_KITCHEN' | 'STEAMING_BAMBOO' | 'READY_FOR_PICKUP' | 'COMPLETED';
  qrCodeToken: string;
  createdAt: string;
}

export interface CustomEventOrder {
  id: string;
  eventDate: string;
  pickupTime: string;
  packageType: string;
  packagePrice: number;
  compositionRatio: {
    puthu: number;
    klepon: number;
    cenil: number;
    lupis: number;
  };
  customerContact: {
    name: string;
    phone: string;
    institution?: string;
  };
  notes?: string;
  status: 'SUBMITTED' | 'CONFIRMED' | 'IN_PREPARATION';
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  phone: string;
  passwordHash: string;
  createdAt: string;
}

// In-Memory Database Catalog
export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'puthu-01',
    name: 'Puthu',
    category: 'pusaka',
    description: 'Puthu beras pandan suji berongga bambu isi gula kelapa aren cair melimpah, dikukus dalam tabung bambu clungup dan disajikan hangat dengan taburan kelapa gurih.',
    portionDetails: '5 pcs / porsi',
    price: 18000,
    rating: 4.9,
    reviewsCount: 342,
    image: '/images/puthu_bambu.png',
    ingredients: ['Tepung Beras Pandan Suji', 'Gula Aren Murni Trenggalek', 'Kelapa Parut Kukus', 'Garam Laut'],
    allergens: ['Bebas Gluten / Bebas Bahan Pengawet'],
    isAvailable: true,
    stockRemaining: 120,
    preparationTimeMins: 10
  },
  {
    id: 'klepon-02',
    name: 'Klepon',
    category: 'paling_laris',
    description: 'Bulatan ketan hijau kenyal dengan ledakan gula aren cair kental beraroma pandan murni yang meletus segar di dalam mulut.',
    portionDetails: '8 pcs / porsi',
    price: 18000,
    rating: 4.9,
    reviewsCount: 428,
    image: '/images/klepon_pandan.png',
    ingredients: ['Tepung Ketan Murni', 'Daun Suji & Pandan Wangi', 'Gula Aren Organik', 'Kelapa Muda Parut'],
    allergens: ['Bebas Bahan Pengawet & Pewarna Buatan'],
    isAvailable: true,
    stockRemaining: 95,
    preparationTimeMins: 8
  },
  {
    id: 'cenil-03',
    name: 'Cenil',
    category: 'pusaka',
    description: 'Jajanan pati singkong warna-warni bertekstur legit, disiram kuah kinca kental gula aren murni dan taburan kelapa parut segar.',
    portionDetails: '1 Piring Komplit',
    price: 18000,
    rating: 4.8,
    reviewsCount: 215,
    image: '/images/cenil_pelangi.png',
    ingredients: ['Tepung Tapioka Garut', 'Ekstrak Bunga Telang & Suji', 'Juruh Gula Aren Pekat', 'Kelapa Parut Gurih'],
    allergens: ['Bebas Gluten / Glukosa Organik'],
    isAvailable: true,
    stockRemaining: 80,
    preparationTimeMins: 5
  },
  {
    id: 'lupis-04',
    name: 'Lupis',
    category: 'pusaka',
    description: 'Beras ketan putih padat legit berbungkus daun pisang, diselimuti kelapa parut dan diguyur juruh gula kelapa pekat.',
    portionDetails: '3 potong segitiga',
    price: 18000,
    rating: 4.9,
    reviewsCount: 389,
    image: '/images/lupis_ketan.png',
    ingredients: ['Beras Ketan Putih Super', 'Daun Pisang Kepok Alami', 'Kelapa Parut Fresh', 'Juruh Aren Murni'],
    allergens: ['Bebas Bahan Pengawet'],
    isAvailable: true,
    stockRemaining: 65,
    preparationTimeMins: 5
  },
  {
    id: 'paket-campur-05',
    name: 'Paket Campur',
    category: 'paket_campur',
    description: 'Kombinasi favorit komplit perpaduan Puthu bambu, Klepon lumer, Cenil kenyal, dan Lupis ketan gurih dalam 1 porsi box beralas daun pisang.',
    portionDetails: '1 Porsi = 2 Puthu + 3 Klepon + 3 Cenil + 2 Lupis',
    price: 20000,
    rating: 5.0,
    reviewsCount: 610,
    image: '/images/paket_tampah.png',
    ingredients: ['4 Varian Legendaris', 'Juruh Aren Ekstra', 'Kelapa Kukus Daun Pandan'],
    allergens: ['Bebas Pewarna Sintetis'],
    isAvailable: true,
    stockRemaining: 150,
    preparationTimeMins: 12
  },
  {
    id: 'besek-hampers-06',
    name: 'Box Besek Bambu Hampers',
    category: 'besek',
    description: 'Kemasan besek bambu tradisional ramah lingkungan isi 2 porsi campur komplit + botol mini juruh gula aren murni.',
    portionDetails: 'Box Besek Bambu + Kendil Juruh Mini',
    price: 45000,
    rating: 5.0,
    reviewsCount: 185,
    image: '/images/paket_tampah.png',
    ingredients: ['2 Porsi Campur Komplit', 'Botol Juruh Aren Murni 100ml', 'Pita Besek Mataraman'],
    allergens: ['Ramah Lingkungan 100% Organik'],
    isAvailable: true,
    stockRemaining: 40,
    preparationTimeMins: 15
  }
];

// Initial Mock Data
export const users: User[] = [
  {
    id: 'user-demo-01',
    name: 'Budi Santoso',
    phone: '081234567890',
    passwordHash: 'password123',
    createdAt: new Date().toISOString()
  }
];

export const orders: Order[] = [
  {
    id: 'ORD-93501',
    userId: 'user-demo-01',
    customerName: 'Budi Santoso',
    customerPhone: '081234567890',
    items: [
      { menuId: 'paket-campur-05', name: 'Paket Campur', quantity: 2, price: 20000, notes: 'Ekstra juruh aren' },
      { menuId: 'puthu-01', name: 'Puthu', quantity: 1, price: 18000 }
    ],
    totalPrice: 58000,
    pickupType: 'SCHEDULED_PICKUP',
    pickupDate: '2026-09-30',
    pickupTimeSlot: '18:00 - 18:30 WIB',
    paymentMethod: 'QRIS',
    paymentStatus: 'PAID',
    kitchenStatus: 'STEAMING_BAMBOO',
    qrCodeToken: 'PUTHU-CELAKET-93501-VERIFIED',
    createdAt: new Date().toISOString()
  }
];

export const customEventOrders: CustomEventOrder[] = [];
