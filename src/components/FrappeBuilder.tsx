import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// 1. Data Structure for our Tropical Selections
const BUILDER_STEPS = [
  {
    id: 'base',
    legend: 'Choose your base',
    options: ['Classic Milk', 'Coconut Water', 'Smoothie', 'Lemonade'],
  },
  {
    id: 'flavors',
    legend: 'Pick your tropical flavors',
    options: ['Mango', 'Passion Fruit', 'Tamarindo', 'Guava', 'Oreo', 'Nutella'],
  },
  {
    id: 'toppings',
    legend: 'Add some maximalist toppings',
    options: ['Whipped Cream', 'Fresh Strawberry', 'Tajín Rim', 'Cheesecake Chunk', 'Biscoff Crumble'],
  }
];

export default function FrappeBuilder() {
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState({
    base: '',
    flavors: [] as string[],
    toppings: [] as string[],
  });

  const isLastStep = step === BUILDER_STEPS.length - 1;

  // 2. Navigation Logic
  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isLastStep) setStep((s) => s + 1);
  };

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    if (step > 0) setStep((s) => s - 1);
  };

  const toggleSelection = (category: string, item: string) => {
    setSelections(prev => {
      if (category === 'base') return { ...prev, base: item };
      
      const currentList = prev[category as 'flavors' | 'toppings'];
      const newList = currentList.includes(item)
        ? currentList.filter(i => i !== item)
        : [...currentList, item];
      
      return { ...prev, [category]: newList };
    });
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      {/* 3. Glassmorphic Panel */}
      <form className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-4xl p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
        
        {/* Progress Indicator */}
        <div className="flex gap-2 mb-8">
          {BUILDER_STEPS.map((_, i) => (
            <div 
              key={i} 
              className={`h-2 flex-grow rounded-full transition-all duration-500 ${i <= step ? 'bg-hot-pink shadow-[0_0_15px_rgba(255,105,180,0.5)]' : 'bg-white/10'}`} 
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.fieldset
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: "backOut" }}
            className="border-none p-0 m-0"
          >
            {/* 4. W3C Semantics */}
            <legend className="text-3xl md:text-4xl font-black uppercase italic text-white mb-8 tracking-tighter">
              {BUILDER_STEPS[step].legend}
            </legend>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {BUILDER_STEPS[step].options.map((option) => {
                const isSelected = step === 0 
                  ? selections.base === option 
                  : selections[BUILDER_STEPS[step].id as 'flavors' | 'toppings'].includes(option);

                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => toggleSelection(BUILDER_STEPS[step].id, option)}
                    className={`p-5 rounded-2xl font-bold uppercase tracking-widest text-sm transition-all border-2 flex items-center justify-between
                      ${isSelected 
                        ? 'bg-hot-pink border-white shadow-lg scale-[1.02] text-white' 
                        : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:border-white/30'
                      }`}
                  >
                    {option}
                    {isSelected && <span>✨</span>}
                  </button>
                );
              })}
            </div>
          </motion.fieldset>
        </AnimatePresence>

        {/* 5. Navigation Controls */}
        <div className="flex justify-between mt-12 gap-4">
          <button
            onClick={handleBack}
            disabled={step === 0}
            className="px-8 py-4 rounded-full font-black uppercase text-xs tracking-widest bg-white/10 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/20 transition-all"
          >
            Back
          </button>

          <button
            onClick={isLastStep ? (e) => e.preventDefault() : handleNext}
            className="px-10 py-4 rounded-full font-black uppercase text-xs tracking-widest bg-emerald hover:bg-tropical-teal text-white shadow-xl hover:scale-105 transition-all"
          >
            {isLastStep ? 'Add to Paradise' : 'Next Step'}
          </button>
        </div>
      </form>

      {/* Subtle Recap Section */}
      <div className="mt-8 text-center text-white/40 text-xs font-bold uppercase tracking-widest">
        Current Mix: {selections.base || '...'} {selections.flavors.length > 0 && `+ ${selections.flavors.length} Flavors`}
      </div>
    </div>
  );
}