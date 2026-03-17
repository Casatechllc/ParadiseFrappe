import { motion } from 'motion/react';

interface FlavorOptionProps {
  id: string;
  name: string; // The form field name (e.g., 'flavors')
  value: string;
  label: string;
  type?: 'checkbox' | 'radio';
  checked: boolean;
  onChange: (value: string) => void;
}

export default function FlavorOption({
  id,
  name,
  value,
  label,
  type = 'checkbox',
  checked,
  onChange,
}: FlavorOptionProps) {
  return (
    <div className="relative group">
      {/* 1. Visually Hidden Accessible Input */}
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="sr-only peer" // Hidden but focusable & enables peer styling
      />

      {/* 2. Tactile Gummy Label */}
      <label
        htmlFor={id}
        className={`
          relative flex items-center justify-between min-h-[56px] px-6 py-4 
          cursor-pointer select-none rounded-2xl transition-all duration-300
          text-sm font-black uppercase tracking-widest
          
          /* Default State: Glassmorphic */
          bg-white/5 border-2 border-white/10 text-white/70 
          backdrop-blur-md shadow-sm
          
          /* Checked State: Vibrant Gummy */
          peer-checked:border-white peer-checked:text-white
          peer-checked:bg-linear-to-br peer-checked:from-hot-pink peer-checked:to-tropical-teal
          peer-checked:shadow-[0_10px_25px_rgba(255,105,180,0.4)]
          peer-checked:inset-shadow-sm peer-checked:inset-shadow-white/40
          
          /* Focus & Hover States */
          hover:bg-white/10 hover:border-white/20
          peer-focus-visible:ring-4 peer-focus-visible:ring-emerald peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-gray-950
          active:scale-95
        `}
      >
        <span className="relative z-10 drop-shadow-sm">{label}</span>

        {/* 3. Motion Shared Layout Highlight */}
        {checked && (
          <motion.div
            layoutId="selected-flavor-highlight"
            className="absolute inset-0 bg-white/10 rounded-[14px] z-0"
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}

        {/* Squishy shine effect for checked state */}
        <div className="absolute top-2 left-3 w-1/3 h-2 bg-white/20 blur-[2px] rounded-full opacity-0 peer-checked:opacity-100 transition-opacity" />
      </label>
    </div>
  );
}