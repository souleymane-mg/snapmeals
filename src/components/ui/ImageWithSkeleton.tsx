import React, { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';

interface ImageWithSkeletonProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
}

export const ImageWithSkeleton: React.FC<ImageWithSkeletonProps> = ({ className, src, alt, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-gray-100 ${className}`}>
      {/* Skeleton / Loading State */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 z-10 bg-gray-200 animate-pulse flex items-center justify-center">
          <ImageIcon className="text-gray-300 w-1/3 h-1/3 opacity-50" />
        </div>
      )}

      {/* Actual Image */}
      <img
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
            setIsLoaded(true);
            setHasError(true);
        }}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        {...props}
      />
      
      {/* Error Fallback */}
      {hasError && (
          <div className="absolute inset-0 z-20 bg-gray-100 flex items-center justify-center text-gray-400 text-xs">
              Image non disponible
          </div>
      )}
    </div>
  );
};