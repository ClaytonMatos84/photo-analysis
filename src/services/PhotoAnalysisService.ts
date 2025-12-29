import api from '@/services/api'
import { useAuthStore } from '@/stores/auth'
import type { PhotoAnalysisResult } from '@/types/PhotoAnalysisResult'
import type { PaginatedResponse } from '@/types/PaginatedResponse'
import type { PhotoAnalysisListItem } from '@/types/PhotoAnalysisListItem'

const PHOTO_ANALYSIS_URL = '/photo-analysis/analyze'
const PHOTO_ANALYSIS_RESULTS_URL = '/photo-analysis/results'

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

    static async listResults(
        pageNumber: number,
        pageLimit: number,
    ): Promise<PaginatedResponse<PhotoAnalysisListItem>> {
        const authStore = useAuthStore()
        const headers: Record<string, string> = {}

        if (authStore.token) {
            headers['Authorization'] = `Bearer ${authStore.token}`
        }

        const response = await api.get(PHOTO_ANALYSIS_RESULTS_URL, {
            headers,
            params: { page: pageNumber, limit: pageLimit },
        })
        return response.data
    }
}
