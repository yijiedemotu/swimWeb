<template>
  <div class="min-h-screen bg-cream">
    <section class="relative pt-32 pb-16 lg:pt-40 lg:pb-24 bg-navy overflow-hidden">
      <div class="absolute inset-0" style="background-image: url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23ffffff&quot; fill-opacity=&quot;0.05&quot;%3E%3Cpath d=&quot;M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"></div>
      <div class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cream to-transparent"></div>
      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span class="inline-block px-4 py-1.5 bg-white/10 text-white/90 text-sm font-medium rounded-full mb-6 backdrop-blur-sm border border-white/20">新闻动态</span>
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6">最新资讯</h1>
        <p class="text-lg text-white/60 max-w-2xl mx-auto">了解校游泳队的最新动态、赛事成绩和活动精彩瞬间</p>
      </div>
    </section>

    <section class="py-16 lg:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-wrap justify-center gap-3 mb-12">
          <button
            v-for="cat in categories"
            :key="cat.value"
            @click="activeCategory = cat.value"
            class="px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200"
            :class="activeCategory === cat.value ? 'bg-navy text-white shadow-lg shadow-navy/30' : 'bg-white text-gray-600 hover:bg-navy/5'"
          >
            {{ cat.label }}
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="news in filteredNews"
            :key="news.id"
            class="group bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            @click="openDetail(news)"
          >
            <div class="relative h-48 overflow-hidden bg-navy/10">
              <img v-if="news.image" :src="news.image" :alt="news.title" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div v-else class="w-full h-full flex items-center justify-center bg-gradient-to-br from-navy/10 to-navy/5">
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

        <div v-if="filteredNews.length === 0" class="text-center py-16">
          <svg class="w-20 h-20 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/>
          </svg>
          <p class="text-gray-400 text-lg">暂无相关新闻</p>
        </div>
      </div>
    </section>

    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="showDetail" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" @click.self="showDetail = false">
        <div class="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl">
          <div class="relative h-56 overflow-hidden bg-navy/10 rounded-t-2xl">
            <img v-if="selectedNews?.image" :src="selectedNews.image" :alt="selectedNews.title" class="w-full h-full object-cover" />
            <div v-else class="w-full h-full flex items-center justify-center bg-gradient-to-br from-navy to-navy-dark">
              <svg class="w-20 h-20 text-white/20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
            </div>
            <button @click="showDetail = false" class="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/40 transition-colors">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
          <div class="p-8">
            <div class="flex items-center gap-3 mb-4">
              <span class="px-3 py-1 bg-navy/10 text-navy text-xs font-bold rounded-full">{{ selectedNews?.category }}</span>
              <span class="text-sm text-gray-400">{{ selectedNews?.date }}</span>
            </div>
            <h2 class="text-2xl font-black text-gray-900 mb-4">{{ selectedNews?.title }}</h2>
            <p class="text-gray-600 leading-relaxed">{{ selectedNews?.content || selectedNews?.excerpt }}</p>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { getNewsList } from '../utils/api'

const activeCategory = ref('all')
const showDetail = ref(false)
const selectedNews = ref(null)

const categories = [
  { label: '全部', value: 'all' },
  { label: '赛事', value: '赛事' },
  { label: '队务', value: '队务' },
  { label: '活动', value: '活动' },
  { label: '公告', value: '公告' }
]

const newsList = ref([
  { id: 1, title: '我校游泳队在省大学生运动会中斩获3金2银', excerpt: '在刚刚落幕的省大学生运动会游泳比赛中，我校游泳队运动员发挥出色，共获得3枚金牌、2枚银牌和4枚铜牌的优异成绩。这是我校游泳队近年来取得的最佳战绩，充分展现了队伍的实力和风采。', content: '在刚刚落幕的省大学生运动会游泳比赛中，我校游泳队运动员发挥出色，共获得3枚金牌、2枚银牌和4枚铜牌的优异成绩。\n\n本次比赛共有来自全省32所高校的300余名运动员参赛。我校游泳队派出18名运动员参加了多个项目的角逐。其中，队长张明远在男子200米自由泳中以1分52秒的成绩夺得金牌，李思涵在女子100米蝶泳中以1分02秒的成绩摘金，混合泳接力队也以优异的表现获得团体金牌。\n\n这是我校游泳队近年来取得的最佳战绩，充分展现了队伍的实力和风采。', date: '2026-04-28', category: '赛事', image: '' },
  { id: 2, title: '2026年春季校游泳队纳新工作圆满完成', excerpt: '经过为期两周的选拔与面试，校游泳队2026年春季纳新工作已圆满完成，共有25名新队员正式加入校游泳队大家庭。', content: '经过为期两周的选拔与面试，校游泳队2026年春季纳新工作已圆满完成，共有25名新队员正式加入校游泳队大家庭。\n\n本次纳新共收到120余份报名申请，经过体能测试、游泳技术考核和面试等环节的严格筛选，最终25名优秀同学脱颖而出。新队员来自体育学院、计算机学院、经管学院等12个不同学院，展现了游泳运动在校园中的广泛影响力。', date: '2026-04-15', category: '队务', image: '' },
  { id: 3, title: '校游泳队开展水上安全知识宣传活动', excerpt: '为提高全校师生的水上安全意识，校游泳队联合校团委开展了水上安全知识宣传活动，现场参与人数超过200人。', content: '为提高全校师生的水上安全意识，校游泳队联合校团委于4月1日在校园广场开展了水上安全知识宣传活动。\n\n活动现场设置了知识展板、互动体验、急救演示等多个环节。校游泳队的队员们亲自示范了水中自救、岸上急救等实用技能，并邀请同学们参与体验。现场参与人数超过200人，发放安全知识手册300余份。', date: '2026-04-01', category: '活动', image: '' },
  { id: 4, title: '校游泳队2026年春季训练计划发布', excerpt: '新学期新目标，校游泳队正式发布2026年春季训练计划。本学期将重点加强体能储备和技术细节的打磨，为省大学生运动会做好充分准备。', content: '新学期新目标，校游泳队正式发布2026年春季训练计划。\n\n本学期将重点加强体能储备和技术细节的打磨，为省大学生运动会做好充分准备。训练计划分为基础期、强化期和赛前期三个阶段，每周训练5次，每次训练时长2小时。', date: '2026-03-10', category: '公告', image: '' },
  { id: 5, title: '我校游泳队参加全国大学生游泳锦标赛获佳绩', excerpt: '在2025年全国大学生游泳锦标赛中，我校游泳队运动员不畏强手，勇于拼搏，最终获得1金1银2铜的好成绩。', content: '在2025年全国大学生游泳锦标赛中，我校游泳队运动员不畏强手，勇于拼搏，最终获得1金1银2铜的好成绩。\n\n本次比赛共有来自全国80余所高校的500余名运动员参赛。我校游泳队队长张明远在男子200米自由泳项目中以出色的表现夺得金牌，这是我校游泳队在全国赛场上的历史性突破。', date: '2025-12-20', category: '赛事', image: '' },
  { id: 6, title: '校游泳队冬季集训圆满结束', excerpt: '为期三周的冬季集训圆满结束，队员们在体能和技术方面都取得了显著进步，为新赛季打下坚实基础。', content: '为期三周的冬季集训圆满结束，队员们在体能和技术方面都取得了显著进步。\n\n本次集训采用封闭式管理模式，训练内容涵盖陆上体能训练、水上技术训练和运动理论学习。全体队员克服了冬季训练的种种困难，展现出了顽强拼搏的精神。', date: '2025-02-15', category: '队务', image: '' }
])

const filteredNews = computed(() => {
  if (activeCategory.value === 'all') return newsList.value
  return newsList.value.filter(n => n.category === activeCategory.value)
})

const openDetail = (news) => {
  selectedNews.value = news
  showDetail.value = true
}

onMounted(async () => {
  try {
    const res = await getNewsList({ page: 1, limit: 20 })
    if (res.data && res.data.length > 0) {
      newsList.value = res.data
    }
  } catch (e) {}
})
</script>
