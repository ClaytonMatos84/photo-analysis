<template>
    <MainLayout>
        <PageHero
            title="Análise de anúncio por URL"
            icon="pi pi-megaphone"
            description="Informe a URL da imagem do anúncio para iniciar a análise estratégica."
        >
            <div class="url-form" v-animateonscroll="{ enterClass: 'animate-zoom-in' }">
                <InputText
                    v-model="imageUrl"
                    placeholder="https://exemplo.com/imagem-do-anuncio.jpg"
                    class="url-input"
                    :disabled="isLoading"
                />
                <Button
                    label="Analisar anúncio"
                    icon="pi pi-search"
                    :loading="isLoading"
                    :disabled="isLoading || !isImageUrlValid"
                    @click="handleAnalyze"
                />
            </div>

            <Message v-if="errorMessage" severity="error" :closable="false" class="ad-error">
                {{ errorMessage }}
            </Message>
        </PageHero>

        <main class="upload-main">
            <AnalysisEmptyState
                v-if="showEmptyState"
                :steps="adEmptyStateSteps"
                :benefits="adEmptyStateBenefits"
            />
            <section v-if="imageUrl.trim()" class="image-preview-card">
                <h3>Pré-visualização da imagem</h3>
                <Message v-if="!isImageUrlValid" severity="warn" :closable="false">
                    Informe uma URL válida iniciando com http:// ou https://.
                </Message>
                <template v-else>
                    <img
                        :src="imageUrl.trim()"
                        alt="Pré-visualização do anúncio"
                        class="preview-image"
                        @error="hasPreviewError = true"
                        @load="hasPreviewError = false"
                    />
                    <Message v-if="hasPreviewError" severity="warn" :closable="false" class="preview-warning">
                        Não foi possível carregar a imagem com a URL informada.
                    </Message>
                </template>
            </section>

            <div v-if="isLoading" class="analysis-loading">
                <ProgressSpinner strokeWidth="4" />
                <span>A análise de anúncio pode levar alguns instantes...</span>
            </div>

            <AdAnalysisDashboard
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
import AdAnalysisDashboard from '@/components/ad/AdAnalysisDashboard.vue'
import AnalysisEmptyState from '@/components/utils/AnalysisEmptyState.vue'
import { adEmptyStateSteps, adEmptyStateBenefits } from '@/content/adEmptyState'
import AdAnalysisService from '@/services/AdAnalysisService'
import type { AdAnalysisResult } from '@/types/AdAnalysisTypes'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Message from 'primevue/message'
import ProgressSpinner from 'primevue/progressspinner'
import { useErrorHandler } from '@/composables/useErrorHandler'
import { useToast } from '@/composables/useToast'

const imageUrl = ref('')
const hasPreviewError = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')
const analysisResult = ref<AdAnalysisResult | null>(null)

const { handleError } = useErrorHandler()
const { showSuccess } = useToast()

const isImageUrlValid = computed(() => {
    const candidate = imageUrl.value.trim()

    if (!candidate) {
        return false
    }

    try {
        const parsed = new URL(candidate)
        return parsed.protocol === 'http:' || parsed.protocol === 'https:'
    } catch {
        return false
    }
})

const showEmptyState = computed(() => !isImageUrlValid.value && !analysisResult.value)

async function handleAnalyze() {
    if (!isImageUrlValid.value) {
        errorMessage.value = 'Informe uma URL válida para continuar.'
        return
    }

    isLoading.value = true
    errorMessage.value = ''
    analysisResult.value = null

    try {
        const result = await AdAnalysisService.analyzeAdImage(imageUrl.value.trim())
        analysisResult.value = result
        showSuccess('Análise concluída!', 'Anúncio analisado com sucesso')
    } catch (error) {
        if (axios.isAxiosError(error) && error.code === 'ECONNABORTED') {
            errorMessage.value =
                'A análise está demorando mais que o esperado. Tente novamente em instantes.'
        } else {
            errorMessage.value = 'Ocorreu um erro ao analisar o anúncio.'
        }

        handleError(error, 'Erro ao analisar anúncio')
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

.ad-error {
    margin-top: 1rem;
    text-align: left;
}

.image-preview-card {
    width: 100%;
    background: #fff;
    border-radius: 14px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    padding: 1.5rem;
    border: 1px solid #e5e7eb;
}

.image-preview-card h3 {
    margin-top: 0;
    color: #1f2937;
    margin-bottom: 1rem;
}

.preview-image {
    display: block;
    width: 100%;
    max-height: 500px;
    object-fit: contain;
    border-radius: 12px;
    border: 1px solid #e5e7eb;
    background: #f8fafc;
}

.preview-warning {
    margin-top: 1rem;
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