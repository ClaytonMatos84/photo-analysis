import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/services/api'

function decodeJwtExp(token: string): number | null {
    const parts = token.split('.')
    if (parts.length !== 3) return null
    try {
        const payloadPart = parts[1] || ''
        const json = JSON.parse(atob(payloadPart.replace(/-/g, '+').replace(/_/g, '/')))
        return typeof json.exp === 'number' ? json.exp : null
    } catch {
        return null
    }
}

export const useAuthStore = defineStore('auth', () => {
    const STORAGE_KEY = 'auth_token'
    const token = ref<string | null>(null)

    /**
     * Verifica se um token JWT está expirado
     */
    function isTokenExpired(t: string): boolean {
        const exp = decodeJwtExp(t)
        if (exp == null) return false // Non-JWT: não expirado
        const nowSeconds = Math.floor(Date.now() / 1000)
        return exp <= nowSeconds
    }

    /**
     * Carrega o token do localStorage se existir e for válido
     */
    function initializeFromStorage() {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored && isTokenExpired(stored)) {
            localStorage.removeItem(STORAGE_KEY)
            return
        }
        if (stored) {
            token.value = stored
            api.defaults.headers.common['Authorization'] = `Bearer ${stored}`
        }
    }

    const isAuthenticated = computed(() => !!token.value)
    const isTokenValid = computed(() => {
        if (!token.value) return false
        const exp = decodeJwtExp(token.value)
        if (exp == null) return true
        const nowSeconds = Math.floor(Date.now() / 1000)
        return exp > nowSeconds
    })

    function setToken(t: string) {
        token.value = t
        api.defaults.headers.common['Authorization'] = `Bearer ${t}`
        localStorage.setItem(STORAGE_KEY, t)
    }

    function clearToken() {
        token.value = null
        delete api.defaults.headers.common['Authorization']
        localStorage.removeItem(STORAGE_KEY)
    }

    return { token, isAuthenticated, isTokenValid, setToken, clearToken, initializeFromStorage }
})
