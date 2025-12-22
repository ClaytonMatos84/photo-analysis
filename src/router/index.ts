import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
            meta: { requiresAuth: true },
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView,
        },
        {
            path: '/register',
            name: 'register',
            component: RegisterView,
        },
    ],
})

router.beforeEach((to, _from, next) => {
    // Rotas públicas: login e register
    const publicNames = new Set(['login', 'register'])

    if (publicNames.has(String(to.name))) {
        return next()
    }

    // Se a rota exige auth (ou se vamos proteger todas exceto públicas)
    const requiresAuth = to.meta?.requiresAuth !== false

    if (!requiresAuth) {
        return next()
    }

    const auth = useAuthStore()
    if (auth.isTokenValid) {
        return next()
    }

    auth.clearToken()
    return next({ name: 'login', query: { redirect: to.fullPath } })
})

export default router
