<template>
  <nav class="fixed top-0 left-0 right-0 z-50 transition-all duration-300" :class="scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 lg:h-20">
        <router-link to="/" class="flex items-center space-x-2 group">
          <div class="w-10 h-10 rounded-full flex items-center justify-center transition-transform group-hover:scale-110" :class="scrolled ? 'bg-navy' : 'bg-white'">
            <svg class="w-6 h-6" :class="scrolled ? 'text-white' : 'text-navy'" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
            </svg>
          </div>
          <span class="text-lg font-bold transition-colors" :class="scrolled ? 'text-navy' : 'text-white'">校游泳队</span>
        </router-link>

        <div class="hidden lg:flex items-center space-x-1">
          <router-link
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 group"
            :class="[
              isActive(item.path)
                ? (scrolled ? 'text-navy bg-navy/10' : 'text-white bg-white/20')
                : (scrolled ? 'text-gray-700 hover:text-navy hover:bg-navy/5' : 'text-white/80 hover:text-white hover:bg-white/10')
            ]"
          >
            {{ item.name }}
            <span class="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-navy rounded-full transition-all duration-200" :class="isActive(item.path) ? 'w-6' : 'w-0 group-hover:w-4'" :style="!scrolled && 'background: white'"></span>
          </router-link>
        </div>

        <button
          class="lg:hidden p-2 rounded-lg transition-colors"
          :class="scrolled ? 'text-navy hover:bg-navy/10' : 'text-white hover:bg-white/10'"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          <svg v-if="!mobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </div>

    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div v-if="mobileMenuOpen" class="lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-lg">
        <div class="max-w-7xl mx-auto px-4 py-3 space-y-1">
          <router-link
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="block px-4 py-3 text-base font-medium rounded-lg transition-colors"
            :class="isActive(item.path) ? 'text-navy bg-navy/10' : 'text-gray-700 hover:text-navy hover:bg-navy/5'"
            @click="mobileMenuOpen = false"
          >
            {{ item.name }}
          </router-link>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const scrolled = ref(false)
const mobileMenuOpen = ref(false)

const navItems = [
  { name: '首页', path: '/' },
  { name: '关于我们', path: '/about' },
  { name: '队员风采', path: '/team' },
  { name: '新闻动态', path: '/news' },
  { name: '联系我们', path: '/contact' }
]

const isActive = (path) => route.path === path

const handleScroll = () => {
  scrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
