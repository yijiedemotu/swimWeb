<template>
  <div class="min-h-screen bg-cream">
    <section class="relative pt-32 pb-16 lg:pt-40 lg:pb-24 bg-navy overflow-hidden">
      <div class="absolute inset-0" style="background-image: url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23ffffff&quot; fill-opacity=&quot;0.05&quot;%3E%3Cpath d=&quot;M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"></div>
      <div class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cream to-transparent"></div>
      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span class="inline-block px-4 py-1.5 bg-white/10 text-white/90 text-sm font-medium rounded-full mb-6 backdrop-blur-sm border border-white/20">关于我们</span>
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6">认识校游泳队</h1>
        <p class="text-lg text-white/60 max-w-2xl mx-auto">一支充满激情与梦想的水上竞技团队</p>
      </div>
    </section>

    <section class="py-16 lg:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <span class="inline-block px-3 py-1 bg-navy/10 text-navy text-xs font-bold uppercase tracking-wider rounded-full mb-4">队伍简介</span>
            <h2 class="text-3xl lg:text-4xl font-black text-gray-900 mb-6">传承与荣耀</h2>
            <p class="text-gray-600 leading-relaxed mb-4">
              校游泳队成立于2011年，是学校体育部直属的专业运动队。自成立以来，我们始终坚持"以水为友，以浪为伴"的队训，致力于培养德智体美劳全面发展的优秀游泳运动员。
            </p>
            <p class="text-gray-600 leading-relaxed mb-4">
              队伍现有队员50余人，涵盖自由泳、蛙泳、仰泳、蝶泳、混合泳等多个项目。我们拥有一支经验丰富的教练团队和完善的训练体系，为每一位队员提供专业、系统的训练指导。
            </p>
            <p class="text-gray-600 leading-relaxed">
              在过去的15年里，校游泳队累计获得省级以上奖项120余项，多次代表学校参加全国大学生游泳锦标赛并取得优异成绩。
            </p>
          </div>
          <div class="relative">
            <div class="bg-navy rounded-2xl p-8 text-white">
              <div class="grid grid-cols-2 gap-6">
                <div v-for="(stat, index) in stats" :key="index" class="text-center p-4 bg-white/10 rounded-xl">
                  <div class="text-2xl lg:text-3xl font-black mb-2">{{ stat.value }}</div>
                  <div class="text-sm text-white/70">{{ stat.label }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 lg:py-24 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12 lg:mb-16">
          <span class="inline-block px-3 py-1 bg-navy/10 text-navy text-xs font-bold uppercase tracking-wider rounded-full mb-4">核心价值</span>
          <h2 class="text-3xl lg:text-4xl font-black text-gray-900">我们的理念</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="(value, index) in values" :key="index" class="text-center p-8 bg-cream rounded-2xl hover:shadow-lg transition-all duration-300">
            <div class="w-16 h-16 bg-navy/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg class="w-8 h-8 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="value.icon"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">{{ value.title }}</h3>
            <p class="text-gray-500 text-sm leading-relaxed">{{ value.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 lg:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12 lg:mb-16">
          <span class="inline-block px-3 py-1 bg-navy/10 text-navy text-xs font-bold uppercase tracking-wider rounded-full mb-4">发展历程</span>
          <h2 class="text-3xl lg:text-4xl font-black text-gray-900">我们的足迹</h2>
        </div>
        <div class="relative">
          <div class="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-navy/10 hidden lg:block"></div>
          <div class="space-y-8 lg:space-y-12">
            <div v-for="(event, index) in timeline" :key="index" class="relative flex flex-col lg:flex-row items-center gap-8" :class="index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'">
              <div class="flex-1 lg:w-1/2">
                <div class="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
                  <div class="text-sm font-bold text-navy mb-2">{{ event.year }}</div>
                  <h3 class="text-lg font-bold text-gray-900 mb-2">{{ event.title }}</h3>
                  <p class="text-gray-500 text-sm">{{ event.description }}</p>
                </div>
              </div>
              <div class="w-4 h-4 bg-navy rounded-full border-4 border-cream z-10 hidden lg:block"></div>
              <div class="flex-1 lg:w-1/2 hidden lg:block"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <CTASection />
  </div>
</template>

<script setup>
import CTASection from '../components/CTASection.vue'

const stats = [
  { value: '50+', label: '队员人数' },
  { value: '15', label: '建队年份' },
  { value: '120+', label: '获奖数量' },
  { value: '8', label: '训练项目' }
]

const values = [
  {
    title: '拼搏进取',
    description: '每一次入水都是对自我的挑战，每一次划水都是向目标的靠近。我们永不放弃，永远向前。',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z'
  },
  {
    title: '团结协作',
    description: '我们是一个团队，每个人的努力都是团队成功的一部分。相互支持，共同成长。',
    icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z'
  },
  {
    title: '超越自我',
    description: '不断突破自己的极限，追求更快、更强、更好的自己。每一天都比昨天更优秀。',
    icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'
  }
]

const timeline = [
  { year: '2011', title: '队伍成立', description: '校游泳队正式成立，首批15名队员加入，开启水上竞技征程。' },
  { year: '2014', title: '首次省赛', description: '首次参加省级大学生游泳锦标赛，获得2金3银的优异成绩。' },
  { year: '2017', title: '全国赛场', description: '首次亮相全国大学生游泳锦标赛，获得1枚金牌，实现历史性突破。' },
  { year: '2020', title: '队伍壮大', description: '队员人数突破40人，训练设施全面升级，建立科学化训练体系。' },
  { year: '2023', title: '辉煌时刻', description: '在省大学生运动会中斩获5金3银2铜，创造队史最佳战绩。' },
  { year: '2026', title: '再创佳绩', description: '春季纳新25名新队员，在省大运会中再获3金2银，续写辉煌。' }
]
</script>
