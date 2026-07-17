import { ref, onMounted, computed } from 'vue'
import PhotoAnalysisService from '@/services/PhotoAnalysisService'
import AdAnalysisService from '@/services/AdAnalysisService'
import YouTubeAnalysisService from '@/services/YouTubeAnalysisService'

export function useHomeStats() {
    const photoCount = ref(0)
    const adCount = ref(0)
    const youtubeCount = ref(0)
    const loading = ref(true)

    const sumAnalytics = computed(
        () => Number(photoCount.value) + Number(adCount.value) + Number(youtubeCount.value),
    )

    onMounted(async () => {
        try {
            const [photoResult, adResult, youtubeResult] = await Promise.allSettled([
                PhotoAnalysisService.listResults(1, 1),
                AdAnalysisService.listResults(1, 1),
                YouTubeAnalysisService.listResults(1, 1),
            ])

            if (photoResult.status === 'fulfilled') {
                photoCount.value = photoResult.value.total
            }
            if (adResult.status === 'fulfilled') {
                adCount.value = adResult.value.total
            }
            if (youtubeResult.status === 'fulfilled') {
                youtubeCount.value = youtubeResult.value.total
            }
        } catch {
            // Silently fallback to zeros
        } finally {
            loading.value = false
        }
    })

    return { photoCount, adCount, youtubeCount, loading, sumAnalytics }
}
