import React, { useRef } from 'react';
import { Reel } from '../../../shared/types';
import { ReelVideo } from './ReelVideo';
import { useInView } from 'react-intersection-observer';

interface ReelItemProps {
    reel: Reel;
    onAddToCart: () => void;
}

export const ReelItem: React.FC<ReelItemProps> = ({ reel, onAddToCart }) => {
  // Use Intersection Observer Hook to detect if this specific reel is on screen
  const { ref, inView } = useInView({
    threshold: 0.6, // Trigger when 60% visible
  });

  // Convert ref to legacy ref for container if needed, or just wrap
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div 
        ref={(node) => {
            ref(node);
            // @ts-ignore
            containerRef.current = node;
        }} 
        className="h-full w-full relative snap-start snap-always bg-black overflow-hidden shrink-0"
    >
      <ReelVideo 
        reel={reel} 
        onAddToCart={onAddToCart} 
        containerRef={containerRef} 
        isActive={inView}
      />
    </div>
  );
};