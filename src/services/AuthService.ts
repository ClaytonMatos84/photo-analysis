import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BASE_SERVER_URL;

export interface RegisterRequest {
    username: string;
    password: string;
}

export interface RegisterResponse {
    userId?: number;
    username?: string;
    message?: string;
}

export interface AuthResponse {
    token: string;
    success: boolean;
    message?: string;
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
            const response = await axios.post<RegisterResponse>(`${API_BASE_URL}/auth/register`, {
                username: email,
                password: password
            });
            return response.data;
        } catch (error: Error | unknown) {
            if (axios.isAxiosError(error) && error.response) {
                return {
                    message: error.response.data?.message || 'Erro ao registrar usuário'
                };
            }
            return {
                message: 'Erro de conexão com o servidor'
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
            const response = await axios.post<string>(`${API_BASE_URL}/auth/login`, {
                username: email,
                password: password
            });
            return {
                success: true,
                token: response.data
            }
        } catch (error: Error | unknown) {
            if (axios.isAxiosError(error) && error.response) {
                return {
                    token: '',
                    success: false,
                    message: error.response.data?.error || 'Usuário ou senha inválidos'
                };
            }
            return {
                token: '',
                success: false,
                message: 'Erro de conexão com o servidor'
            };
        }
    }
}

export default new AuthService();
