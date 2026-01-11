export enum UserRole {
  CLIENT = 'CLIENT',
  RESTAURATEUR = 'RESTAURATEUR',
  ADMIN = 'ADMIN'
}

export enum OrderStatus {
  PENDING = 'En attente',
  PREPARING = 'En preparation',
  READY = 'Prete',
  DELIVERED = 'Livree'
}

export interface Dish {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  deliveryTime: number; // in minutes
  calories?: number;
  category: string;
  description?: string;
  isAvailable?: boolean;
  videoUrl?: string; // URL for the video (MP4)
}

export interface OrderItem {
  dish: Dish;
  quantity: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  date: string; // ISO string
  customerName: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string; // Emoji or icon name
}

export interface SalesStat {
  name: string;
  sales: number;
}

export interface Reel {
  id: string;
  videoUrl: string; // Direct MP4 URL
  title: string;
  chefName: string;
  likes: number;
  comments: number;
  dishId?: string; // Link to order the dish directly
  price: number;
  description: string;
}

export interface Review {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  comment: string;
  image?: string;
}