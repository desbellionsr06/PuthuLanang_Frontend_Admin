/**
 * Domain Models & Types - Puthu Lanang Management System
 */

export type MenuCategory = 'pusaka' | 'paling_laris' | 'besek' | 'paket_campur';

export type OrderStatus = 'Baru' | 'Diproses' | 'Selesai' | 'Dibatalkan';

export type PickupMethod = 'TAKEAWAY_NOW' | 'SCHEDULED_PICKUP';

export interface AdminOrderModel {
  id: string;
  customerName: string;
  itemsSummary: string;
  pickupMethod: PickupMethod;
  pickupTime: string;
  totalPrice: number;
  status: OrderStatus;
  date: string;
}

export interface MenuItemModel {
  id: string;
  name: string;
  category: MenuCategory;
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

export interface AiPredictionData {
  weatherCondition: 'Hujan Sore' | 'Cerah' | 'Mendung';
  isHolidayOrWeekend: boolean;
  predictedDemandMultiplier: number;
  recommendedCoconutDoughKg: number;
  recommendedPalmSugarLiters: number;
  confidenceScore: number;
}

export interface AdminProfile {
  username: string;
  role: 'superadmin' | 'kitchen_manager';
  outletLocation: string;
}
