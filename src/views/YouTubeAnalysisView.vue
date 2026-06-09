<template>
    <MainLayout>
        <template #default>
            <main class="upload-main">
                <header class="upload-header prime-header">
                    <span class="prime-header-title">
                        <i class="pi pi-youtube"></i> Analise de video do YouTube
                    </span>
                    <p class="prime-header-desc">
                        Informe a URL do video do YouTube para iniciar a analise.
                    </p>

                    <div class="url-form">
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
                </header>

                <section v-if="submittedVideoId" class="video-preview-card">
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

                <YouTubeAnalysisDashboard v-if="analysisResult" :result="analysisResult" />
            </main>
        </template>
    </MainLayout>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import axios from 'axios'
import MainLayout from '@/components/MainLayout.vue'
import YouTubeAnalysisDashboard from '@/components/YouTubeAnalysisDashboard.vue'
import PhotoAnalysisService from '@/services/PhotoAnalysisService'
import type { YouTubeAnalysisResult } from '@/types/PhotoAnalysisResult'
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
    submittedVideoId.value = extractedVideoId.value

    try {
        const result = await PhotoAnalysisService.analyzeYoutubeVideo(trimmedUrl)
        analysisResult.value = result

        if (result.videoId) {
            submittedVideoId.value = result.videoId
        }

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
}

.prime-header {
    width: 100%;
    background: #fff;
    border-radius: 14px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    padding: 2rem 2.5rem;
    margin-bottom: 0.5rem;
    text-align: center;
    border: 1px solid #e5e7eb;
}

.prime-header-title {
    color: #1f2937;
    font-size: 1.6rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 0.6rem;
    justify-content: center;
    margin-bottom: 0.75rem;
    letter-spacing: -0.3px;
}

.prime-header-title .pi {
    color: #4287f5;
    font-size: 1.4rem;
}

.prime-header-desc {
    font-size: 1.05rem;
    color: #374151;
    background: #f5f7fb;
    border-radius: 12px;
    padding: 1rem 1.25rem;
    margin: 0 auto 1.25rem auto;
    display: inline-block;
    border: 1px solid #e5e7eb;
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
    .prime-header {
        padding: 1.2rem;
    }

    .url-input {
        min-width: 100%;
    }

    .url-form {
        flex-direction: column;
        align-items: stretch;
    }
}
</style>
