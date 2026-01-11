import React, { useRef, useState, useEffect } from 'react';
import { Loader2, VolumeX, Volume2, Play } from 'lucide-react';
import { Reel } from '../../../types';
import { ReelOverlay } from './ReelOverlay';
import { ReelActions } from './ReelActions';

interface ReelVideoProps {
  reel: Reel;
  onAddToCart: () => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
  isActive: boolean; // Prop to know if this reel is currently focused
}

export const ReelVideo: React.FC<ReelVideoProps> = ({ reel, onAddToCart, containerRef, isActive }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Autoplay Logic based on `isActive` prop
  useEffect(() => {
    if (isActive) {
        // Try to play
        if (videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.muted = true; // Force mute for autoplay policy
            setIsMuted(true);
            
            const playPromise = videoRef.current.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    setIsPlaying(true);
                    setIsLoading(false);
                }).catch(err => {
                    console.warn("Autoplay prevented:", err);
                    setIsPlaying(false);
                });
            }
        }
    } else {
        // Pause if not active
        if (videoRef.current) {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    }
  }, [isActive]);

  const togglePlay = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (videoRef.current) {
          if (isPlaying) {
              videoRef.current.pause();
              setIsPlaying(false);
          } else {
              videoRef.current.play();
              setIsPlaying(true);
          }
      }
  };

  const toggleMute = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (videoRef.current) {
          videoRef.current.muted = !videoRef.current.muted;
          setIsMuted(videoRef.current.muted);
      }
  };

  return (
      <div className="w-full h-full bg-black relative" onClick={togglePlay}>
          {/* Loader */}
          {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/20 backdrop-blur-sm pointer-events-none">
                   <Loader2 className="w-10 h-10 text-white/80 animate-spin" />
              </div>
          )}
          
          {/* Native Video Player */}
          {/* StyleSheet.absoluteFill equivalent */}
          <video
              ref={videoRef}
              src={reel.videoUrl}
              className="absolute inset-0 w-full h-full object-cover" 
              loop
              muted={true}
              playsInline={true}
              onLoadedData={() => setIsLoading(false)}
              onWaiting={() => setIsLoading(true)}
              onPlaying={() => setIsLoading(false)}
          />

          {/* Center Play/Pause Icon Animation */}
          {!isPlaying && !isLoading && (
             <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none animate-in fade-in zoom-in duration-200">
                <div className="bg-black/40 p-4 rounded-full backdrop-blur-sm">
                    <Play className="w-12 h-12 text-white fill-white" />
                </div>
             </div>
          )}

          {/* Mute Toggle */}
          <button 
              onClick={toggleMute}
              className="absolute top-20 right-4 z-40 p-2 bg-black/20 backdrop-blur-md rounded-full text-white hover:bg-black/40 transition-colors"
          >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
          
          {/* Native Overlays - Position Absolute z-index higher than video */}
          <ReelOverlay reel={reel} />
          <ReelActions 
            onAddToCart={onAddToCart} 
            likes={reel.likes} 
            comments={reel.comments} 
          />
      </div>
  );
};