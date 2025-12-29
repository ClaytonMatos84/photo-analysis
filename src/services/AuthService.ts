import api from '@/services/api'
import axios from 'axios'

// base URL is provided by centralized Axios client

export interface RegisterRequest {
    username: string;
    password: string;
}

export interface RegisterResponse {
    userId?: number;
    username?: string;
    message?: string;
    success?: boolean;
}

export interface AuthResponse {
    token: string;
    success: boolean;
    message?: string;
}

export interface LoginResponse {
    access_token: string;
}

class AuthService {
    /**
     * Registra um novo usuário no sistema
     * @param email - Email do usuário (será usado como username)
     * @param password - Senha do usuário
     * @returns Resposta do serviço de autenticação
     */
    async register(email: string, password: string): Promise<RegisterResponse> {
        try {
            const response = await api.post<RegisterResponse>(`/auth/register`, {
                username: email,
                password: password
            });

            return {
                ...response.data,
                success: true
            };
        } catch (error: Error | unknown) {
            if (axios.isAxiosError(error) && error.response) {
                const errorMsg = error.response.data?.message || error.response.data?.error || 'Erro ao registrar usuário'
                return {
                    message: errorMsg,
                    success: false
                };
            }
            return {
                message: 'Erro de conexão com o servidor',
                success: false
            };
        }
    }

    /**
     * Realiza login no sistema
     * @param email - Email do usuário
     * @param password - Senha do usuário
     * @returns Resposta do serviço de autenticação
     */
    async login(email: string, password: string): Promise<AuthResponse> {
        try {
            const response = await api.post<LoginResponse>(`/auth/login`, {
                username: email,
                password: password
            });

            return {
                success: true,
                token: response.data.access_token
            }
        } catch (error: Error | unknown) {
            if (axios.isAxiosError(error) && error.response) {
                const errorMsg = error.response.data?.error || error.response.data?.message || 'Usuário ou senha inválidos'
                return {
                    token: '',
                    success: false,
                    message: errorMsg
                };
            }
            return {
                token: '',
                success: false,
                message: 'Erro de conexão com o servidor'
            };
        }
    }

    async profile(): Promise<{ username: string } | { message: string }> {
        try {
            const response = await api.post<{ username: string }>(`/auth/profile`)
            return response.data
        } catch (error: Error | unknown) {
            if (axios.isAxiosError(error) && error.response) {
                return {
                    message: error.response.data?.message || 'Erro ao buscar perfil do usuário'
                }
            }
            return { message: 'Erro de conexão com o servidor' }
        }
    }
}

export default new AuthService();
