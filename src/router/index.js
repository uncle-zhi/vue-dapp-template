import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import TestPage from '../views/TestPage.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/new', component: TestPage },
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
})

export default router