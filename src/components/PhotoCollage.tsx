import { useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'motion/react';

// 1. Image Optimization Prop Type
// We must accept optimized data from Astro to prevent CLS.
export interface OptimizedImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  id: string; // Used for the LayoutGroup ID
}

interface PhotoCollageProps {
  images: OptimizedImage[];
}

export default function PhotoCollage({ images }: PhotoCollageProps) {
  // 2. Modal State Management
  const [activeImage, setActiveImage] = useState<OptimizedImage | null>(null);

  return (
    // 3. Shared Element Transition Wrapper
    // LayoutGroup ensures the expanding image seamless transitions from grid to modal
    <LayoutGroup>
      <section aria-labelledby="collage-heading" class="py-16 px-4">
        <h2 id="collage-heading" class="sr-only">Photo Gallery</h2>

        {/* 4. Masonry Layout using Tailwind Columns */}
        <div class="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {images.map((img) => (
            // break-inside-avoid prevents images from splitting between columns
            <div key={img.id} class="break-inside-avoid">
              <motion.img
                src={img.src}
                alt={img.alt}
                width={img.width}
                height={img.height}
                layoutId={`img-${img.id}`} // The anchor for the shared element motion
                // 5. Tactile Maximalism & Gummy Styles
                class="w-full h-auto cursor-pointer rounded-2xl shadow-lg border border-white/10"
                // 6. Interaction
                whileHover={{ scale: 1.02, rotate: '1deg' }}
                onClick={() => setActiveImage(img)}
                // Performance: Images are already optimized, but let's encourage good decoding
                decoding="async"
              />
            </div>
          ))}
        </div>
      </section>

      {/* 7. W3C Modal Accessibility */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            class="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
            role="dialog" // Identifies it as a dialog
            aria-modal="true" // Tells screen readers page content is inert
            aria-label={`Expanded view of ${activeImage.alt}`}
            // 8. Backdrop Blur & Overlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Click overlay to close */}
            <div 
              class="absolute inset-0 bg-black/70 backdrop-blur-xl" 
              onClick={() => setActiveImage(null)}
              aria-hidden="true" 
            />

            <div class="relative z-10 max-w-7xl max-h-[90vh] flex flex-col items-center gap-6">
              {/* The expanded image using the same layoutId */}
              <motion.img
                src={activeImage.src}
                alt={activeImage.alt}
                layoutId={`img-${activeImage.id}`}
                class="max-w-full max-h-[80vh] rounded-3xl shadow-[0_0_60px_rgba(255,105,180,0.5)] border-2 border-white/20 object-contain"
              />

              {/* 9. Gummy Pill Close Button */}
              <motion.button
                onClick={() => setActiveImage(null)}
                aria-label="Close image"
                // Gummy Specs: Linear gradient, round-full, scale hover, focus visible
                class:list={[
                  "px-8 py-3 text-sm font-black uppercase tracking-widest text-white transition-all",
                  "bg-linear-to-r from-yellow-400 to-hot-pink rounded-full select-none",
                  "shadow-xl hover:shadow-[0_10px_30px_rgba(255,105,180,0.4)]",
                  "inset-shadow-sm inset-shadow-white/60 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-yellow-400"
                ]}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Close
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </LayoutGroup>
  );
}