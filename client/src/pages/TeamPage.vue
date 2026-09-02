<template>
  <div class="min-h-screen bg-cream">
    <section class="relative pt-32 pb-16 lg:pt-40 lg:pb-24 bg-navy overflow-hidden">
      <div class="absolute inset-0" style="background-image: url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23ffffff&quot; fill-opacity=&quot;0.05&quot;%3E%3Cpath d=&quot;M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"></div>
      <div class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cream to-transparent"></div>
      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span class="inline-block px-4 py-1.5 bg-white/10 text-white/90 text-sm font-medium rounded-full mb-6 backdrop-blur-sm border border-white/20">队员风采</span>
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6">我们的队员</h1>
        <p class="text-lg text-white/60 max-w-2xl mx-auto">每一位队员都是泳池中闪耀的明星</p>
      </div>
    </section>

    <section class="py-16 lg:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-wrap justify-center gap-3 mb-12">
          <button
            v-for="category in categories"
            :key="category.value"
            @click="activeCategory = category.value"
            class="px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200"
            :class="activeCategory === category.value ? 'bg-navy text-white shadow-lg shadow-navy/30' : 'bg-white text-gray-600 hover:bg-navy/5'"
          >
            {{ category.label }}
          </button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div
            v-for="(member, index) in filteredMembers"
            :key="member.id"
            class="group bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div class="relative h-64 overflow-hidden bg-navy/10">
              <img v-if="member.avatar" :src="member.avatar" :alt="member.name" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div v-else class="w-full h-full flex items-center justify-center bg-gradient-to-br from-navy/10 to-navy/5">
                <svg class="w-20 h-20 text-navy/20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
              <div class="absolute top-4 right-4">
                <span class="px-3 py-1 bg-navy text-white text-xs font-bold rounded-full">{{ member.position }}</span>
              </div>
            </div>
            <div class="p-5">
              <h3 class="text-lg font-bold text-gray-900 mb-1">{{ member.name }}</h3>
              <p class="text-sm text-gray-500 mb-2">{{ member.grade }}</p>
              <div class="flex items-center gap-2 flex-wrap">
                <span v-for="tag in member.tags" :key="tag" class="px-2 py-1 bg-cream text-navy text-xs font-medium rounded">{{ tag }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <CTASection />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import CTASection from '../components/CTASection.vue'
import { getTeamMembers } from '../utils/api'

const activeCategory = ref('all')

const categories = [
  { label: '全部', value: 'all' },
  { label: '队长', value: 'captain' },
  { label: '主力队员', value: 'main' },
  { label: '新队员', value: 'new' }
]

const members = ref([
  { id: 1, name: '张明远', grade: '大三 · 体育学院', position: '队长', category: 'captain', tags: ['自由泳', '混合泳'], avatar: '' },
  { id: 2, name: '李思涵', grade: '大二 · 体育学院', position: '副队长', category: 'captain', tags: ['蝶泳', '仰泳'], avatar: '' },
  { id: 3, name: '王浩然', grade: '大三 · 计算机学院', position: '主力', category: 'main', tags: ['蛙泳', '自由泳'], avatar: '' },
  { id: 4, name: '陈雨欣', grade: '大二 · 外国语学院', position: '主力', category: 'main', tags: ['蝶泳', '自由泳'], avatar: '' },
  { id: 5, name: '刘子轩', grade: '大二 · 机械学院', position: '主力', category: 'main', tags: ['仰泳', '混合泳'], avatar: '' },
  { id: 6, name: '赵雅琪', grade: '大一 · 艺术学院', position: '新队员', category: 'new', tags: ['蛙泳'], avatar: '' },
  { id: 7, name: '孙博文', grade: '大一 · 经管学院', position: '新队员', category: 'new', tags: ['自由泳'], avatar: '' },
  { id: 8, name: '周思远', grade: '大一 · 理学院', position: '新队员', category: 'new', tags: ['蝶泳'], avatar: '' }
])

const filteredMembers = computed(() => {
  if (activeCategory.value === 'all') return members.value
  return members.value.filter(m => m.category === activeCategory.value)
})

onMounted(async () => {
  try {
    const res = await getTeamMembers()
    if (res.data && res.data.length > 0) {
      members.value = res.data
    }
  } catch (e) {}
})
</script>
