import api from '@/services/api'
import axios from 'axios'

export interface UserProfile {
    name: string
    birthDate: string // formato DD/MM/YYYY
    address: string
    profession: string
}

export interface UserProfileResponse {
    success: boolean
    message?: string
    data?: UserProfile
}

class UserProfileService {
    /**
     * Cria um novo perfil de usuário
     * @param profile - Dados do perfil do usuário
     * @returns Resposta do serviço
     */
    async createProfile(profile: UserProfile): Promise<UserProfileResponse> {
        try {
            const response = await api.post<UserProfile>('/user-profiles', profile)

            return {
                success: true,
                data: response.data,
                message: 'Perfil criado com sucesso',
            }
        } catch (error: Error | unknown) {
            if (axios.isAxiosError(error) && error.response) {
                const errorMsg =
                    error.response.data?.message ||
                    error.response.data?.error ||
                    'Erro ao criar perfil'
                return {
                    success: false,
                    message: errorMsg,
                }
            }

            return {
                success: false,
                message: 'Erro ao criar perfil',
            }
        }
    }

    /**
     * Atualiza o perfil do usuário
     * @param profile - Dados atualizados do perfil
     * @returns Resposta do serviço
     */
    async updateProfile(profile: UserProfile): Promise<UserProfileResponse> {
        try {
            const response = await api.put<UserProfile>('/user-profiles', profile)

            return {
                success: true,
                data: response.data,
                message: 'Perfil atualizado com sucesso',
            }
        } catch (error: Error | unknown) {
            if (axios.isAxiosError(error) && error.response) {
                const errorMsg =
                    error.response.data?.message ||
                    error.response.data?.error ||
                    'Erro ao atualizar perfil'
                return {
                    success: false,
                    message: errorMsg,
                }
            }

            return {
                success: false,
                message: 'Erro ao atualizar perfil',
            }
        }
    }

    /**
     * Busca o perfil do usuário
     * @returns Perfil do usuário ou null
     */
    async getProfile(): Promise<UserProfile | null> {
        try {
            const response = await api.get<UserProfile>('/user-profiles')
            return response.data
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 404) {
                // Perfil não existe ainda
                return null
            }
            throw error
        }
    }
}

export default new UserProfileService()
