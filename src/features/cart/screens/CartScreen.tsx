
import React, { useState } from 'react';
import { ArrowLeft, Trash2, CreditCard, Wallet, Banknote, Tag, ShoppingBag, Heart, MoreVertical, Share2, Check, X, MoreHorizontal } from 'lucide-react';
import { OrderItem, Dish } from '../../../types';
import { ImageWithSkeleton } from '../../../components/ui/ImageWithSkeleton';

interface CartScreenProps {
  cart: OrderItem[];
  dishes: Dish[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onBack: () => void;
  onRemove: (dishId: string) => void;
  onCheckout: () => void;
  onAddToCart: (dish: Dish) => void;
}

type ViewState = 'cart' | 'favorites';
type SelectionMode = 'none' | 'share' | 'manage';

const CartScreen: React.FC<CartScreenProps> = ({ cart, dishes, favorites, onToggleFavorite, onBack, onRemove, onCheckout, onAddToCart }) => {
  const [view, setView] = useState<ViewState>('cart');
  const [selectionMode, setSelectionMode] = useState<SelectionMode>('none');
  const [selectedItems, setSelectedItems] = useState<string[]>([]); // Dish IDs
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Payment & Promo States
  const [paymentMethod, setPaymentMethod] = useState('orange');
  const [promoCode, setPromoCode] = useState('');

  // Calculations
  const total = cart.reduce((acc, item) => acc + (item.dish.price * item.quantity), 0);
  const deliveryFee = 2.000;
  const finalTotal = total + deliveryFee;

  const handleApplyPromo = () => {
    if (promoCode.trim()) {
      alert(`Vérification du code: ${promoCode}... Code invalide.`);
    }
  };

  const favoriteDishes = dishes.filter(d => favorites.includes(d.id));

  // Selection Logic
  const toggleSelection = (dishId: string) => {
      setSelectedItems(prev => 
          prev.includes(dishId) ? prev.filter(id => id !== dishId) : [...prev, dishId]
      );
  };

  const selectAll = (items: any[]) => {
      if (selectedItems.length === items.length) {
          setSelectedItems([]);
      } else {
          setSelectedItems(items.map(i => i.dish ? i.dish.id : i.id));
      }
  };

  // Actions
  const handleShare = () => {
      const itemsToShare = cart.filter(item => selectedItems.includes(item.dish.id));
      const text = itemsToShare.map(i => `- ${i.dish.name} (x${i.quantity})`).join('\n');
      alert(`Panier partagé !\n\n${text}`);
      setSelectionMode('none');
      setSelectedItems([]);
  };

  const handleDeleteSelected = () => {
      selectedItems.forEach(id => onRemove(id));
      setSelectionMode('none');
      setSelectedItems([]);
  };

  const handleMoveToFavorites = () => {
      selectedItems.forEach(id => {
          if (!favorites.includes(id)) {
              onToggleFavorite(id);
          }
          onRemove(id);
      });
      setSelectionMode('none');
      setSelectedItems([]);
      alert(`${selectedItems.length} articles déplacés vers les favoris`);
  };

  // Menu Logic
  const openMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const navigateToFavorites = () => {
      setView('favorites');
      setIsMenuOpen(false);
      setSelectionMode('none');
  };

  const startShareMode = () => {
      setSelectionMode('share');
      setIsMenuOpen(false);
      setView('cart');
  };

  const startManageMode = () => {
      setSelectionMode('manage');
      setIsMenuOpen(false);
      setView('cart');
  };

  const cancelSelectionMode = () => {
      setSelectionMode('none');
      setSelectedItems([]);
  };

  // --- RENDER FAVORITES VIEW ---
  if (view === 'favorites') {
      return (
        <div className="flex flex-col h-[100dvh] bg-white">
            <div className="bg-white p-6 pb-4 flex items-center gap-4 shadow-sm z-10 shrink-0 sticky top-0">
                <button onClick={() => setView('cart')} className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-200 transition-colors">
                    <ArrowLeft size={20} />
                </button>
                <h2 className="text-xl font-bold text-gray-900">Mes Favoris</h2>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-4 pb-32">
                 {favoriteDishes.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                        <Heart size={48} className="mb-4 opacity-20" />
                        <p className="text-lg font-bold text-gray-900">Aucun favori</p>
                    </div>
                 ) : (
                     favoriteDishes.map(dish => (
                        <div key={dish.id} className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex gap-4 items-center">
                            <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0">
                                <ImageWithSkeleton src={dish.image} alt={dish.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-gray-900 line-clamp-1">{dish.name}</h4>
                                <p className="text-gray-500 text-xs mb-2">{dish.category}</p>
                                <div className="flex justify-between items-center">
                                    <span className="font-bold text-orange-500">${dish.price.toFixed(3)}</span>
                                    <button 
                                        onClick={() => onAddToCart(dish)}
                                        className="px-3 py-1.5 bg-black text-white text-xs font-bold rounded-lg active:scale-95 transition-transform"
                                    >
                                        Ajouter
                                    </button>
                                </div>
                            </div>
                            <button 
                                onClick={() => onToggleFavorite(dish.id)}
                                className="p-2 bg-red-50 text-red-500 rounded-full hover:bg-red-100 self-start"
                            >
                                <Heart size={16} fill="currentColor" />
                            </button>
                        </div>
                     ))
                 )}
            </div>
        </div>
      );
  }

  // --- RENDER CART VIEW ---
  return (
    <div className="flex flex-col h-[100dvh] bg-white">
      {/* Header */}
      <div className="bg-white p-6 pb-4 flex items-center justify-between shadow-sm z-10 shrink-0 sticky top-0">
        <h2 className="text-3xl font-extrabold text-gray-900">
            {selectionMode === 'none' ? 'Panier' : selectionMode === 'share' ? 'Partager' : 'Gérer'}
        </h2>
        
        {selectionMode === 'none' ? (
            <div className="relative">
                <button onClick={openMenu} className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-700 transition-colors">
                    <MoreVertical size={24} />
                </button>
                {/* Dropdown Menu */}
                {isMenuOpen && (
                    <>
                        <div className="fixed inset-0 z-40" onClick={() => setIsMenuOpen(false)} />
                        <div className="absolute right-0 top-12 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                            <button onClick={navigateToFavorites} className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-3 text-sm font-bold text-gray-700">
                                <Heart size={16} /> Favoris
                            </button>
                            <button onClick={startShareMode} className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-3 text-sm font-bold text-gray-700 border-t border-gray-50">
                                <Share2 size={16} /> Partager le panier
                            </button>
                            <button onClick={startManageMode} className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-3 text-sm font-bold text-gray-700 border-t border-gray-50">
                                <MoreHorizontal size={16} /> Gérer le panier
                            </button>
                        </div>
                    </>
                )}
            </div>
        ) : (
            <button onClick={cancelSelectionMode} className="text-sm font-bold text-gray-500 hover:text-black">
                Annuler
            </button>
        )}
      </div>

      {/* Selection Header (Select All) */}
      {selectionMode !== 'none' && cart.length > 0 && (
          <div className="px-6 py-2 flex items-center gap-3 border-b border-gray-50">
              <button 
                onClick={() => selectAll(cart)}
                className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${selectedItems.length === cart.length ? 'bg-black border-black text-white' : 'border-gray-300 bg-white'}`}
              >
                  {selectedItems.length === cart.length && <Check size={12} />}
              </button>
              <span className="text-sm font-bold text-gray-600">Tout sélectionner</span>
          </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-40">
            <div className="p-6 space-y-6">
                {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                        <ShoppingBag size={32} className="opacity-30" />
                    </div>
                    <p className="text-lg font-bold text-gray-900">Votre panier est vide</p>
                    <p className="text-sm text-gray-500 mb-6">Ajoutez des plats délicieux pour commencer.</p>
                    <button onClick={onBack} className="text-orange-500 font-bold hover:underline">Voir le menu</button>
                </div>
                ) : (
                    <>
                        <div className="space-y-4">
                            {cart.map((item) => (
                                <div 
                                    key={item.dish.id} 
                                    className={`flex gap-4 items-center transition-opacity ${selectionMode !== 'none' && !selectedItems.includes(item.dish.id) ? 'opacity-50' : 'opacity-100'}`}
                                    onClick={() => selectionMode !== 'none' && toggleSelection(item.dish.id)}
                                >
                                    {/* Checkbox in selection mode */}
                                    {selectionMode !== 'none' && (
                                        <div className={`w-6 h-6 rounded-full border-2 flex shrink-0 items-center justify-center transition-all ${selectedItems.includes(item.dish.id) ? 'bg-orange-500 border-orange-500 text-white' : 'border-gray-300 bg-white'}`}>
                                            {selectedItems.includes(item.dish.id) && <Check size={14} />}
                                        </div>
                                    )}

                                    <div className="flex gap-4 items-start flex-1">
                                        <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-gray-100">
                                            <ImageWithSkeleton src={item.dish.image} alt={item.dish.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <h4 className="font-bold text-gray-900 line-clamp-2">{item.dish.name}</h4>
                                                {selectionMode === 'none' && (
                                                    <button onClick={() => onRemove(item.dish.id)} className="text-gray-300 hover:text-red-500 p-1">
                                                        <Trash2 size={16} />
                                                    </button>
                                                )}
                                            </div>
                                            <p className="text-gray-500 text-xs mb-2">{item.dish.category}</p>
                                            <div className="flex justify-between items-center">
                                                <span className="font-bold text-orange-500">${(item.dish.price * item.quantity).toFixed(3)}</span>
                                                <div className="flex items-center gap-2 bg-gray-50 px-2 py-1 rounded-lg border border-gray-100">
                                                    <span className="text-xs font-bold text-gray-600">x{item.quantity}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Summary (Hidden in Selection Mode) */}
                        {selectionMode === 'none' && (
                            <div className="border-t border-gray-100 pt-6 mt-6">
                                {/* Promo Code */}
                                <div className="flex gap-2 mb-6">
                                    <div className="relative flex-1">
                                        <Tag size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input 
                                            type="text" 
                                            value={promoCode}
                                            onChange={(e) => setPromoCode(e.target.value)}
                                            placeholder="Code Promo" 
                                            className="w-full bg-gray-50 rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-black text-sm text-gray-900 placeholder:text-gray-400 font-medium" 
                                        />
                                    </div>
                                    <button onClick={handleApplyPromo} className="bg-black text-white px-4 rounded-xl font-bold text-sm hover:bg-gray-800">Appliquer</button>
                                </div>

                                <div className="space-y-2 mb-6 text-sm">
                                    <div className="flex justify-between text-gray-500">
                                    <span>Sous-total</span>
                                    <span>${total.toFixed(3)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-500">
                                    <span>Frais de livraison</span>
                                    <span>${deliveryFee.toFixed(3)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-500">
                                    <span>Taxes (Incluses)</span>
                                    <span>Inclus</span>
                                    </div>
                                    <div className="border-t border-dashed border-gray-200 my-2 pt-2 flex justify-between font-extrabold text-xl text-gray-900">
                                    <span>Total</span>
                                    <span>${finalTotal.toFixed(3)}</span>
                                    </div>
                                </div>

                                {/* Payment Method */}
                                <div className="mb-6">
                                    <h4 className="font-bold text-gray-900 mb-3 text-sm">Moyen de paiement</h4>
                                    <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                                        <PaymentOption 
                                            icon={<Wallet className={paymentMethod === 'orange' ? "text-orange-500" : ""} />} 
                                            label="Orange Money" 
                                            active={paymentMethod === 'orange'} 
                                            onClick={() => setPaymentMethod('orange')}
                                        />
                                        <PaymentOption 
                                            icon={<CreditCard className={paymentMethod === 'card' ? "text-blue-500" : ""} />} 
                                            label="Carte" 
                                            active={paymentMethod === 'card'}
                                            onClick={() => setPaymentMethod('card')}
                                        />
                                        <PaymentOption 
                                            icon={<Banknote className={paymentMethod === 'cash' ? "text-green-500" : ""} />} 
                                            label="Espèces" 
                                            active={paymentMethod === 'cash'}
                                            onClick={() => setPaymentMethod('cash')}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
      </div>

       {/* Bottom Actions */}
       <div className="absolute bottom-20 left-0 right-0 p-6 z-20 bg-gradient-to-t from-white via-white to-transparent">
            {selectionMode === 'none' && cart.length > 0 ? (
                <button 
                    onClick={onCheckout}
                    className="w-full bg-black text-white font-bold py-4 rounded-2xl shadow-xl flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors active:scale-95 transform"
                >
                    <span>Commander</span>
                    <span className="bg-white/20 px-2 py-0.5 rounded text-sm">${finalTotal.toFixed(3)}</span>
                </button>
            ) : selectionMode === 'share' ? (
                <button 
                    onClick={handleShare}
                    disabled={selectedItems.length === 0}
                    className="w-full bg-orange-500 disabled:bg-orange-300 text-white font-bold py-4 rounded-2xl shadow-xl flex items-center justify-center gap-2 transition-colors active:scale-95 transform"
                >
                    <Share2 size={20} />
                    Partager ({selectedItems.length})
                </button>
            ) : selectionMode === 'manage' ? (
                <div className="flex gap-3">
                    <button 
                        onClick={handleDeleteSelected}
                        disabled={selectedItems.length === 0}
                        className="flex-1 bg-red-50 text-red-500 disabled:opacity-50 disabled:bg-gray-50 disabled:text-gray-400 font-bold py-4 rounded-2xl shadow-sm flex items-center justify-center gap-2 transition-colors active:scale-95"
                    >
                        <Trash2 size={20} />
                        Supprimer ({selectedItems.length})
                    </button>
                    <button 
                        onClick={handleMoveToFavorites}
                        disabled={selectedItems.length === 0}
                        className="flex-1 bg-black text-white disabled:bg-gray-300 font-bold py-4 rounded-2xl shadow-xl flex items-center justify-center gap-2 transition-colors active:scale-95"
                    >
                        <Heart size={20} />
                        Déplacer ({selectedItems.length})
                    </button>
                </div>
            ) : null}
       </div>
    </div>
  );
};

const PaymentOption = ({ icon, label, active = false, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick: () => void }) => (
  <div 
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-3 rounded-xl border min-w-[140px] cursor-pointer transition-all ${active ? 'border-orange-500 bg-orange-50 shadow-sm' : 'border-gray-200 bg-white hover:border-gray-300'}`}
  >
    {icon}
    <span className={`text-xs font-bold ${active ? 'text-gray-900' : 'text-gray-500'}`}>{label}</span>
  </div>
);

export default CartScreen;
