import { createRouter, createWebHistory } from 'vue-router'
const HomeView = () => import('@/views/HomeView.vue')
const LoginView = () => import('@/views/LoginView.vue')
const RegisterView = () => import('@/views/RegisterView.vue')
const ResultsView = () => import('@/views/PhotoAnalysisResultsView.vue')
const ProfileView = () => import('@/views/ProfileView.vue')
const AdAnalysisView = () => import('@/views/AdAnalysisView.vue')
const YouTubeAnalysisView = () => import('@/views/YouTubeAnalysisView.vue')
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
            path: '/results',
            name: 'results',
            component: ResultsView,
            meta: { requiresAuth: true },
        },
        {
            path: '/profile',
            name: 'profile',
            component: ProfileView,
            meta: { requiresAuth: true },
        },
        {
            path: '/ad-analysis',
            name: 'ad-analysis',
            component: AdAnalysisView,
            meta: { requiresAuth: true },
        },
        {
            path: '/youtube-analysis',
            name: 'youtube-analysis',
            component: YouTubeAnalysisView,
            meta: { requiresAuth: true },
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView,
            meta: { requiresAuth: false },
        },
        {
            path: '/register',
            name: 'register',
            component: RegisterView,
            meta: { requiresAuth: false },
        },
        // Fallback para rotas não encontradas
        {
            path: '/:pathMatch(.*)*',
            redirect: '/',
        },
    ],
})

router.beforeEach((to, from, next) => {
    const auth = useAuthStore()
    const isPublicRoute = to.meta?.requiresAuth === false
    const isAuthValid = auth.isTokenValid

    // Se a rota é pública, permite acesso
    if (isPublicRoute) {
        // Se já está autenticado e tenta ir para login/register, redireciona para home
        if (isAuthValid && (to.name === 'login' || to.name === 'register')) {
            return next({ name: 'home' })
        }
        return next()
    }

    // Se a rota exige autenticação
    if (!isAuthValid) {
        // Limpa token inválido
        auth.clearToken()
        // Redireciona para login com a rota original como query param
        return next({
            name: 'login',
            query: { redirect: to.fullPath },
        })
    }

    // Token é válido, permite acesso
    return next()
})

export default router
