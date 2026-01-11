
import React, { useState, useMemo } from 'react';
import { MapPin, ChevronDown, User, Filter, Heart, Clock, Star, ArrowRight, Search, SlidersHorizontal, X, Check, ArrowLeft, ChevronRight as ChevronRightIcon, ShoppingCart, LocateFixed, Bike, ShoppingBag, Plus, Edit2 } from 'lucide-react';
import { Dish } from '../../../types';
import { CATEGORIES } from '../../../config/constants';
import { ImageWithSkeleton } from '../../../components/ui/ImageWithSkeleton';

interface HomeScreenProps {
  dishes: Dish[];
  onDishClick: (dish: Dish) => void;
  onAddToCart: (dish: Dish) => void;
  cartItemCount: number;
  onTabChange: (tab: any) => void;
  onSearchNavigation: (params: { query?: string; category?: string }) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ dishes, onDishClick, onAddToCart, cartItemCount, onTabChange, onSearchNavigation }) => {
  const [deliveryMode, setDeliveryMode] = useState<'delivery' | 'pickup'>('delivery');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  // Search Overlay State
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchTab, setSearchTab] = useState<'Tout' | 'Restaurants'>('Tout');

  // Header Modals State
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [addressStep, setAddressStep] = useState<'list' | 'form'>('list'); // 'list' or 'form'
  const [showDeliverySheet, setShowDeliverySheet] = useState(false);

  // Address Form State
  const [address, setAddress] = useState({
    neighborhood: 'ACI 2000',
    city: 'Bamako',
    country: 'Mali'
  });

  // Mock Addresses for the list view
  const savedAddresses = [
    { id: 1, label: 'Maison', details: 'ACI 2000, Rue 402, Bamako', isDefault: true },
    { id: 2, label: 'Bureau', details: 'Badalabougou, Bamako', isDefault: false },
  ];

  // Extract unique restaurants for the "Restaurants" tab
  const restaurants = useMemo(() => {
    return [
      { id: 'r1', name: "McDonald's", image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=100&q=80" },
      { id: 'r2', name: "KFC", image: "https://images.unsplash.com/photo-1513639776629-7b611594e29b?auto=format&fit=crop&w=100&q=80" },
      { id: 'r3', name: "Burger King", image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=100&q=80" },
      { id: 'r4', name: "O'Tacos", image: "https://images.unsplash.com/photo-1629814249584-bd4d53cf0e7d?auto=format&fit=crop&w=100&q=80" },
      { id: 'r5', name: "Pizza Hut", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=100&q=80" },
    ];
  }, []);

  // Mock Promo Data
  const promos = [
    {
      id: 1,
      title: "Profitez de réductions !",
      subtitle: "Chez Schwartz's Deli !",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
      bgColor: "bg-orange-100",
      buttonText: "Je fonce"
    },
    {
      id: 2,
      title: "1 acheté = 1 offert",
      subtitle: "Sur une sélection de sushis",
      image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80",
      bgColor: "bg-red-100",
      buttonText: "Voir l'offre"
    }
  ];

  // Filters Data
  const filters = [
    { label: "Offres", icon: null },
    { label: "Moins de 30 min", icon: null },
    { label: "Les mieux notés", icon: <Star size={12} /> },
    { label: "Prix", icon: null },
    { label: "Diététique", icon: null },
    { label: "Bio", icon: null },
  ];

  const handleSearchBarClick = () => {
    setIsSearchActive(true);
  };

  const handleCloseSearch = (e: React.MouseEvent) => {
      e.stopPropagation();
      setIsSearchActive(false);
      setSearchQuery('');
  }

  const handleSearchSubmit = () => {
      if(searchQuery.trim()) {
          onSearchNavigation({ query: searchQuery });
          setIsSearchActive(false);
          setSearchQuery('');
      }
  }

  const handleOpenAddressModal = () => {
      setAddressStep('list');
      setShowAddressModal(true);
  };

  const handleEditAddress = () => {
      setAddressStep('form');
  };

  const handleGeolocation = () => {
     if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(() => {
             alert("Position trouvée ! Adresse mise à jour.");
             setAddress({...address, neighborhood: 'Hamdallaye ACI'}); // Mock update
         }, () => {
             alert("Impossible d'accéder à la position. Veuillez vérifier vos paramètres.");
         });
     } else {
         alert("La géolocalisation n'est pas supportée par ce navigateur.");
     }
  };

  return (
    <div className="h-full bg-white relative">
      
      {/* 1. Filter Modal Overlay */}
      {showFilters && (
        <div className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center">
            <div className="bg-white w-full max-w-md h-[70%] sm:h-auto sm:rounded-2xl rounded-t-[2rem] shadow-2xl flex flex-col animate-in slide-in-from-bottom-10 duration-200">
                <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="font-extrabold text-xl">Filtres</h3>
                    <button onClick={() => setShowFilters(false)} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                        <X size={20} />
                    </button>
                </div>
                <div className="p-6 overflow-y-auto space-y-6">
                    <div>
                        <h4 className="font-bold text-gray-900 mb-3">Trier par</h4>
                        <div className="flex flex-wrap gap-2">
                            <button className="px-4 py-2 rounded-full bg-black text-white text-sm font-bold flex items-center gap-2">
                                Recommandé <Check size={14}/>
                            </button>
                            <button className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm font-bold">
                                Les mieux notés
                            </button>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900 mb-3">Fourchette de prix</h4>
                        <div className="flex gap-2">
                            <button className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-700 font-bold hover:bg-orange-50 hover:text-orange-600 transition-colors">$</button>
                            <button className="flex-1 py-3 rounded-xl bg-orange-50 text-orange-600 font-bold border border-orange-200">$$</button>
                            <button className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-700 font-bold">$$$</button>
                        </div>
                    </div>
                </div>
                <div className="p-4 border-t border-gray-100">
                    <button onClick={() => setShowFilters(false)} className="w-full bg-black text-white font-bold py-4 rounded-xl shadow-lg active:scale-95 transition-transform">
                        Appliquer
                    </button>
                </div>
            </div>
        </div>
      )}

      {/* 2. Address Modal */}
      {showAddressModal && (
          <div className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-white w-full max-w-sm rounded-[2rem] p-6 shadow-2xl animate-in zoom-in-95 duration-200">
                  <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-extrabold text-gray-900">
                          {addressStep === 'list' ? 'Adresses de livraison' : 'Modifier l\'adresse'}
                      </h3>
                      <button onClick={() => setShowAddressModal(false)} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                          <X size={20} />
                      </button>
                  </div>
                  
                  {addressStep === 'list' ? (
                      <div className="space-y-4">
                          <p className="text-gray-500 text-sm">Où souhaitez-vous être livré ?</p>
                          
                          {savedAddresses.map((addr) => (
                              <div key={addr.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-black transition-colors cursor-pointer">
                                  <div className="flex items-start gap-3">
                                      <div className="mt-1">
                                          <MapPin size={18} className={addr.isDefault ? "text-orange-500" : "text-gray-400"} />
                                      </div>
                                      <div>
                                          <h4 className="font-bold text-gray-900">{addr.label} {addr.isDefault && <span className="text-orange-500 text-[10px] ml-1 bg-orange-50 px-2 py-0.5 rounded-full">Défaut</span>}</h4>
                                          <p className="text-sm text-gray-500 leading-tight mt-1">{addr.details}</p>
                                      </div>
                                  </div>
                                  <button onClick={(e) => { e.stopPropagation(); handleEditAddress(); }} className="p-2 text-gray-400 hover:text-black">
                                      <Edit2 size={16} />
                                  </button>
                              </div>
                          ))}

                          <button onClick={handleEditAddress} className="w-full py-4 rounded-xl border border-dashed border-gray-300 text-gray-500 font-bold flex items-center justify-center gap-2 hover:border-black hover:text-black transition-colors mt-4">
                              <Plus size={18} /> Ajouter une adresse
                          </button>
                      </div>
                  ) : (
                      <div className="space-y-4">
                          <div className="bg-orange-50 p-4 rounded-xl mb-4">
                              <p className="text-xs text-orange-700 font-medium">
                                  Nous avons besoin de votre localisation précise pour la livraison.
                              </p>
                          </div>

                          <div>
                              <label className="text-xs font-bold text-gray-500 uppercase ml-1">Quartier</label>
                              <input type="text" value={address.neighborhood} onChange={(e) => setAddress({...address, neighborhood: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 font-bold text-gray-900 focus:ring-2 focus:ring-black outline-none" />
                          </div>
                          <div className="flex gap-4">
                              <div className="flex-1">
                                  <label className="text-xs font-bold text-gray-500 uppercase ml-1">Ville</label>
                                  <input type="text" value={address.city} onChange={(e) => setAddress({...address, city: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 font-bold text-gray-900 focus:ring-2 focus:ring-black outline-none" />
                              </div>
                              <div className="flex-1">
                                  <label className="text-xs font-bold text-gray-500 uppercase ml-1">Pays</label>
                                  <input type="text" value={address.country} onChange={(e) => setAddress({...address, country: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 font-bold text-gray-900 focus:ring-2 focus:ring-black outline-none" />
                              </div>
                          </div>

                          <button onClick={handleGeolocation} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-200 text-orange-600 font-bold hover:bg-orange-50 transition-colors">
                              <LocateFixed size={18} /> Utiliser ma position actuelle
                          </button>

                          <div className="flex gap-3 mt-4">
                             <button onClick={() => setAddressStep('list')} className="flex-1 bg-gray-100 text-gray-700 font-bold py-4 rounded-xl">
                                  Retour
                             </button>
                             <button onClick={() => setShowAddressModal(false)} className="flex-[2] bg-black text-white font-bold py-4 rounded-xl shadow-lg active:scale-95 transition-transform">
                                  Enregistrer
                             </button>
                          </div>
                      </div>
                  )}
              </div>
          </div>
      )}

      {/* 3. Delivery Bottom Sheet */}
      {showDeliverySheet && (
          <div className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm flex items-end">
              <div className="bg-white w-full rounded-t-[2rem] p-6 pb-10 shadow-2xl animate-in slide-in-from-bottom-full duration-300">
                  <div className="flex justify-center mb-6">
                      <div className="w-12 h-1 bg-gray-200 rounded-full" />
                  </div>
                  <h3 className="text-center text-xl font-extrabold text-gray-900 mb-8">Options de repas</h3>
                  
                  <div className="space-y-2">
                      <button 
                          onClick={() => { setDeliveryMode('delivery'); setShowDeliverySheet(false); }}
                          className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${deliveryMode === 'delivery' ? 'bg-gray-50 ring-2 ring-black' : 'hover:bg-gray-50'}`}
                      >
                          <div className="flex items-center gap-4">
                              <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center">
                                  <Bike size={20} />
                              </div>
                              <span className="font-bold text-lg text-gray-900">Livraison</span>
                          </div>
                          {deliveryMode === 'delivery' && <Check size={24} className="text-black" />}
                      </button>

                      <button 
                          onClick={() => { setDeliveryMode('pickup'); setShowDeliverySheet(false); }}
                          className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${deliveryMode === 'pickup' ? 'bg-gray-50 ring-2 ring-black' : 'hover:bg-gray-50'}`}
                      >
                          <div className="flex items-center gap-4">
                              <div className="w-10 h-10 bg-gray-200 text-gray-700 rounded-full flex items-center justify-center">
                                  <ShoppingBag size={20} />
                              </div>
                              <span className="font-bold text-lg text-gray-900">À emporter</span>
                          </div>
                          {deliveryMode === 'pickup' && <Check size={24} className="text-black" />}
                      </button>
                  </div>

                  <button onClick={() => setShowDeliverySheet(false)} className="w-full bg-black text-white font-bold py-4 rounded-xl shadow-lg mt-8 active:scale-95 transition-transform">
                      Confirmer l'option {deliveryMode === 'delivery' ? 'Livraison' : 'À emporter'}
                  </button>
              </div>
          </div>
      )}

      {/* Main Scroll Container */}
      <div className="h-full overflow-y-auto no-scrollbar bg-white">

        {/* --- STICKY TOP HEADER --- */}
        <div className="sticky top-0 z-50 bg-white shadow-[0_1px_0_rgba(0,0,0,0.05)] h-16">
            <div className="px-4 h-full flex justify-between items-center">
                <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">Snap<span className="text-orange-500">Meal</span></h1>
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => onTabChange('Profile')} 
                        className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-200 transition-colors"
                    >
                        <User size={20} />
                    </button>
                    <button 
                        onClick={() => onTabChange('Cart')} // Redirect to Cart -> Favorites tab
                        className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-200 transition-colors"
                    >
                        <Heart size={20} />
                    </button>
                    <button 
                        onClick={() => onTabChange('Cart')}
                        className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors relative"
                    >
                        <ShoppingCart size={20} />
                        {cartItemCount > 0 && (
                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                                {cartItemCount}
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </div>

        {/* --- SCROLLING ADDRESS BAR --- */}
        <div className="px-4 py-3 flex justify-between items-center bg-white relative z-0">
                {/* Left: Address (Opens Address Modal) */}
                <button 
                onClick={handleOpenAddressModal}
                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-full transition-colors max-w-[60%]"
                >
                <MapPin size={18} className="text-orange-500 shrink-0" />
                <span className="font-bold text-sm text-gray-900 truncate">{address.neighborhood}, {address.city}</span>
                <ChevronDown size={14} className="text-gray-500 shrink-0" />
                </button>

                {/* Right: Delivery Toggle (Opens Bottom Sheet) */}
                <button 
                onClick={() => setShowDeliverySheet(true)}
                className="flex items-center gap-1.5 text-gray-900 hover:bg-gray-50 px-3 py-1.5 rounded-full transition-colors font-bold text-sm"
                >
                    <span>{deliveryMode === 'delivery' ? 'Livraison' : 'À emporter'}</span>
                    <ChevronDown size={14} />
                </button>
        </div>

        {/* --- STICKY SEARCH BAR --- */}
        <div className="sticky top-16 z-40 bg-white px-4 pb-3 pt-2 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] transition-all">
          <div className="relative flex items-center gap-3">
              <div className="relative flex-1">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                      <Search size={20} />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Plats, restaurants, épicerie..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onClick={handleSearchBarClick}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
                    className="w-full bg-gray-100 text-gray-900 placeholder:text-gray-500 rounded-full py-3.5 pl-12 pr-12 outline-none cursor-text hover:bg-gray-200 transition-colors font-medium"
                  />
                  
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    {/* Back Button if search active */}
                    {isSearchActive && (
                        <button 
                            onClick={handleCloseSearch}
                            className="w-9 h-9 flex items-center justify-center bg-gray-200 rounded-full text-gray-600 hover:bg-gray-300 transition-colors"
                        >
                            <ArrowLeft size={16} />
                        </button>
                    )}
                    
                    {/* Filter Button */}
                    {!isSearchActive && (
                        <button 
                            onClick={(e) => { e.stopPropagation(); setShowFilters(true); }}
                            className="w-9 h-9 flex items-center justify-center bg-white rounded-full shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors"
                        >
                            <SlidersHorizontal size={16} className="text-gray-900" />
                        </button>
                    )}
                  </div>
              </div>
          </div>
        </div>

        {/* --- SEARCH OVERLAY --- */}
        {isSearchActive ? (
            <div className="min-h-[calc(100dvh-140px)] bg-white px-4 pb-32 animate-in fade-in slide-in-from-bottom-4 duration-200 pt-4">
                {/* Tabs */}
                <div className="flex border-b border-gray-100 mb-6">
                    <button 
                        onClick={() => setSearchTab('Tout')}
                        className={`flex-1 pb-3 font-bold text-sm transition-colors relative ${searchTab === 'Tout' ? 'text-black' : 'text-gray-400'}`}
                    >
                        Tout
                        {searchTab === 'Tout' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black rounded-full" />}
                    </button>
                    <button 
                        onClick={() => setSearchTab('Restaurants')}
                        className={`flex-1 pb-3 font-bold text-sm transition-colors relative ${searchTab === 'Restaurants' ? 'text-black' : 'text-gray-400'}`}
                    >
                        Restaurants
                        {searchTab === 'Restaurants' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black rounded-full" />}
                    </button>
                </div>

                {/* Content */}
                {searchTab === 'Tout' ? (
                    <div>
                        <h3 className="font-bold text-gray-900 mb-4">Meilleures catégories</h3>
                        <div className="space-y-1">
                            {CATEGORIES.map((cat) => (
                                <button 
                                    key={cat.id}
                                    onClick={() => onSearchNavigation({ category: cat.id })}
                                    className="w-full flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors group"
                                >
                                    <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-xl border border-gray-100 group-hover:border-orange-200 group-hover:bg-orange-50 transition-colors">
                                        {cat.icon}
                                    </div>
                                    <span className="font-bold text-gray-700 flex-1 text-left group-hover:text-orange-600">{cat.name}</span>
                                    <ChevronRightIcon size={16} className="text-gray-300" />
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div>
                        <h3 className="font-bold text-gray-900 mb-4">Restaurants populaires</h3>
                        <div className="space-y-4">
                            {restaurants.map((rest) => (
                                <button 
                                    key={rest.id}
                                    onClick={() => onSearchNavigation({ query: rest.name })}
                                    className="w-full flex items-center gap-4 p-2 hover:bg-gray-50 rounded-2xl transition-colors group"
                                >
                                    <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-100 border border-gray-100">
                                        <ImageWithSkeleton src={rest.image} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="text-left flex-1">
                                        <h4 className="font-bold text-gray-900">{rest.name}</h4>
                                        <p className="text-xs text-gray-500">Fast Food • $$</p>
                                    </div>
                                    <div className="bg-gray-100 p-2 rounded-full text-gray-400 group-hover:bg-orange-50 group-hover:text-orange-500 transition-colors">
                                        <ArrowRight size={16} />
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        ) : (
            /* --- MAIN CONTENT (When Search Not Active) --- */
            <div className="pb-32">
                  {/* Categories */}
                  <div className="px-4 mt-4 mb-6">
                      <div className="flex gap-6 overflow-x-auto no-scrollbar px-2 py-1">
                      {CATEGORIES.map((cat) => (
                          <div key={cat.id} className="flex flex-col items-center gap-2 shrink-0 group cursor-pointer">
                          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-3xl shadow-sm border border-gray-100 group-hover:border-orange-200 group-hover:bg-orange-50 transition-all">
                              {cat.icon}
                          </div>
                          <span className="text-xs font-bold text-gray-700 group-hover:text-orange-600">{cat.name}</span>
                          </div>
                      ))}
                      </div>
                  </div>

                  {/* Horizontal Filters */}
                  <div className="px-4 mb-6"> 
                      <div className="overflow-x-auto no-scrollbar">
                      <div className="flex gap-2">
                          <button 
                              onClick={() => setShowFilters(true)}
                              className="bg-gray-100 border border-gray-200 text-gray-900 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 whitespace-nowrap active:scale-95 transition-transform"
                          >
                              <Filter size={12} /> Filtres
                          </button>
                          {filters.map((filter, idx) => (
                              <button key={idx} className="bg-white border border-gray-200 text-gray-700 px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 whitespace-nowrap shadow-sm active:scale-95 transition-transform hover:bg-gray-50">
                                  {filter.label}
                                  {filter.icon}
                              </button>
                          ))}
                      </div>
                      </div>
                  </div>

                  {/* Promos Carousel */}
                  <div className="px-4 mb-8">
                      <div className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory">
                      {promos.map((promo) => (
                          <div 
                          key={promo.id} 
                          className={`snap-center shrink-0 w-[85%] ${promo.bgColor} rounded-3xl p-5 flex justify-between items-center relative overflow-hidden h-44 shadow-sm`}
                          >
                          <div className="z-10 flex flex-col items-start justify-center h-full max-w-[60%]">
                              <span className="bg-white/80 backdrop-blur-sm px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide mb-2">Promo</span>
                              <h3 className="font-extrabold text-xl text-gray-900 leading-tight mb-1">{promo.title}</h3>
                              <p className="text-xs text-gray-700 font-medium mb-4">{promo.subtitle}</p>
                              <button className="bg-black text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1 hover:bg-gray-800 transition-colors">
                              {promo.buttonText} <ArrowRight size={12} />
                              </button>
                          </div>
                          <div className="absolute -right-4 top-0 h-full w-3/5 rotate-6">
                              <ImageWithSkeleton src={promo.image} className="w-full h-full object-cover rounded-l-3xl shadow-[-10px_0_20px_rgba(0,0,0,0.1)]" />
                          </div>
                          </div>
                      ))}
                      </div>
                  </div>

                  {/* Section: Offres du jour */}
                  <div className="mb-8">
                      <div className="px-4 flex justify-between items-end mb-4">
                      <div>
                          <h2 className="text-xl font-extrabold text-gray-900">Offres du jour</h2>
                          <p className="text-xs text-gray-500 font-medium">Sélectionné pour vous</p>
                      </div>
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 cursor-pointer transition-colors">
                          <ArrowRight size={16} />
                      </div>
                      </div>
                      <div className="flex gap-4 overflow-x-auto no-scrollbar px-4 pb-4">
                      {dishes.slice(0, 4).map((dish) => (
                          <HorizontalCard key={dish.id} dish={dish} onClick={() => onDishClick(dish)} />
                      ))}
                      </div>
                  </div>

                  {/* Section: Frais éco < 2 EUR */}
                  <div className="mb-8">
                      <div className="px-4 flex justify-between items-end mb-4">
                      <h2 className="text-xl font-extrabold text-gray-900">Frais éco &lt; 2 EUR</h2>
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 cursor-pointer transition-colors">
                          <ArrowRight size={16} />
                      </div>
                      </div>
                      <div className="flex gap-4 overflow-x-auto no-scrollbar px-4 pb-4">
                      {dishes.slice(2, 6).map((dish) => (
                          <HorizontalCard key={dish.id} dish={dish} onClick={() => onDishClick(dish)} />
                      ))}
                      </div>
                  </div>

                  {/* Section: Commerces à proximité */}
                  <div className="px-4 pb-8">
                      <h2 className="text-xl font-extrabold text-gray-900 mb-4">Tous les restaurants</h2>
                      <div className="flex flex-col gap-8">
                      {dishes.map(dish => (
                          <LargeCard key={dish.id} dish={dish} onClick={() => onDishClick(dish)} />
                      ))}
                      </div>
                  </div>
            </div>
        )}
      </div>
    </div>
  );
};

// Sub-components for Cards

const HorizontalCard: React.FC<{ dish: Dish, onClick: () => void }> = ({ dish, onClick }) => (
  <div onClick={onClick} className="shrink-0 w-64 group cursor-pointer active:scale-95 transition-transform">
    <div className="relative h-40 w-full mb-3 overflow-hidden rounded-2xl">
       <ImageWithSkeleton src={dish.image} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
       <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-sm">
          Promo
       </div>
       <button className="absolute top-3 right-3 p-2 bg-white/30 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-red-500 transition-colors">
          <Heart size={14} />
       </button>
    </div>
    <div>
       <div className="flex justify-between items-start">
          <h3 className="font-bold text-gray-900 text-base truncate pr-2">{dish.name}</h3>
          <div className="flex items-center gap-1 bg-gray-100 px-1.5 py-0.5 rounded-full shrink-0">
             <span className="text-xs font-bold text-gray-900">{dish.rating}</span>
             <Star size={10} className="fill-gray-900 text-gray-900" />
          </div>
       </div>
       <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
         <Clock size={10} /> {dish.deliveryTime} min • Livraison 1.50€
       </p>
    </div>
  </div>
);

const LargeCard: React.FC<{ dish: Dish, onClick: () => void }> = ({ dish, onClick }) => (
    <div onClick={onClick} className="w-full group cursor-pointer active:scale-95 transition-transform border-b border-gray-100 pb-6 last:border-0">
        <div className="relative h-52 w-full mb-4 overflow-hidden rounded-2xl">
             <ImageWithSkeleton src={dish.image} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
             {dish.isAvailable && (
                 <div className="absolute top-3 left-3 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-sm">
                    Recommandé
                 </div>
             )}
            <button className="absolute top-3 right-3 p-2.5 bg-white rounded-full text-gray-700 hover:text-red-500 shadow-md transition-colors">
                <Heart size={18} />
            </button>
             <div className="absolute bottom-3 right-3 bg-white px-3 py-1.5 rounded-full text-xs font-bold text-gray-900 shadow-md">
                 {dish.deliveryTime} - {dish.deliveryTime + 15} min
             </div>
        </div>
        <div>
           <div className="flex justify-between items-start mb-1">
              <h3 className="font-extrabold text-xl text-gray-900">{dish.name}</h3>
              <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full">
                  <span className="text-xs font-bold">{dish.rating}</span>
                  <Star size={10} className="fill-black text-black" />
              </div>
           </div>
           <p className="text-sm text-gray-500 flex items-center gap-2">
               <span>$$$ • {dish.category} • Fast Food</span>
           </p>
           <p className="text-xs text-gray-400 mt-1">
               Livraison 1.50€ • Frais réduits
           </p>
        </div>
    </div>
);

export default HomeScreen;
