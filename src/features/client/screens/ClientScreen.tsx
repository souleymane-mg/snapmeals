
import React, { useState } from 'react';
import { Home, Video, User, ShoppingBag, Search, Sparkles, CheckCircle2 } from 'lucide-react';
import { Dish, OrderItem } from '../../../types';
import GeminiChef from '../../ai/components/GeminiChef';
import ReelsScreen from '../../reels/screens/ReelsScreen';
import DishDetailScreen from '../../menu/screens/DishDetailScreen';
import CartScreen from '../../cart/screens/CartScreen';
import OrderHistoryScreen from '../../orders/screens/OrderHistoryScreen';
import ProfileScreen from '../../profile/screens/ProfileScreen';
import HomeScreen from '../../home/screens/HomeScreen';
import SearchScreen from '../../search/screens/SearchScreen';

interface ClientScreenProps {
  onLogout: () => void;
  dishes: Dish[];
}

// Add 'Search' to Tab type
type Tab = 'Home' | 'Search' | 'Reels' | 'Cart' | 'Profile';
type ViewState = 'Tab' | 'DishDetail' | 'Cart';

const ClientScreen: React.FC<ClientScreenProps> = ({ onLogout, dishes }) => {
  const [activeTab, setActiveTab] = useState<Tab>('Home');
  const [viewState, setViewState] = useState<ViewState>('Tab');
  const [showAiChef, setShowAiChef] = useState(false);
  const [cart, setCart] = useState<OrderItem[]>([]);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  
  // Toast Notification State
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  
  // Interactivity States
  const [favorites, setFavorites] = useState<string[]>([]);
  
  // Search State passed between Home and Search views
  const [searchParams, setSearchParams] = useState<{ query?: string; category?: string }>({});
  
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleDishClick = (dish: Dish) => {
    setSelectedDish(dish);
    setViewState('DishDetail');
  };

  const showToast = (msg: string) => {
      setToastMsg(msg);
      setTimeout(() => setToastMsg(null), 2500);
  };

  const handleAddToCart = (dish: Dish, quantity: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.dish.id === dish.id);
      if (existing) {
        return prev.map(item => item.dish.id === dish.id ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { dish, quantity }];
    });
    showToast(`${quantity} ${dish.name} ajouté(s) au panier`);
  };

  const handleRemoveFromCart = (dishId: string) => {
    setCart(prev => prev.filter(item => item.dish.id !== dishId));
  };

  const handleCheckout = () => {
    alert("Paiement effectué avec succès via Orange Money !");
    setCart([]);
    setViewState('Tab');
    setActiveTab('Home');
  };

  const toggleFavorite = (e: React.MouseEvent | null, dishId: string) => {
    if (e) e.stopPropagation();
    setFavorites(prev => 
      prev.includes(dishId) ? prev.filter(id => id !== dishId) : [...prev, dishId]
    );
  };

  const handleTabChange = (tab: Tab) => {
      setViewState('Tab');
      setActiveTab(tab);
  }

  const handleSearchNavigation = (params: { query?: string; category?: string }) => {
      setSearchParams(params);
      setViewState('Tab');
      setActiveTab('Search');
  };

  const isReelsMode = activeTab === 'Reels' && viewState === 'Tab';

  // Render Content Logic (Replaces early returns)
  const renderContent = () => {
    // 1. Overlay Views (DishDetail, Cart)
    if (viewState === 'DishDetail' && selectedDish) {
        return (
            <DishDetailScreen 
                dish={selectedDish} 
                allDishes={dishes}
                onBack={() => setViewState('Tab')} 
                onAddToCart={handleAddToCart}
                onDishClick={handleDishClick}
                isFavorite={favorites.includes(selectedDish.id)}
                onToggleFavorite={() => toggleFavorite(null, selectedDish.id)}
            />
        );
    }

    // 2. Tab Content
    switch (activeTab) {
      case 'Search':
        return (
            <SearchScreen 
                dishes={dishes} 
                onDishClick={handleDishClick} 
                onAddToCart={(dish, qty) => handleAddToCart(dish, qty)}
                initialParams={searchParams}
            />
        );
      case 'Reels':
        return (
          <ReelsScreen 
            dishes={dishes} 
            onDishClick={(dishId) => {
               const dish = dishes.find(d => d.id === dishId);
               if (dish) handleDishClick(dish);
            }} 
            onAddToCart={(dish) => handleAddToCart(dish, 1)}
          />
        );
      case 'Cart':
        return (
            <CartScreen 
                cart={cart} 
                dishes={dishes}
                favorites={favorites}
                onToggleFavorite={(id) => toggleFavorite(null, id)}
                onBack={() => setActiveTab('Home')} 
                onRemove={handleRemoveFromCart} 
                onCheckout={handleCheckout} 
                onAddToCart={(dish) => handleAddToCart(dish, 1)}
            />
        );
      case 'Profile':
        return (
            <ProfileScreen 
                onLogout={onLogout} 
                favorites={favorites} 
                dishes={dishes} 
                onToggleFavorite={(id) => toggleFavorite(null, id)}
                onDishClick={handleDishClick}
            />
        );
      case 'Home':
      default:
        return (
          <>
            {/* AI Chef Modal Overlay */}
            {showAiChef && <GeminiChef onClose={() => setShowAiChef(false)} />}
            
            {/* Floating Action Button for AI Chef (Only on Home) */}
            <button 
                onClick={() => setShowAiChef(true)}
                className="absolute bottom-24 right-4 z-40 w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center shadow-lg shadow-orange-500/40 animate-bounce"
            >
                <Sparkles size={24} className="text-white" />
            </button>

            <HomeScreen 
                dishes={dishes}
                onDishClick={handleDishClick}
                onAddToCart={(d) => handleAddToCart(d, 1)}
                cartItemCount={cartItemCount}
                onTabChange={handleTabChange}
                onSearchNavigation={handleSearchNavigation}
            />
          </>
        );
    }
  };

  return (
    <div className="h-full flex flex-col bg-white relative overflow-hidden">
      
      {/* GLOBAL TOAST NOTIFICATION - z-index high to stay on top of everything */}
      {toastMsg && (
          <div className="fixed top-10 left-1/2 -translate-x-1/2 z-[150] bg-black/90 backdrop-blur-md text-white px-6 py-3 rounded-full text-sm font-bold shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-5 duration-300 border border-white/10">
              <div className="bg-green-500 rounded-full p-0.5">
                <CheckCircle2 size={14} className="text-white" />
              </div>
              {toastMsg}
          </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden h-full">
        {renderContent()}
      </div>

      {/* Bottom Navigation - Only show in Tab View */}
      {viewState === 'Tab' && (
        <div 
          className={`absolute z-40 transition-all duration-300 w-full ${
            isReelsMode 
              ? 'bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pt-4 pb-2' 
              : 'bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-[0_-5px_20px_rgba(0,0,0,0.05)] pb-4 pt-2'
          }`}
        >
          <div className={`flex justify-between items-end px-4`}>
            <NavButton 
              active={activeTab === 'Home'} 
              onClick={() => setActiveTab('Home')} 
              icon={<Home size={24} />} 
              label="Accueil"
              isReelsMode={isReelsMode}
            />
            <NavButton 
              active={activeTab === 'Search'} 
              onClick={() => setActiveTab('Search')} 
              icon={<Search size={24} />} 
              label="Recherche"
              isReelsMode={isReelsMode}
            />
            <NavButton 
              active={activeTab === 'Reels'} 
              onClick={() => setActiveTab('Reels')} 
              icon={<Video size={24} />} 
              label="Vidéos"
              isReelsMode={isReelsMode}
            />
            <NavButton 
              active={activeTab === 'Cart'} 
              onClick={() => setActiveTab('Cart')} 
              icon={<ShoppingBag size={24} />} 
              label="Panier"
              isReelsMode={isReelsMode}
              badge={cartItemCount}
            />
            <NavButton 
              active={activeTab === 'Profile'} 
              onClick={() => setActiveTab('Profile')} 
              icon={<User size={24} />} 
              label="Compte"
              isReelsMode={isReelsMode}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const NavButton = ({ icon, active, onClick, label, isReelsMode, badge }: { icon: React.ReactNode, active: boolean, onClick: () => void, label: string, isReelsMode?: boolean, badge?: number }) => {
  const baseClasses = `flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-300 w-16 active:scale-95 relative`;
  const colorClasses = isReelsMode 
    ? (active ? 'text-white font-bold' : 'text-white/60 hover:text-white font-medium')
    : (active ? 'text-black font-bold' : 'text-gray-400 hover:text-gray-600 font-medium');

  return (
    <button 
      onClick={onClick}
      className={`${baseClasses} ${colorClasses}`}
    >
      <div className={`transition-transform duration-300 ${active ? '-translate-y-1' : ''}`}>
        {icon}
      </div>
      {badge !== undefined && badge > 0 && (
        <span className="absolute top-1 right-2 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center border border-white">
          {badge}
        </span>
      )}
      <span className="text-[10px]">{label}</span>
    </button>
  );
};

export default ClientScreen;