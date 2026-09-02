<template>
  <section class="py-16 lg:py-24 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12 lg:mb-16">
        <span class="inline-block px-3 py-1 bg-navy/10 text-navy text-xs font-bold uppercase tracking-wider rounded-full mb-4">新闻动态</span>
        <h2 class="text-3xl lg:text-4xl font-black text-gray-900">最新资讯</h2>
        <p class="mt-4 text-gray-500 max-w-2xl mx-auto">了解校游泳队的最新动态、比赛成绩和活动精彩瞬间</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(news, index) in newsList"
          :key="index"
          class="group bg-cream rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
          <div class="relative h-48 overflow-hidden bg-navy/10">
            <img v-if="news.image" :src="news.image" :alt="news.title" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            <div v-else class="w-full h-full flex items-center justify-center">
              <svg class="w-16 h-16 text-navy/20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
            </div>
            <div class="absolute top-4 left-4">
              <span class="px-3 py-1 bg-navy text-white text-xs font-bold rounded-full">{{ news.category }}</span>
            </div>
          </div>
          <div class="p-6">
            <div class="flex items-center text-sm text-gray-400 mb-3">
              <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
              {{ news.date }}
            </div>
            <h3 class="text-lg font-bold text-gray-900 mb-3 group-hover:text-navy transition-colors line-clamp-2">{{ news.title }}</h3>
            <p class="text-sm text-gray-500 leading-relaxed line-clamp-3">{{ news.excerpt }}</p>
            <div class="mt-4 pt-4 border-t border-gray-100">
              <span class="text-sm font-medium text-navy group-hover:underline">阅读全文 →</span>
            </div>
          </div>
        </div>
      </div>

      <div class="text-center mt-12">
        <router-link to="/news" class="inline-flex items-center px-8 py-3.5 bg-navy text-white font-bold rounded-full hover:bg-navy-dark transition-all duration-300 hover:shadow-lg hover:shadow-navy/30">
          查看全部新闻
          <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
          </svg>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getNewsList } from '../utils/api'

const newsList = ref([
  {
    title: '我校游泳队在省大学生运动会中斩获3金2银',
    excerpt: '在刚刚落幕的省大学生运动会游泳比赛中，我校游泳队运动员发挥出色，共获得3枚金牌、2枚银牌和4枚铜牌的优异成绩。',
    date: '2026-04-28',
    category: '赛事',
    image: ''
  },
  {
    title: '2026年春季校游泳队纳新工作圆满完成',
    excerpt: '经过为期两周的选拔与面试，校游泳队2026年春季纳新工作已圆满完成，共有25名新队员正式加入校游泳队大家庭。',
    date: '2026-04-15',
    category: '队务',
    image: ''
  },
  {
    title: '校游泳队开展水上安全知识宣传活动',
    excerpt: '为提高全校师生的水上安全意识，校游泳队联合校团委开展了水上安全知识宣传活动，现场参与人数超过200人。',
    date: '2026-04-01',
    category: '活动',
    image: ''
  }
])

onMounted(async () => {
  try {
    const res = await getNewsList({ page: 1, limit: 3 })
    if (res.data && res.data.length > 0) {
      newsList.value = res.data
    }
  } catch (e) {
    // 使用默认数据
  }
})
</script>
