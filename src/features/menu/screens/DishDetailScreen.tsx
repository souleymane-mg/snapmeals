import React, { useState, useMemo } from 'react';
import { ArrowLeft, Heart, Clock, Flame, Star, Minus, Plus, ShoppingBag, Send, Camera, Image as ImageIcon } from 'lucide-react';
import { Dish, Review } from '../../../types';
import { MOCK_REVIEWS } from '../../../config/constants';
import { ImageWithSkeleton } from '../../../components/ui/ImageWithSkeleton';

interface DishDetailScreenProps {
  dish: Dish;
  allDishes: Dish[];
  onBack: () => void;
  onAddToCart: (dish: Dish, quantity: number) => void;
  onDishClick: (dish: Dish) => void;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}

const DishDetailScreen: React.FC<DishDetailScreenProps> = ({ dish, allDishes, onBack, onAddToCart, onDishClick, isFavorite = false, onToggleFavorite }) => {
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState<Review[]>(MOCK_REVIEWS);
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [reviewFilter, setReviewFilter] = useState<'All' | '5' | 'Photo'>('All');

  const increment = () => setQuantity(q => q + 1);
  const decrement = () => setQuantity(q => Math.max(1, q - 1));

  // Filter Reviews
  const filteredReviews = useMemo(() => {
    return reviews.filter(r => {
      if (reviewFilter === '5') return r.rating === 5;
      if (reviewFilter === 'Photo') return !!r.image;
      return true;
    });
  }, [reviews, reviewFilter]);

  // Similar Products (Same Category)
  const similarDishes = useMemo(() => {
    return allDishes
      .filter(d => d.category === dish.category && d.id !== dish.id)
      .slice(0, 5);
  }, [allDishes, dish]);

  // Random Recommendations
  const randomDishes = useMemo(() => {
    return [...allDishes]
      .filter(d => d.id !== dish.id && d.category !== dish.category)
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);
  }, [allDishes, dish]);

  const handleAddReview = () => {
    if (!newComment.trim()) return;
    
    const review: Review = {
      id: `r-${Date.now()}`,
      userName: 'Moi',
      userAvatar: '',
      rating: newRating,
      date: 'À l\'instant',
      comment: newComment
    };

    setReviews([review, ...reviews]);
    setNewComment('');
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 relative overflow-hidden">
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-32">
        
        {/* Header Image Area */}
        <div className="relative h-72 w-full">
          <ImageWithSkeleton src={dish.image} alt={dish.name} className="w-full h-full object-cover" />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/40 via-transparent to-transparent pointer-events-none" />
          
          {/* Navbar */}
          <div className="absolute top-6 left-0 w-full px-6 flex justify-between items-center z-10">
            <button onClick={onBack} className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all">
              <ArrowLeft size={24} />
            </button>
            <button 
              onClick={onToggleFavorite}
              className={`w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center transition-all ${isFavorite ? 'text-red-500 bg-white' : 'text-white hover:bg-white/30'}`}
            >
              <Heart size={24} fill={isFavorite ? "currentColor" : "none"} />
            </button>
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-gray-50 -mt-8 rounded-t-[2.5rem] relative z-0 px-6 pt-8 flex flex-col">
          {/* Title & Price */}
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-2xl font-extrabold text-gray-900 w-3/4 leading-tight">{dish.name}</h2>
            <div className="flex flex-col items-end">
              <span className="text-2xl font-black text-orange-500">${(dish.price * quantity).toFixed(3)}</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex items-center gap-3 mb-6 overflow-x-auto no-scrollbar py-1">
            <div className="flex items-center gap-1 text-gray-700 text-xs font-bold bg-white border border-gray-100 px-3 py-1.5 rounded-full shadow-sm shrink-0">
                <Star size={12} className="fill-orange-400 text-orange-400" /> {dish.rating}
            </div>
            <div className="flex items-center gap-1 text-gray-700 text-xs font-bold bg-white border border-gray-100 px-3 py-1.5 rounded-full shadow-sm shrink-0">
                <Flame size={12} className="fill-red-400 text-red-400" /> {dish.calories || 350} cal
            </div>
            <div className="flex items-center gap-1 text-gray-700 text-xs font-bold bg-white border border-gray-100 px-3 py-1.5 rounded-full shadow-sm shrink-0">
                <Clock size={12} className="text-blue-400" /> {dish.deliveryTime} min
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h3 className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wide">Description</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              {dish.description || "Un repas délicieux préparé avec les meilleurs ingrédients pour satisfaire votre faim et ravir vos papilles. Savourez le goût authentique de Bamako."}
            </p>
          </div>

          {/* Similar Products */}
          {similarDishes.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Similaires ({similarDishes.length})</h3>
              <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 -mx-6 px-6">
                {similarDishes.map(simDish => (
                  <div 
                    key={simDish.id} 
                    onClick={() => onDishClick(simDish)}
                    className="w-36 shrink-0 bg-white p-3 rounded-2xl shadow-sm border border-gray-100 active:scale-95 transition-transform"
                  >
                    <div className="w-full h-24 rounded-xl overflow-hidden mb-2">
                       <ImageWithSkeleton src={simDish.image} className="w-full h-full object-cover" />
                    </div>
                    <h4 className="font-bold text-gray-900 text-sm truncate">{simDish.name}</h4>
                    <span className="text-orange-500 font-bold text-xs">${simDish.price.toFixed(3)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Random Recommendations */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Vous aimerez aussi</h3>
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 -mx-6 px-6">
              {randomDishes.map(randDish => (
                <div 
                  key={randDish.id} 
                  onClick={() => onDishClick(randDish)}
                  className="w-64 shrink-0 bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex gap-3 active:scale-95 transition-transform"
                >
                  <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0">
                      <ImageWithSkeleton src={randDish.image} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h4 className="font-bold text-gray-900 text-sm line-clamp-2 leading-tight">{randDish.name}</h4>
                    <span className="text-orange-500 font-bold text-sm mt-1">${randDish.price.toFixed(3)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mb-8">
             <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-900">Avis ({reviews.length})</h3>
                <div className="flex gap-2">
                  {(['All', '5', 'Photo'] as const).map(filter => (
                    <button 
                      key={filter}
                      onClick={() => setReviewFilter(filter)}
                      className={`text-[10px] font-bold px-2 py-1 rounded-lg transition-colors ${reviewFilter === filter ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-500'}`}
                    >
                      {filter === 'All' ? 'Tous' : filter === '5' ? '5 ★' : '📷'}
                    </button>
                  ))}
                </div>
             </div>

             {/* Add Review Box */}
             <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6">
                <div className="flex items-center gap-2 mb-3">
                   {[1,2,3,4,5].map(star => (
                      <button key={star} onClick={() => setNewRating(star)}>
                         <Star size={20} className={`${star <= newRating ? 'fill-orange-400 text-orange-400' : 'text-gray-300'}`} />
                      </button>
                   ))}
                </div>
                <div className="relative">
                  <textarea 
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Partagez votre avis..." 
                    className="w-full bg-gray-50 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-orange-100 pr-10 resize-none h-20"
                  />
                  <div className="absolute bottom-2 right-2 flex gap-2">
                    <button className="p-1.5 bg-gray-200 text-gray-500 rounded-lg hover:bg-gray-300">
                      <Camera size={16} />
                    </button>
                    <button onClick={handleAddReview} className="p-1.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50" disabled={!newComment.trim()}>
                      <Send size={16} />
                    </button>
                  </div>
                </div>
             </div>

             {/* Reviews List */}
             <div className="space-y-4">
               {filteredReviews.map(review => (
                 <div key={review.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-start mb-2">
                       <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                             {review.userAvatar ? <img src={review.userAvatar} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-xs font-bold text-gray-500">{review.userName[0]}</div>}
                          </div>
                          <div>
                            <span className="block font-bold text-sm text-gray-900">{review.userName}</span>
                            <span className="block text-[10px] text-gray-400">{review.date}</span>
                          </div>
                       </div>
                       <div className="flex bg-orange-50 px-1.5 py-0.5 rounded-md">
                          {[...Array(5)].map((_, i) => (
                             <Star key={i} size={10} className={`${i < review.rating ? 'fill-orange-400 text-orange-400' : 'text-gray-300'}`} />
                          ))}
                       </div>
                    </div>
                    <p className="text-gray-600 text-sm leading-snug">{review.comment}</p>
                    {review.image && (
                       <div className="mt-3 w-24 h-24 rounded-xl overflow-hidden">
                          <ImageWithSkeleton src={review.image} className="w-full h-full object-cover" />
                       </div>
                    )}
                 </div>
               ))}
             </div>
          </div>

        </div>
      </div>

      {/* Fixed Bottom Action Bar */}
      <div className="absolute bottom-0 w-full bg-white border-t border-gray-100 p-6 pb-8 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-20">
          <div className="flex items-center justify-between gap-4">
             {/* Quantity */}
             <div className="flex items-center bg-gray-100 rounded-full p-1.5">
              <button onClick={decrement} className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center text-gray-800 hover:scale-105 transition-transform active:scale-95">
                <Minus size={18} />
              </button>
              <span className="w-10 text-center font-bold text-lg">{quantity}</span>
              <button onClick={increment} className="w-10 h-10 bg-gray-900 text-white rounded-full shadow-sm flex items-center justify-center hover:scale-105 transition-transform active:scale-95">
                <Plus size={18} />
              </button>
            </div>

            {/* Add Button */}
            <button 
              onClick={() => onAddToCart(dish, quantity)}
              className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold h-14 rounded-full shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 hover:opacity-90 transition-opacity active:scale-98"
            >
              <ShoppingBag size={20} />
              <span className="text-lg">Ajouter • ${(dish.price * quantity).toFixed(3)}</span>
            </button>
          </div>
      </div>
    </div>
  );
};

export default DishDetailScreen;