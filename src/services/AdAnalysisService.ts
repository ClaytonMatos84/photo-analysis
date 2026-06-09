import api from '@/services/api'
import { useAuthStore } from '@/stores/auth'
import type { AdAnalysisResult } from '@/types/AdAnalysisTypes'
import type { PaginatedResponse } from '@/types/PaginatedResponse'
import type { AdAnalysisListItem } from '@/types/AdAnalysisTypes'

const AD_ANALYSIS_URL = '/ad-analysis/analyze'
const AD_ANALYSIS_RESULTS_URL = '/ad-analysis/results'

export default class AdAnalysisService {
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

    static async listResults(
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

    static async getResultDetail(analysisId: string): Promise<AdAnalysisResult> {
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
