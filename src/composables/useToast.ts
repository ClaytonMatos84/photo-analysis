import { useToast as usePrimeToast } from 'primevue/usetoast'

export type ToastSeverity = 'success' | 'info' | 'warn' | 'error'

export interface ToastMessage {
    severity: ToastSeverity
    summary: string
    detail?: string
    life?: number
}

export function useToast() {
    const toast = usePrimeToast()

    const showSuccess = (summary: string, detail?: string) => {
        toast.add({
            severity: 'success',
            summary: summary || 'Sucesso',
            detail: detail || '',
            life: 3000,
        })
    }

    const showInfo = (summary: string, detail?: string) => {
        toast.add({
            severity: 'info',
            summary: summary || 'Informação',
            detail: detail || '',
            life: 3000,
        })
    }

    const showWarning = (summary: string, detail?: string) => {
        toast.add({
            severity: 'warn',
            summary: summary || 'Aviso',
            detail: detail || '',
            life: 4000,
        })
    }

    const showError = (summary: string, detail?: string) => {
        toast.add({
            severity: 'error',
            summary: summary || 'Erro',
            detail: detail || '',
            life: 5000,
        })
    }

    return {
        showSuccess,
        showInfo,
        showWarning,
        showError,
    }
}
