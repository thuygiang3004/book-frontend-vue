import {createRouter, createWebHistory, RouteLocationNormalized} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Listings from "@/views/ListingsView.vue";
import Login from "@/views/Login.vue";
import CreateListing from "@/views/CreateListing.vue";
import {useAuthStore} from "../store/auth.store";
import ShowListing from "@/views/ShowListing.vue";

interface ToRoute extends RouteLocationNormalized {
  meta?: {
    requiresAuth: boolean
  }
}

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
      component: CreateListing,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/listings/:id',
      name: 'show-listing',
      component: ShowListing
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})

router.beforeEach((to: ToRoute) => {
  const {isAuthenticated} = useAuthStore()
  if (to.meta?.requiresAuth && !isAuthenticated) {
    return '/login'
  }
})

export default router
