import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite'; // The Vite plugin
import react from '@astrojs/react';

import vue from '@astrojs/vue';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()], // This is where v4 lives now
  },

  image: {
    domains: ['placehold.co'],
  },

  // REMOVED: tailwind() from here
  integrations: [react(), vue()],
});