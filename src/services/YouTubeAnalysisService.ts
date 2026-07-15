import api from '@/services/api'
import { useAuthStore } from '@/stores/auth'
import type { YouTubeAnalysisResult } from '@/types/YouTubeAnalysisTypes'
import type { PaginatedResponse } from '@/types/PaginatedResponse'
import type { YouTubeAnalysisListItem } from '@/types/YouTubeAnalysisTypes'
import type { YouTubeAnalysisDetail } from '@/types/YouTubeAnalysisTypes'
import type { YouTubeTopVideosResponse } from '@/types/YouTubeAnalysisTypes'

const YOUTUBE_ANALYSIS_URL = '/youtube-analysis/analyze'
const YOUTUBE_ANALYSIS_RESULTS_URL = '/youtube-analysis/results'
const YOUTUBE_ANALYSIS_TOP_VIEWS_URL = '/youtube-analysis/top-views'
const YOUTUBE_ANALYSIS_TOP_LIKES_URL = '/youtube-analysis/top-likes'

export default class YouTubeAnalysisService {
    static async analyzeVideo(youtubeUrl: string): Promise<YouTubeAnalysisResult> {
        const authStore = useAuthStore()
        const headers: Record<string, string> = {}

        if (authStore.token) {
            headers['Authorization'] = `Bearer ${authStore.token}`
        }

        const response = await api.get(YOUTUBE_ANALYSIS_URL, {
            headers,
            params: { url: youtubeUrl },
            timeout: 120000,
        })

        if (!response || !response.data) {
            throw new Error('Erro ao analisar o video do YouTube')
        }

        const result: YouTubeAnalysisResult = response.data
        return result
    }

    static async listResults(
        pageNumber: number,
        pageLimit: number,
    ): Promise<PaginatedResponse<YouTubeAnalysisListItem>> {
        const authStore = useAuthStore()
        const headers: Record<string, string> = {}

        if (authStore.token) {
            headers['Authorization'] = `Bearer ${authStore.token}`
        }

        const response = await api.get(YOUTUBE_ANALYSIS_RESULTS_URL, {
            headers,
            params: { page: pageNumber, limit: pageLimit },
        })

        return response.data
    }

    static async getResultDetail(id: number): Promise<YouTubeAnalysisDetail> {
        const authStore = useAuthStore()
        const headers: Record<string, string> = {}

        if (authStore.token) {
            headers['Authorization'] = `Bearer ${authStore.token}`
        }

        const response = await api.get(`${YOUTUBE_ANALYSIS_RESULTS_URL}/${id}`, {
            headers,
        })

        return response.data
    }

    static async getTopViews(limit: number = 5): Promise<YouTubeTopVideosResponse> {
        const authStore = useAuthStore()
        const headers: Record<string, string> = {}

        if (authStore.token) {
            headers['Authorization'] = `Bearer ${authStore.token}`
        }

        const response = await api.get(YOUTUBE_ANALYSIS_TOP_VIEWS_URL, {
            headers,
            params: { limit },
        })

        return response.data
    }

    static async getTopLikes(limit: number = 5): Promise<YouTubeTopVideosResponse> {
        const authStore = useAuthStore()
        const headers: Record<string, string> = {}

        if (authStore.token) {
            headers['Authorization'] = `Bearer ${authStore.token}`
        }

        const response = await api.get(YOUTUBE_ANALYSIS_TOP_LIKES_URL, {
            headers,
            params: { limit },
        })

        return response.data
    }
}
