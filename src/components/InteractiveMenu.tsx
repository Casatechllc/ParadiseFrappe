import { useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'motion/react';

interface MenuItem {
  name: string;
  price?: string;
  description?: string;
  image?: OptimizedMenuImage;
}

interface Category {
  id: string;
  label: string;
  items: MenuItem[];
  note?: string;
}

export interface OptimizedMenuImage {
  src: string;
  attributes: {
    width: number;
    height: number;
  };
}

const MENU_DATA: Category[] = [
  {
    id: 'fruit',
    label: 'Fruit Flavors',
    items: [
      { name: "Mixed Fruit" }, { name: "Mango" }, { name: "Mango Pineapple" },
      { name: "Mango Berry" }, { name: "Cocolimón" }, { name: "Mangonada w/ Tajín" },
      { name: "Passion Fruit" }
    ]
  },
  
  {
    id: 'chocolate',
    label: 'Chocolate',
    // Added Biscoff and specific Brownie Cheesecake from the new image
    items: [
      { name: "Oreo" }, 
      { name: "Reese's" }, 
      { name: "Snickers" },
      { name: "M&M's" }, 
      { name: "Nutella" }, 
      { name: "Tronky" },
      { name: "Ferrero" }, 
      { name: "Kinder Bueno" },
      { name: "Brownie Cheesecake" },
      { name: "Biscoff" }
    ],
    // Senior Engineer Move: Added a footer note for the Cheesecake upsell
    note: "Add Cheesecake to any Chocolate flavor for $2 Extra!"
  },
  {
    id: 'acai',
    label: 'Acai Bowls',
    items: [
      { name: "Basic", description: "Acai, Granola, Honey, 2 Fruits" },
      { name: "Everything", description: "Coconut Oil, Coco Flakes, Almonds, Nutella" }
    ]
  },
  {
    id: 'limbers',
    label: 'Limbers',
    items: [
      { name: "Coco" }, { name: "Tamarindo" }, { name: "Guava" },
      { name: "Guanabana" }, { name: "Mantecado" }, { name: "Bizcocho" }
    ]
  }
];


export default function InteractiveMenu({ initialMenuData }: InteractiveMenuProps) {
  // 3. FIX: Check if initialMenuData exists before using it
  if (!initialMenuData || initialMenuData.length === 0) return null;

  const [activeTab, setActiveTab] = useState(initialMenuData[0].id);
  const [expandedImage, setExpandedImage] = useState<OptimizedMenuImage | null>(null);

  const currentCategory = initialMenuData.find(c => c.id === activeTab);

  return (
    <LayoutGroup>
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Category Tabs */}
        <div role="tablist" aria-label="Menu Categories" className="flex flex-wrap justify-center gap-4 mb-16 bg-white/5 p-2 rounded-3xl backdrop-blur-md border border-white/10">
          {initialMenuData.map((cat) => (
            <button 
              key={cat.id} 
              role="tab" 
              aria-selected={activeTab === cat.id} 
              onClick={() => setActiveTab(cat.id)} 
              className={`relative px-8 py-3 text-sm font-black uppercase tracking-widest transition-colors z-10 ${activeTab === cat.id ? "text-white" : "text-emerald hover:text-hot-pink"}`}
            >
              {activeTab === cat.id && ( 
                <motion.div 
                  layoutId="activeTab" 
                  className="absolute inset-0 bg-hot-pink rounded-2xl shadow-[0_0_20px_rgba(255,105,180,0.4)]" 
                  transition={{ type: "spring", bounce: 0.25, duration: 0.5 }} 
                /> 
              )}
              <span className="relative z-20">{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Item Grid */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeTab} 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -20 }} 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
          >
            {currentCategory?.items.map((item) => (
              <div 
                key={item.name}
                onClick={() => item.image && setExpandedImage(item.image)}
                /* FIX: We moved the "Shine" into Tailwind pseudo-classes (after:...) 
                   This creates the same highlight without the <style> error.
                */
                className="group relative z-0 aspect-square flex flex-col items-center justify-center text-center p-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-lg hover:scale-105 transition-all duration-300 overflow-hidden cursor-pointer
                           after:content-[''] after:absolute after:top-[10%] after:left-[10%] after:w-[35%] after:h-[25%] after:bg-white/40 after:blur-md after:rounded-full after:z-30 after:pointer-events-none hover:after:bg-white/60 hover:after:scale-110"
              >
                {item.image && (
                  <motion.img 
                    src={item.image.src}
                    alt="" 
                    layoutId={`menu-img-${item.name}`} 
                    className="absolute inset-0 w-full h-full object-cover -z-10 opacity-30 blur-sm group-hover:blur-0 group-hover:opacity-60 transition-all duration-300"
                    width={item.image.attributes?.width}
                    decoding="async"
                  />
                )}
                <h3 className="relative z-10 text-lg md:text-xl font-black uppercase text-white group-hover:text-yellow-300 transition-colors drop-shadow-md">
                  {item.name}
                </h3>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Modal Expansion */}
        <AnimatePresence>
          {expandedImage && (
            <motion.div
              className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-4 md:p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="absolute inset-0 bg-black/80 backdrop-blur-3xl" onClick={() => setExpandedImage(null)} />
              <div className="relative z-10 max-w-7xl max-h-[90vh] flex flex-col items-center gap-6">
                <motion.img
                  src={expandedImage.src}
                  alt="Expanded view"
                  layoutId={`menu-img-${initialMenuData.flatMap(c => c.items).find(i => i.image?.src === expandedImage.src)?.name}`}
                  className="max-w-full max-h-[80vh] rounded-3xl shadow-[0_0_80px_rgba(255,105,180,0.6)] border-2 border-white/20 object-contain"
                />
                <button
                  onClick={() => setExpandedImage(null)}
                  className="px-10 py-4 bg-linear-to-r from-yellow-400 to-hot-pink rounded-full text-white font-black uppercase shadow-xl"
                >
                  Close
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </LayoutGroup>
  );
}
