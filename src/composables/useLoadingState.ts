import { ref, computed } from 'vue'

export function useLoadingState(initialState = false) {
    const isLoading = ref(initialState)
    const error = ref<string | null>(null)

    const setLoading = (value: boolean) => {
        isLoading.value = value
    }

    const setError = (message: string | null) => {
        error.value = message
    }

    const clearError = () => {
        error.value = null
    }

    const resetState = () => {
        isLoading.value = false
        error.value = null
    }

    const withLoading = async <T,>(callback: () => Promise<T>): Promise<T> => {
        try {
            setLoading(true)
            clearError()
            return await callback()
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro desconhecido')
            throw err
        } finally {
            setLoading(false)
        }
    }

    return {
        isLoading: computed(() => isLoading.value),
        error: computed(() => error.value),
        setLoading,
        setError,
        clearError,
        resetState,
        withLoading,
    }
}
