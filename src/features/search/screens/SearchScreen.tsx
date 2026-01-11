import React, { useState, useMemo, useEffect } from 'react';
import { Search, X, Plus, Star, SlidersHorizontal, Check } from 'lucide-react';
import { Dish } from '../../../types';
import { CATEGORIES } from '../../../config/constants';
import { ImageWithSkeleton } from '../../../components/ui/ImageWithSkeleton';

interface SearchScreenProps {
  dishes: Dish[];
  onDishClick: (dish: Dish) => void;
  onAddToCart: (dish: Dish, quantity: number) => void;
  initialParams?: { query?: string; category?: string };
}

const SearchScreen: React.FC<SearchScreenProps> = ({ dishes, onDishClick, onAddToCart, initialParams }) => {
  const [searchQuery, setSearchQuery] = useState(initialParams?.query || '');
  const [selectedCategory, setSelectedCategory] = useState(initialParams?.category || 'All');
  const [showFilters, setShowFilters] = useState(false);

  // Sync with initial params when they change
  useEffect(() => {
      if (initialParams) {
          if (initialParams.query !== undefined) setSearchQuery(initialParams.query);
          if (initialParams.category !== undefined) setSelectedCategory(initialParams.category);
      }
  }, [initialParams]);

  // Filter Logic
  const filteredDishes = useMemo(() => {
    return dishes.filter(dish => {
      const matchesCategory = selectedCategory === 'All' || dish.category === CATEGORIES.find(c => c.id === selectedCategory)?.name;
      const matchesSearch = dish.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            dish.description?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [dishes, selectedCategory, searchQuery]);

  return (
    <div className="flex flex-col h-full bg-white relative">
      
      {/* Filter Modal */}
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

      {/* Search Header */}
      <div className="p-4 pt-6 sticky top-0 bg-white z-20 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)]">
        <h2 className="text-3xl font-extrabold mb-4 text-gray-900">Rechercher</h2>
        <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                <Search size={20} />
            </div>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Plats, restaurants, épicerie..." 
              className="w-full bg-gray-100 text-gray-900 placeholder:text-gray-500 rounded-full py-3.5 pl-12 pr-20 outline-none focus:ring-2 focus:ring-orange-500 font-medium transition-all"
              autoFocus
            />
            
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                {searchQuery && (
                    <button 
                        onClick={() => setSearchQuery('')}
                        className="bg-gray-300 rounded-full p-1 text-white hover:bg-gray-400 transition-colors"
                    >
                        <X size={12} />
                    </button>
                )}
                {/* Filter Button inside Search Bar matching Home styling */}
                <button 
                    onClick={() => setShowFilters(true)}
                    className="w-9 h-9 flex items-center justify-center bg-white rounded-full shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors"
                >
                    <SlidersHorizontal size={16} className="text-gray-900" />
                </button>
            </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-24 px-4">
        
        {/* Categories Pills */}
        <div className="mb-6 mt-4">
            <div className="flex flex-wrap gap-2">
            <button 
                onClick={() => setSelectedCategory('All')}
                className={`px-4 py-2.5 rounded-full text-sm font-bold transition-colors ${
                    selectedCategory === 'All' ? 'bg-black text-white shadow-lg' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
                Tout
            </button>
            {CATEGORIES.map(cat => (
                <button 
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2.5 rounded-full text-sm font-bold transition-colors flex items-center gap-2 ${
                    selectedCategory === cat.id ? 'bg-black text-white shadow-lg' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                >
                <span className="text-base">{cat.icon}</span>
                <span>{cat.name}</span>
                </button>
            ))}
            </div>
        </div>

        {/* Results */}
        <div>
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-extrabold text-lg text-gray-900">
                    {searchQuery ? `Résultats pour "${searchQuery}"` : 'Suggestions'}
                </h3>
                <span className="text-xs font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-lg">{filteredDishes.length} résultats</span>
            </div>

            {filteredDishes.length === 0 ? (
                <div className="text-center py-20 text-gray-400">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Search size={24} className="opacity-20"/>
                    </div>
                    <p className="font-medium">Aucun résultat trouvé.</p>
                    <p className="text-sm mt-1">Essayez une autre recherche.</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-4">
                    {filteredDishes.map((dish: Dish) => (
                      <div 
                        key={dish.id} 
                        onClick={() => onDishClick(dish)}
                        className="bg-white p-2 rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] cursor-pointer group active:scale-95 transition-transform border border-transparent hover:border-gray-100"
                      >
                        <div className="relative h-36 w-full bg-gray-100 mb-3 rounded-xl overflow-hidden">
                          <ImageWithSkeleton 
                            src={dish.image} 
                            alt={dish.name} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                          />
                           <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-gray-900 shadow-sm flex items-center gap-1">
                             <Star size={10} className="fill-orange-500 text-orange-500" />
                             {dish.rating}
                          </div>
                        </div>
                        
                        <div className="flex flex-col gap-1 px-1 pb-1">
                          <h4 className="font-bold text-gray-900 leading-tight line-clamp-1">{dish.name}</h4>
                          <span className="text-xs text-gray-400 font-medium">{dish.category} • {dish.deliveryTime} min</span>
                          <div className="flex justify-between items-center mt-2">
                              <span className="text-lg font-extrabold text-gray-900">${dish.price.toFixed(3)}</span>
                              <button 
                                onClick={(e) => { e.stopPropagation(); onAddToCart(dish, 1); }}
                                className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center hover:bg-orange-50 transition-colors shadow-md"
                              >
                                <Plus size={16} />
                              </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default SearchScreen;