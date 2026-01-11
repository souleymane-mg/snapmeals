import { Category, Dish, Order, OrderStatus, Reel, Review } from '../shared/types';

export const CATEGORIES: Category[] = [
  { id: '1', name: 'Burger', icon: '🍔' },
  { id: '2', name: 'Pizza', icon: '🍕' },
  { id: '3', name: 'Tacos', icon: '🌮' },
  { id: '4', name: 'Sushi', icon: '🍣' },
  { id: '5', name: 'Salade', icon: '🥗' },
  { id: '6', name: 'Dessert', icon: '🍩' },
];

export const DISHES: Dish[] = [
  {
    id: 'd-tiktok-tacos',
    name: 'Viral Bamako Tacos 🌮',
    price: 8.500,
    rating: 4.9,
    deliveryTime: 25,
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80',
    category: 'Tacos',
    description: 'Le fameux Tacos Bamako vu sur TikTok ! Sauce fromagère secrète, double garniture.',
    calories: 950,
    isAvailable: true,
    // Using a direct MP4 link for native playback test
    videoUrl: 'https://v9.tiktokcdn.com/ed7d01a010ba2c3db5b9de5734468c20/696551ea/video/tos/useast2a/tos-useast2a-pve-0068/og1N9j6IstGjgI1QJELhAfrGAukWDFF8efmRf0/?a=1233&bti=OUBzOTg7QGo6OjZAL3AjLTAzYCMxNDNg&ch=0&cr=13&dr=0&er=0&lr=all&net=0&cd=0%7C0%7C0%7C&cv=1&br=840&bt=420&cs=0&ds=1&ft=iusKbyt4ZZo0PDfFU-faQ94_U~j6JE.C~&mime_type=video_mp4&qs=0&rc=ZTM8PDo8NTg6aWY6OWc8aEBpanQ2aHc5cnFpNDMzNzczM0BhNmNjMGM0XzQxMl9gYy80YSNvc28xMmRrcmdhLS1kMTZzcw%3D%3D&vvpl=1&l=20260112035550435CB1E41C8AFA669892&btag=e00088000&cc=5'
  },
  {
    id: 'd1',
    name: 'Burger Classique',
    price: 17.230,
    rating: 4.9,
    deliveryTime: 25,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    category: 'Burger',
    description: 'Un burger de bœuf classique avec laitue fraîche, tomates et notre sauce secrète.',
    calories: 190,
    isAvailable: true,
    videoUrl: 'https://cdn.coverr.co/videos/coverr-preparing-a-burger-2767/1080p.mp4'
  },
  {
    id: 'd2',
    name: 'Double Cheese Burger',
    price: 18.500,
    rating: 4.8,
    deliveryTime: 30,
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
    category: 'Burger',
    description: 'Double steak haché suprême avec cheddar fondu.',
    calories: 350,
    isAvailable: true
  },
  {
    id: 'd3',
    name: 'Tacos Épicé',
    price: 12.000,
    rating: 4.5,
    deliveryTime: 20,
    image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=800&q=80',
    category: 'Tacos',
    description: 'Trois tacos croustillants garnis de poulet épicé et de salsa.',
    calories: 210,
    isAvailable: true
  },
  {
    id: 'd4',
    name: 'Pizza Margherita',
    price: 22.000,
    rating: 4.7,
    deliveryTime: 45,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80',
    category: 'Pizza',
    description: 'Pizza classique au feu de bois avec basilic et mozzarella.',
    calories: 600,
    isAvailable: true,
    videoUrl: 'https://cdn.coverr.co/videos/coverr-pizza-slicing-5205/1080p.mp4'
  },
  {
    id: 'd5',
    name: 'Sushi Saumon Frais',
    price: 25.000,
    rating: 4.9,
    deliveryTime: 35,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80',
    category: 'Sushi',
    description: 'Nigiri au saumon premium avec wasabi et gingembre mariné.',
    calories: 180,
    isAvailable: true
  },
  {
    id: 'd6',
    name: 'Salade César',
    price: 15.000,
    rating: 4.6,
    deliveryTime: 15,
    image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=800&q=80',
    category: 'Salade',
    description: 'Laitue romaine fraîche avec parmesan, croûtons et sauce César.',
    calories: 150,
    isAvailable: false
  }
];

export const MOCK_ORDERS: Order[] = [
  {
    id: '#XF-203',
    customerName: 'Amadou D.',
    items: [{ dish: DISHES[1], quantity: 1 }],
    total: 17.230,
    status: OrderStatus.PREPARING,
    date: new Date().toISOString()
  },
  {
    id: '#XF-202',
    customerName: 'Fatoumata S.',
    items: [{ dish: DISHES[1], quantity: 1 }, { dish: DISHES[3], quantity: 2 }],
    total: 41.230,
    status: OrderStatus.PENDING,
    date: new Date(Date.now() - 3600000).toISOString()
  },
  {
    id: '#XF-201',
    customerName: 'Moussa T.',
    items: [{ dish: DISHES[2], quantity: 1 }],
    total: 18.500,
    status: OrderStatus.READY,
    date: new Date(Date.now() - 7200000).toISOString()
  },
  {
    id: '#XF-200',
    customerName: 'Jean P.',
    items: [{ dish: DISHES[4], quantity: 1 }],
    total: 22.000,
    status: OrderStatus.DELIVERED,
    date: new Date(Date.now() - 86400000).toISOString()
  }
];

export const MOCK_REELS: Reel[] = [
  // Vide car nous générons les reels à partir de DISHES
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: 'r1',
    userName: 'Fatoumata K.',
    rating: 5,
    date: 'Il y a 2 jours',
    comment: 'C\'était délicieux ! La sauce est incroyable 😍',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'r2',
    userName: 'Moussa D.',
    rating: 4,
    date: 'Il y a 1 semaine',
    comment: 'Très bon mais la livraison était un peu lente.',
    userAvatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100&q=80'
  },
  {
    id: 'r3',
    userName: 'Aissata T.',
    rating: 5,
    date: 'Il y a 3 jours',
    comment: 'Meilleur burger de Bamako, sans hésitation ! 🔥',
  }
];