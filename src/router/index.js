import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";

import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import TweetsView from "@/views/TweetsView.vue";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/home",
      name: "homePageWithTweets",
      component: TweetsView,
      meta: { requiresAuth: true }, // Define a rota como requer autenticação
    },
  ],
});

// Guarda de navegação global
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.accessToken) {
    // Se a rota requer autenticação e o usuário não está autenticado
    next({ name: "login" }); // Redireciona para a página de login
  } else {
    // Se não requer ou o usuário está autenticado, prossegue normalmente
    next();
  }
});

export default router;
