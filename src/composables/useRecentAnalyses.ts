import { ref, onMounted } from 'vue'
import PhotoAnalysisService from '@/services/PhotoAnalysisService'
import AdAnalysisService from '@/services/AdAnalysisService'
import YouTubeAnalysisService from '@/services/YouTubeAnalysisService'

export interface RecentAnalysis {
    id: string
    type: 'foto' | 'anúncio' | 'youtube'
    title: string
    date: string
}

export function useRecentAnalyses() {
    const analyses = ref<RecentAnalysis[]>([])
    const loading = ref(true)

    onMounted(async () => {
        try {
            const [photoResult, adResult, youtubeResult] = await Promise.allSettled([
                PhotoAnalysisService.listResults(1, 5),
                AdAnalysisService.listResults(1, 5),
                YouTubeAnalysisService.listResults(1, 5),
            ])

            const combined: RecentAnalysis[] = []

            if (photoResult.status === 'fulfilled') {
                for (const item of photoResult.value.data) {
                    combined.push({
                        id: String(item.id),
                        type: 'foto',
                        title: item.description || `Foto #${item.id}`,
                        date: item.location || '',
                    })
                }
            }

            if (adResult.status === 'fulfilled') {
                for (const item of adResult.value.data) {
                    combined.push({
                        id: item.analysisId,
                        type: 'anúncio',
                        title: item.comparador?.marcaAnalisada || `Anúncio #${item.analysisId}`,
                        date: item.dataAnalise || '',
                    })
                }
            }

            if (youtubeResult.status === 'fulfilled') {
                for (const item of youtubeResult.value.data) {
                    combined.push({
                        id: String(item.id),
                        type: 'youtube',
                        title: item.title || `Vídeo #${item.id}`,
                        date: item.createdAt || '',
                    })
                }
            }

            combined.sort((a, b) => b.date.localeCompare(a.date))
            analyses.value = combined.slice(0, 10)
        } catch {
            // Silently fallback to empty
        } finally {
            loading.value = false
        }
    })

    return { analyses, loading }
}
