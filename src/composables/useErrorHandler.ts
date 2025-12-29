import { useToast } from './useToast'
import axios from 'axios'

export class ApiError extends Error {
    constructor(
        public statusCode: number,
        public message: string,
        public details?: string,
    ) {
        super(message)
        this.name = 'ApiError'
    }
}

export function useErrorHandler() {
    const { showError } = useToast()

    const handleError = (error: unknown, defaultMessage = 'Erro ao processar requisição') => {
        let statusCode = 500
        let message = defaultMessage
        let details: string | undefined

        if (axios.isAxiosError(error)) {
            statusCode = error.response?.status || 500
            details = error.response?.data?.message || error.response?.data?.error

            // Mapeamento de erros HTTP comuns
            switch (statusCode) {
                case 400:
                    message = 'Dados inválidos enviados'
                    break
                case 401:
                    message = 'Sessão expirada. Faça login novamente'
                    break
                case 403:
                    message = 'Você não tem permissão para acessar este recurso'
                    break
                case 404:
                    message = 'Recurso não encontrado'
                    break
                case 409:
                    message = 'Conflito nos dados (recurso pode já existir)'
                    break
                case 422:
                    message = 'Dados inválidos'
                    break
                case 429:
                    message = 'Muitas requisições. Tente novamente mais tarde'
                    break
                case 500:
                case 502:
                case 503:
                case 504:
                    message = 'Erro no servidor. Tente novamente mais tarde'
                    break
            }
        } else if (error instanceof Error) {
            message = error.message
        }

        showError(message, details)
        return new ApiError(statusCode, message, details)
    }

    const getErrorMessage = (error: unknown, defaultMessage = 'Erro ao processar requisição'): string => {
        if (axios.isAxiosError(error)) {
            return error.response?.data?.message || error.response?.data?.error || defaultMessage
        }
        if (error instanceof Error) {
            return error.message
        }
        return defaultMessage
    }

    return {
        handleError,
        getErrorMessage,
        ApiError,
    }
}
