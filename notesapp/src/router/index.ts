import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomeView.vue';
import Login from '../views/LoginView.vue';
import Profile from '../views/ProfileView.vue';
import Signout from '../views/SignoutView.vue';
import SocketCon from '../components/ConnectionManager.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/home',
      name: 'profile',
      component: Profile
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
    {
      path: "/signout",
      name: "signout",
      component: Signout,
    },

    {
      path: "/socketconnection",
      name: "socket",
      component: SocketCon,
    },
  ]
})

export default router
