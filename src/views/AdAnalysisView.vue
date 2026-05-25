<template>
    <MainLayout>
        <template #default>
            <main class="upload-main">
                <header class="upload-header prime-header">
                    <span class="prime-header-title">
                        <i class="pi pi-megaphone"></i> Análise de anúncio por URL
                    </span>
                    <p class="prime-header-desc">
                        Informe a URL da imagem do anúncio para iniciar a análise estratégica.
                    </p>

                    <div class="url-form">
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
                </header>

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

                <AdAnalysisDashboard v-if="analysisResult" :result="analysisResult" />
            </main>
        </template>
    </MainLayout>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import axios from 'axios'
import MainLayout from '@/components/MainLayout.vue'
import AdAnalysisDashboard from '@/components/AdAnalysisDashboard.vue'
import PhotoAnalysisService from '@/services/PhotoAnalysisService'
import type { AdAnalysisResult } from '@/types/PhotoAnalysisResult'
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

async function handleAnalyze() {
    if (!isImageUrlValid.value) {
        errorMessage.value = 'Informe uma URL válida para continuar.'
        return
    }

    isLoading.value = true
    errorMessage.value = ''
    analysisResult.value = null

    try {
        const result = await PhotoAnalysisService.analyzeAdImage(imageUrl.value.trim())
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