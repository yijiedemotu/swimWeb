import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../pages/HomePage.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../pages/AboutPage.vue')
  },
  {
    path: '/team',
    name: 'Team',
    component: () => import('../pages/TeamPage.vue')
  },
  {
    path: '/news',
    name: 'News',
    component: () => import('../pages/NewsPage.vue')
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('../pages/ContactPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  }
})

export default router
