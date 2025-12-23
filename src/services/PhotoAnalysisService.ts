import api from '@/services/api'
import { useAuthStore } from '@/stores/auth'
import type { PhotoAnalysisResult } from '@/types/PhotoAnalysisResult'

const PHOTO_ANALYSIS_URL = '/photo-analysis/analyze'

export default class PhotoAnalysisService {
    static async sendPhotoBinary(photo: Blob | File): Promise<PhotoAnalysisResult> {
        const authStore = useAuthStore()
        const formData = new FormData()
        formData.append('imagem', photo)

        const headers: Record<string, string> = {
            'Content-Type': 'multipart/form-data',
        }

        if (authStore.token) {
            headers['Authorization'] = `Bearer ${authStore.token}`
        }

        const response = await api.post(PHOTO_ANALYSIS_URL, formData, {
            headers,
        })
        return response.data
    }
}
