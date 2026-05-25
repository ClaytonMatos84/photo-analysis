import api from '@/services/api'
import { useAuthStore } from '@/stores/auth'
import type { PhotoAnalysisResult } from '@/types/PhotoAnalysisResult'
import type { AdAnalysisResult } from '@/types/PhotoAnalysisResult'
import type { PaginatedResponse } from '@/types/PaginatedResponse'
import type { PhotoAnalysisListItem } from '@/types/PhotoAnalysisListItem'
import type { PhotoAnalysisDetail } from '@/types/PhotoAnalysisListItem'
import type { AdAnalysisListItem } from '@/types/PhotoAnalysisListItem'

const PHOTO_ANALYSIS_URL = '/photo-analysis/analyze'
const AD_ANALYSIS_URL = '/ad-analysis/analyze'
const PHOTO_ANALYSIS_RESULTS_URL = '/photo-analysis/results'
const AD_ANALYSIS_RESULTS_URL = '/ad-analysis/results'

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
        if (!response || !response.data) {
            throw new Error('Erro ao analisar a foto')
        }

        const result: PhotoAnalysisResult = response.data
        return result
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

    static async getResultDetail(id: number): Promise<PhotoAnalysisDetail> {
        const authStore = useAuthStore()
        const headers: Record<string, string> = {}

        if (authStore.token) {
            headers['Authorization'] = `Bearer ${authStore.token}`
        }

        const response = await api.get(`${PHOTO_ANALYSIS_RESULTS_URL}/${id}`, {
            headers,
        })
        return response.data
    }

    static async analyzeAdImage(imageUrl: string): Promise<AdAnalysisResult> {
        const authStore = useAuthStore()
        const headers: Record<string, string> = {}

        if (authStore.token) {
            headers['Authorization'] = `Bearer ${authStore.token}`
        }

        const response = await api.get(AD_ANALYSIS_URL, {
            headers,
            params: { image_url: imageUrl },
            timeout: 120000,
        })

        if (!response || !response.data) {
            throw new Error('Erro ao analisar o anúncio')
        }

        const result: AdAnalysisResult = response.data
        return result
    }

    static async listAdResults(
        pageNumber: number,
        pageLimit: number,
    ): Promise<PaginatedResponse<AdAnalysisListItem>> {
        const authStore = useAuthStore()
        const headers: Record<string, string> = {}

        if (authStore.token) {
            headers['Authorization'] = `Bearer ${authStore.token}`
        }

        const response = await api.get(AD_ANALYSIS_RESULTS_URL, {
            headers,
            params: { page: pageNumber, limit: pageLimit },
        })
        return response.data
    }

    static async getAdResultDetail(analysisId: string): Promise<AdAnalysisResult> {
        const authStore = useAuthStore()
        const headers: Record<string, string> = {}

        if (authStore.token) {
            headers['Authorization'] = `Bearer ${authStore.token}`
        }

        const response = await api.get(`${AD_ANALYSIS_RESULTS_URL}/${analysisId}`, {
            headers,
        })
        return response.data
    }
}
