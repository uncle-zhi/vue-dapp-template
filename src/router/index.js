import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import TestPage from '../views/TestPage.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/new', component: TestPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router