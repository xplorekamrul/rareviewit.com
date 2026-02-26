"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

interface ImageSliderProps {
   images: string[];
   alt: string;
   autoScrollInterval?: number;
}

export function ImageSlider({
   images,
   alt,
   autoScrollInterval = 5000,
}: ImageSliderProps) {
   const [currentIndex, setCurrentIndex] = useState(0);
   const [isHovering, setIsHovering] = useState(false);
   const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set([0]));

   // Auto-scroll effect
   useEffect(() => {
      if (isHovering || images.length <= 1) return;

      const interval = setInterval(() => {
         setCurrentIndex((prev) => (prev + 1) % images.length);
      }, autoScrollInterval);

      return () => clearInterval(interval);
   }, [isHovering, images.length, autoScrollInterval]);

   // Preload adjacent images
   useEffect(() => {
      const nextIndex = (currentIndex + 1) % images.length;
      const prevIndex = (currentIndex - 1 + images.length) % images.length;
      setLoadedImages((prev) => new Set([...prev, currentIndex, nextIndex, prevIndex]));
   }, [currentIndex, images.length]);

   const goToPrevious = () => {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
   };

   const goToNext = () => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
   };

   if (images.length === 0) {
      return (
         <div className="relative aspect-video overflow-hidden rounded-lg bg-muted flex items-center justify-center">
            <p className="text-muted-foreground">No images available</p>
         </div>
      );
   }

   return (
      <div
         className="relative aspect-video overflow-hidden rounded-lg group bg-muted"
         onMouseEnter={() => setIsHovering(true)}
         onMouseLeave={() => setIsHovering(false)}
      >
         {/* Images */}
         <div className="relative h-full w-full">
            {images.map((image, index) => (
               <img
                  key={`${index}-${image}`}
                  src={image}
                  alt={`${alt} - ${index + 1}`}
                  loading={index === 0 ? "eager" : "lazy"}
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${index === currentIndex ? "opacity-100" : "opacity-0"
                     }`}
                  onError={(e) => {
                     console.error(`Failed to load image: ${image}`);
                     (e.target as HTMLImageElement).style.display = "none";
                  }}
               />
            ))}
         </div>

         {/* Navigation Buttons */}
         {images.length > 1 && (
            <>
               {/* Previous Button */}
               <button
                  onClick={goToPrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/50 p-2 text-white opacity-0 transition-opacity duration-300 hover:bg-black/70 group-hover:opacity-100 cursor-pointer"
                  aria-label="Previous image"
               >
                  <ChevronLeft size={24} />
               </button>

               {/* Next Button */}
               <button
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/50 p-2 text-white opacity-0 transition-opacity duration-300 hover:bg-black/70 group-hover:opacity-100 cursor-pointer"
                  aria-label="Next image"
               >
                  <ChevronRight size={24} />
               </button>

               {/* Indicators */}
               <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
                  {images.map((_, index) => (
                     <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${index === currentIndex
                              ? "w-8 bg-white"
                              : "w-2 bg-white/50 hover:bg-white/75"
                           }`}
                        aria-label={`Go to image ${index + 1}`}
                     />
                  ))}
               </div>

               {/* Image Counter */}
               <div className="absolute top-4 right-4 z-10 rounded-full bg-black/50 px-3 py-1 text-sm text-white">
                  {currentIndex + 1} / {images.length}
               </div>
            </>
         )}
      </div>
   );
}
