import React from 'react';
import { Heart, MessageCircle, Share2, ShoppingBasket, Plus } from 'lucide-react';
import { ImageWithSkeleton } from '../../../components/ui/ImageWithSkeleton';

interface ReelActionsProps {
  onAddToCart: () => void;
  likes: number;
  comments: number;
  chefImage?: string;
}

export const ReelActions: React.FC<ReelActionsProps> = ({ onAddToCart, likes, comments, chefImage }) => (
    <div className="absolute bottom-20 right-2 z-30 flex flex-col items-center gap-5 pb-4">
        {/* Avatar Profile */}
        <div className="relative mb-2">
            <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden shadow-md">
                 <ImageWithSkeleton 
                    src={chefImage || "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=100&q=80"} 
                    className="w-full h-full object-cover" 
                 />
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center border border-white">
                <Plus size={12} className="text-white" />
            </div>
        </div>

        {/* Like */}
        <div className="flex flex-col items-center gap-1">
            <button className="p-2 rounded-full bg-black/20 backdrop-blur-sm active:scale-90 transition-transform">
                <Heart size={28} className="text-white fill-white/10" />
            </button>
            <span className="text-white text-xs font-bold shadow-black drop-shadow-md">{likes}</span>
        </div>

        {/* Comments */}
        <div className="flex flex-col items-center gap-1">
            <button className="p-2 rounded-full bg-black/20 backdrop-blur-sm active:scale-90 transition-transform">
                <MessageCircle size={28} className="text-white fill-white/10" />
            </button>
            <span className="text-white text-xs font-bold shadow-black drop-shadow-md">{comments}</span>
        </div>

        {/* Share */}
        <div className="flex flex-col items-center gap-1">
            <button className="p-2 rounded-full bg-black/20 backdrop-blur-sm active:scale-90 transition-transform">
                <Share2 size={28} className="text-white fill-white/10" />
            </button>
            <span className="text-white text-xs font-bold shadow-black drop-shadow-md">Partager</span>
        </div>

        {/* ORDER BUTTON - Highlighted */}
        <div className="flex flex-col items-center mt-2 animate-bounce">
            <button 
                onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart();
                }}
                className="w-14 h-14 bg-gradient-to-tr from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white shadow-[0_0_20px_rgba(249,115,22,0.6)] border-2 border-white active:scale-90 transition-transform"
            >
                <ShoppingBasket size={24} className="fill-white" />
            </button>
        </div>
    </div>
);