import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Listings from "@/views/Listings.vue";
import Login from "@/views/Login.vue";
import CreateListing from "@/views/CreateListing.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/listings',
      name: 'listings',
      component: Listings
    },
    {
      path: '/listings/create',
      name: 'create-listings',
      component: CreateListing
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})

export default router
