import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_SERVER_URL,
})

// Request interceptor: Adiciona token ao header
api.interceptors.request.use((config) => {
    try {
        const token = localStorage.getItem('auth_token')
        if (token) {
            config.headers = config.headers ?? {}
            config.headers['Authorization'] = `Bearer ${token}`
        }
    } catch {
        // ignore storage errors
    }
    return config
})

// Response interceptor: Trata erros de resposta
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const config = error.config

        // Se for erro 401 (não autorizado) e não for uma tentativa de retry
        if (error.response?.status === 401 && !config._retry) {
            config._retry = true

            try {
                // Limpa o token inválido
                localStorage.removeItem('auth_token')

                // Tenta fazer refresh do token se houver endpoint disponível
                // Caso contrário, o usuário será redirecionado para login
                const { useAuthStore } = await import('@/stores/auth')
                const authStore = useAuthStore()
                authStore.clearToken()

                // Se houver uma rota de redirect, redireciona para login
                if (typeof window !== 'undefined') {
                    window.location.href = '/?redirect=' + encodeURIComponent(window.location.pathname)
                }
            } catch {
                // Silently fail
            }
        }

        return Promise.reject(error)
    },
)

export default api
