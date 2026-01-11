import React, { useMemo } from 'react';
import { Dish } from '../../../shared/types';
import { ReelItem } from '../components/ReelItem';

interface ReelsScreenProps {
  onDishClick: (dishId: string) => void;
  onAddToCart?: (dish: Dish) => void;
  dishes: Dish[];
}

const ReelsScreen: React.FC<ReelsScreenProps> = ({ onDishClick, onAddToCart, dishes }) => {
  // Generate Reels ONLY from dishes that have a videoUrl
  const reels = useMemo(() => {
    return dishes
      .filter(d => d.videoUrl && d.videoUrl.trim() !== '')
      .map(d => ({
        id: `reel-${d.id}`,
        videoUrl: d.videoUrl || '',
        title: d.name,
        chefName: '@TastyBurger',
        description: d.description || 'Découvrez ce plat incroyable sur SnapMeal !',
        price: d.price,
        dishId: d.id,
        likes: Math.floor(Math.random() * 2000) + 100,
        comments: Math.floor(Math.random() * 100) + 10
      }));
  }, [dishes]);

  if (reels.length === 0) {
      return (
          <div className="h-[100dvh] w-full bg-black flex flex-col items-center justify-center text-white p-6 text-center">
              <p className="text-lg font-bold mb-2">Aucune vidéo disponible 😔</p>
              <p className="text-gray-400 text-sm">Les restaurateurs n'ont pas encore posté de Reels.</p>
          </div>
      )
  }

  return (
    <div className="relative h-[100dvh] w-full bg-black">
      {/* Tabs Overlay (Following / For You) */}
      <div className="absolute top-14 left-0 right-0 z-40 flex justify-center items-center gap-4 text-white font-bold drop-shadow-md pointer-events-none">
          <span className="text-white/60 text-sm">Suivis</span>
          <div className="w-[1px] h-3 bg-white/40"></div>
          <span className="text-white text-base border-b-2 border-white pb-0.5">Pour toi</span>
      </div>

      {/* Scroll Container - Strict Snap Logic */}
      <div className="h-full w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar">
        {reels.map((reel) => (
          <ReelItem 
            key={reel.id} 
            reel={reel} 
            onAddToCart={() => {
               if (onAddToCart && reel.dishId) {
                  const dish = dishes.find(d => d.id === reel.dishId);
                  if (dish) onAddToCart(dish);
               }
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ReelsScreen;