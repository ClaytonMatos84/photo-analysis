<template>
    <MainLayout>
        <PageHero
            title="Análise de vídeo do YouTube"
            icon="pi pi-youtube"
            description="Informe a URL do vídeo do YouTube para iniciar a análise."
        >
            <div class="url-form" v-animateonscroll="{ enterClass: 'animate-zoom-in' }">
                <InputText
                    v-model="youtubeUrl"
                    placeholder="https://www.youtube.com/watch?v=PsquuVU6zJg"
                    class="url-input"
                    :disabled="isLoading"
                />
                <Button
                    label="Analisar video"
                    icon="pi pi-play"
                    :loading="isLoading"
                    :disabled="isLoading || !isYoutubeUrlValid"
                    @click="handleAnalyze"
                />
            </div>

            <Message v-if="errorMessage" severity="error" :closable="false" class="youtube-error">
                {{ errorMessage }}
            </Message>
        </PageHero>

        <main class="upload-main">
            <AnalysisEmptyState
                v-if="showEmptyState"
                :steps="youtubeEmptyStateSteps"
                :benefits="youtubeEmptyStateBenefits"
            />
            <section v-if="analysisResult && submittedVideoId" class="video-preview-card">
                <h3>Pre-visualizacao do video</h3>
                <div class="video-frame-wrapper">
                    <iframe
                        :src="embedUrl"
                        title="Player do YouTube"
                        class="video-frame"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen
                    ></iframe>
                </div>
            </section>

            <div v-if="isLoading" class="analysis-loading">
                <ProgressSpinner strokeWidth="4" />
                <span>A analise de video pode levar alguns instantes...</span>
            </div>

            <YouTubeAnalysisDashboard
                v-if="analysisResult"
                v-animateonscroll="{ enterClass: 'animate-slide-bottom' }"
                :result="analysisResult"
            />
        </main>
    </MainLayout>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import axios from 'axios'
import MainLayout from '@/components/utils/MainLayout.vue'
import PageHero from '@/components/utils/PageHero.vue'
import YouTubeAnalysisDashboard from '@/components/youtube/YouTubeAnalysisDashboard.vue'
import AnalysisEmptyState from '@/components/utils/AnalysisEmptyState.vue'
import { youtubeEmptyStateSteps, youtubeEmptyStateBenefits } from '@/content/youtubeEmptyState'
import YouTubeAnalysisService from '@/services/YouTubeAnalysisService'
import type { YouTubeAnalysisResult } from '@/types/YouTubeAnalysisTypes'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Message from 'primevue/message'
import ProgressSpinner from 'primevue/progressspinner'
import { useErrorHandler } from '@/composables/useErrorHandler'
import { useToast } from '@/composables/useToast'

const youtubeUrl = ref('')
const submittedVideoId = ref('')
const isLoading = ref(false)
const errorMessage = ref('')
const analysisResult = ref<YouTubeAnalysisResult | null>(null)

const { handleError } = useErrorHandler()
const { showSuccess } = useToast()

const showEmptyState = computed(() => !analysisResult.value)

function extractYoutubeVideoId(urlValue: string): string {
    const normalizedUrl = urlValue.trim()

    if (!normalizedUrl) {
        return ''
    }

    let parsed: URL

    try {
        parsed = new URL(normalizedUrl)
    } catch {
        return ''
    }

    const host = parsed.hostname.toLowerCase()

    if (host === 'youtu.be' || host === 'www.youtu.be') {
        return parsed.pathname.replace('/', '').trim()
    }

    if (host === 'youtube.com' || host === 'www.youtube.com' || host === 'm.youtube.com') {
        if (parsed.pathname === '/watch') {
            return parsed.searchParams.get('v')?.trim() || ''
        }

        if (parsed.pathname.startsWith('/shorts/')) {
            return parsed.pathname.split('/shorts/')[1]?.split('/')[0]?.trim() || ''
        }

        if (parsed.pathname.startsWith('/embed/')) {
            return parsed.pathname.split('/embed/')[1]?.split('/')[0]?.trim() || ''
        }
    }

    return ''
}

const extractedVideoId = computed(() => extractYoutubeVideoId(youtubeUrl.value))
const isYoutubeUrlValid = computed(() => extractedVideoId.value.length > 0)
const embedUrl = computed(() => `https://www.youtube.com/embed/${submittedVideoId.value}`)

async function handleAnalyze() {
    if (!isYoutubeUrlValid.value) {
        errorMessage.value = 'Informe uma URL valida do YouTube para continuar.'
        submittedVideoId.value = ''
        return
    }

    const trimmedUrl = youtubeUrl.value.trim()

    isLoading.value = true
    errorMessage.value = ''
    analysisResult.value = null
    submittedVideoId.value = ''

    try {
        const result = await YouTubeAnalysisService.analyzeVideo(trimmedUrl)
        analysisResult.value = result
        submittedVideoId.value = result.videoId || extractedVideoId.value

        showSuccess('Analise concluida!', 'Video do YouTube analisado com sucesso')
    } catch (error) {
        submittedVideoId.value = ''

        if (axios.isAxiosError(error) && error.code === 'ECONNABORTED') {
            errorMessage.value =
                'A analise esta demorando mais que o esperado. Tente novamente em instantes.'
        } else {
            errorMessage.value = 'Ocorreu um erro ao analisar o video do YouTube.'
        }

        handleError(error, 'Erro ao analisar video do YouTube')
    } finally {
        isLoading.value = false
    }
}
</script>

<style scoped>
.upload-main {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    color: #0f172a;
    padding: 1.5rem 1rem 2rem;
    max-width: 1280px;
    margin: 0 auto;
    width: 100%;
}

.url-form {
    display: flex;
    gap: 0.75rem;
    align-items: center;
    justify-content: center;
    width: 100%;
    flex-wrap: wrap;
}

.url-input {
    flex: 1;
    min-width: 290px;
    max-width: 720px;
}

.youtube-error {
    margin-top: 1rem;
    text-align: left;
}

.video-preview-card {
    width: 100%;
    background: #fff;
    border-radius: 14px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    padding: 1.5rem;
    border: 1px solid #e5e7eb;
}

.video-preview-card h3 {
    margin-top: 0;
    color: #1f2937;
    margin-bottom: 1rem;
}

.video-frame-wrapper {
    width: 100%;
    aspect-ratio: 16 / 9;
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid #e5e7eb;
    background: #0f172a;
}

.video-frame {
    width: 100%;
    height: 100%;
    border: 0;
    display: block;
}

.analysis-loading {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 0.75rem;
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 1.5rem;
    color: #1f2937;
}

@media (max-width: 900px) {
    .url-input {
        min-width: 100%;
    }

    .url-form {
        flex-direction: column;
        align-items: stretch;
    }
}

/* Animations */
.animate-zoom-in {
    animation: zoomIn 0.5s ease-out both;
}

.animate-slide-bottom {
    animation: slideBottom 0.6s ease-out both;
}

@keyframes zoomIn {
    from {
        opacity: 0;
        transform: scale(0.85);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

@keyframes slideBottom {
    from {
        opacity: 0;
        transform: translateY(40px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
