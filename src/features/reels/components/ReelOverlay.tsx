import React from 'react';
import { ChefHat, Music2 } from 'lucide-react';
import { Reel } from '../../../types';

interface ReelOverlayProps {
  reel: Reel;
}

export const ReelOverlay: React.FC<ReelOverlayProps> = ({ reel }) => (
    <div className="absolute bottom-0 left-0 w-full z-20 pointer-events-none">
        {/* Gradient Background for readability */}
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        <div className="relative p-4 pb-24 flex flex-col items-start gap-2 w-[80%]">
            {/* Chef Name */}
            <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-base text-white shadow-black drop-shadow-md tracking-wide">
                    @{reel.chefName}
                </span>
                <span className="bg-white/20 text-[10px] px-1.5 py-0.5 rounded text-white backdrop-blur-md">
                    Creator
                </span>
            </div>

            {/* Description & Title */}
            <div className="mb-2">
                <h3 className="font-bold text-sm text-white mb-1 drop-shadow-md">{reel.title}</h3>
                <p className="text-sm text-gray-200 font-light line-clamp-2 drop-shadow-sm leading-snug">
                    {reel.description} <span className="font-bold text-white cursor-pointer">...plus</span>
                </p>
            </div>

            {/* Price Tag */}
            <div className="flex items-center gap-3">
                <div className="bg-orange-500 text-white px-3 py-1 rounded-lg shadow-lg flex items-center gap-1 animate-pulse">
                    <span className="text-xs font-bold">Prix</span>
                    <span className="text-sm font-black">${reel.price.toFixed(3)}</span>
                </div>
            </div>

            {/* Music ticker simulation */}
            <div className="flex items-center gap-2 mt-3 opacity-80">
                <Music2 size={12} className="text-white" />
                <div className="text-xs text-white overflow-hidden whitespace-nowrap w-40">
                    <span className="animate-marquee inline-block">Son original - {reel.chefName} • SnapMeal Music</span>
                </div>
            </div>
        </div>
    </div>
);