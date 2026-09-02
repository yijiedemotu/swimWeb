<template>
  <div id="app" class="min-h-screen bg-cream">
    <NavBar />
    <main>
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <FooterSection />
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue'
import FooterSection from './components/FooterSection.vue'
</script>
