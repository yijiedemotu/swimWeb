<template>
  <section class="relative h-screen flex items-center justify-center overflow-hidden">
    <div class="absolute inset-0 bg-navy">
      <div class="absolute inset-0 bg-gradient-to-br from-navy via-navy-dark to-navy opacity-90"></div>
      <div class="absolute inset-0" style="background-image: url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23ffffff&quot; fill-opacity=&quot;0.05&quot;%3E%3Cpath d=&quot;M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"></div>
      <div class="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-cream to-transparent"></div>
    </div>

    <div class="absolute top-1/4 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"></div>
    <div class="absolute bottom-1/4 right-10 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl"></div>

    <div class="relative z-10 text-center px-4 max-w-4xl mx-auto">
      <div class="animate-fade-in-up">
        <span class="inline-block px-4 py-1.5 bg-white/10 text-white/90 text-sm font-medium rounded-full mb-6 backdrop-blur-sm border border-white/20">
          🏊 水上竞技 · 超越自我
        </span>
      </div>
      <h1 class="animate-fade-in-up animate-delay-100 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6">
        <span class="block">逐浪前行</span>
        <span class="block mt-2 bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent">泳创辉煌</span>
      </h1>
      <p class="animate-fade-in-up animate-delay-200 text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
        以水为友，以浪为伴。我们是一支充满激情与梦想的校游泳队，用每一次划水书写青春的篇章。
      </p>
      <div class="animate-fade-in-up animate-delay-300 flex flex-col sm:flex-row gap-4 justify-center">
        <router-link to="/about" class="inline-flex items-center justify-center px-8 py-3.5 bg-white text-navy font-bold rounded-full hover:bg-cream transition-all duration-300 hover:shadow-xl hover:shadow-white/20 hover:-translate-y-0.5">
          了解更多
          <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
          </svg>
        </router-link>
        <router-link to="/team" class="inline-flex items-center justify-center px-8 py-3.5 border-2 border-white/30 text-white font-bold rounded-full hover:bg-white/10 transition-all duration-300 hover:border-white/60 backdrop-blur-sm">
          认识队员
        </router-link>
      </div>
    </div>

    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
      <svg class="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
      </svg>
    </div>
  </section>
</template>
