import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0, active: false });

  return (
    <div className="flex gap-4">
      {/* Thumbnails */}
      <div className="flex flex-col gap-3 w-16 flex-shrink-0">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setSelectedImage(i)}
            className={cn(
              'w-16 h-20 overflow-hidden border-2 transition-colors flex-shrink-0',
              selectedImage === i
                ? 'border-foreground'
                : 'border-transparent hover:border-border'
            )}
          >
            <img
              src={img}
              alt={`${productName} ${i + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main image with zoom */}
      <div
        className="flex-1 relative overflow-hidden bg-secondary group"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setZoomPos({
            x: ((e.clientX - rect.left) / rect.width) * 100,
            y: ((e.clientY - rect.top) / rect.height) * 100,
            active: true,
          });
        }}
        onMouseLeave={() => setZoomPos((z) => ({ ...z, active: false }))}
        style={{ aspectRatio: '4/5' }}
      >
        <img
          src={images[selectedImage]}
          alt={productName}
          className="w-full h-full object-cover"
          style={{
            transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
            transform: zoomPos.active ? 'scale(1.5)' : 'scale(1)',
            transition: zoomPos.active ? 'none' : 'transform 0.3s',
          }}
        />
        <div className="absolute bottom-3 right-3 bg-white/80 backdrop-blur-sm p-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <ZoomIn className="w-4 h-4 text-foreground" />
        </div>
        <button
          onClick={() => setSelectedImage((i) => Math.max(0, i - 1))}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={() => setSelectedImage((i) => Math.min(images.length - 1, i + 1))}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Next image"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
