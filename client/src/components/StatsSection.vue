<template>
  <section class="py-16 lg:py-20 bg-cream">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
        <div
          v-for="(stat, index) in stats"
          :key="index"
          class="text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
        >
          <div class="text-3xl lg:text-4xl font-black text-navy mb-2">{{ stat.value }}</div>
          <div class="text-sm text-gray-500 font-medium">{{ stat.label }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const stats = [
  { value: '50+', label: '队员人数' },
  { value: '15', label: '建队年份' },
  { value: '120+', label: '获奖数量' },
  { value: '8', label: '训练项目' }
]
</script>
