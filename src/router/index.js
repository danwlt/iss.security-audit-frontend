import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import DevicesView from '../views/DevicesView.vue'
import DeviceDetailView from '../views/DeviceDetailView.vue'
import ContactView from '../views/ContactView.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/devices',
    name: 'devices',
    component: DevicesView
  },
  {
    path: '/device/:id',
    name: 'device',
    component: DeviceDetailView
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactView
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
