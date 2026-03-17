<template>
  <div class="relative w-full aspect-[9/16] max-w-[360px] mx-auto group">
    <div 
      v-if="!isLoaded"
      class="absolute inset-0 z-10 animate-pulse bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 flex flex-col items-center justify-center space-y-4"
    >
      <div class="w-12 h-12 rounded-full bg-hot-pink/20"></div>
      <div class="w-24 h-4 bg-white/20 rounded-full"></div>
    </div>

    <iframe
      :src="`https://www.facebook.com/plugins/video.php?height=476&href=${encodeURIComponent(url)}&show_text=false&width=267&t=0`"
      :title="description"
      class="w-full h-full rounded-3xl shadow-2xl transition-opacity duration-700"
      :class="{ 'opacity-0': !isLoaded, 'opacity-100': isLoaded }"
      frameborder="0"
      allowfullscreen="true"
      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
      @load="isLoaded = true"
    ></iframe>
  </div>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  url: { type: String, required: true },
  description: { type: String, required: true }
});

const isLoaded = ref(false);
</script>