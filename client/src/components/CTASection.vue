<template>
  <section class="py-16 lg:py-24 bg-navy relative overflow-hidden">
    <div class="absolute inset-0" style="background-image: url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23ffffff&quot; fill-opacity=&quot;0.05&quot;%3E%3Cpath d=&quot;M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"></div>
    <div class="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
    <div class="absolute bottom-0 left-0 w-72 h-72 bg-cyan-400/10 rounded-full blur-3xl"></div>

    <div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 class="text-3xl lg:text-4xl font-black text-white mb-6">准备好加入我们了吗？</h2>
      <p class="text-lg text-white/60 mb-10 max-w-2xl mx-auto">
        无论你是游泳健将还是初学者，我们都欢迎你的加入。让我们一起在泳池中超越自我，创造辉煌。
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <router-link to="/contact" class="inline-flex items-center justify-center px-8 py-4 bg-white text-navy font-bold rounded-full hover:bg-cream transition-all duration-300 hover:shadow-xl">
          立即报名
          <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
          </svg>
        </router-link>
        <router-link to="/about" class="inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 text-white font-bold rounded-full hover:bg-white/10 transition-all duration-300">
          了解更多
        </router-link>
      </div>
    </div>
  </section>
</template>
