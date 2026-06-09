<template>
    <div class="dashboard-card">
        <SectionTitle
            title="Resultado da análise de vídeo"
            :description="summaryDescription"
        />

        <Card class="analysis-section">
            <template #title>
                <span class="analysis-section-title">Identificação do vídeo</span>
            </template>
            <template #content>
                <div class="analysis-grid">
                    <div v-for="item in videoItems" :key="item.label" class="analysis-item">
                        <h4 class="analysis-grid-title">{{ item.label }}</h4>
                        <p>{{ item.value }}</p>
                    </div>
                </div>
            </template>
        </Card>

        <Card class="analysis-section">
            <template #title>
                <span class="analysis-section-title">Canal e engajamento</span>
            </template>
            <template #content>
                <div class="analysis-grid">
                    <div v-for="item in channelItems" :key="item.label" class="analysis-item">
                        <h4 class="analysis-grid-title">{{ item.label }}</h4>
                        <p>{{ item.value }}</p>
                    </div>
                </div>
            </template>
        </Card>

        <Card class="analysis-section">
            <template #title>
                <span class="analysis-section-title">Descrição do vídeo</span>
            </template>
            <template #content>
                <div class="analysis-grid single-column">
                    <div class="analysis-item">
                        <h4 class="analysis-grid-title">Descrição curta</h4>
                        <p>{{ fallbackValue(result.shortDescription) }}</p>
                    </div>
                </div>
            </template>
        </Card>

        <Card class="analysis-section">
            <template #title>
                <span class="analysis-section-title">Metadados</span>
            </template>
            <template #content>
                <div class="analysis-grid">
                    <div v-for="item in metadataItems" :key="item.label" class="analysis-item">
                        <h4 class="analysis-grid-title">{{ item.label }}</h4>
                        <p>{{ item.value }}</p>
                    </div>
                </div>
            </template>
        </Card>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import Card from 'primevue/card'
import SectionTitle from '@/components/SectionTitle.vue'
import type { YouTubeAnalysisResult } from '@/types/PhotoAnalysisResult'

const props = defineProps<{ result: YouTubeAnalysisResult }>()

const result = computed(() => props.result)

function fallbackValue(value: string | boolean | null | undefined): string {
    if (value === null || value === undefined || value === '') {
        return 'Nao informado'
    }

    if (typeof value === 'boolean') {
        return value ? 'Sim' : 'Nao'
    }

    return value
}

function formatDate(value: string): string {
    const parsedDate = new Date(value)

    if (Number.isNaN(parsedDate.getTime())) {
        return fallbackValue(value)
    }

    return parsedDate.toLocaleString('pt-BR')
}

function formatDuration(seconds: string): string {
    const totalSeconds = Number.parseInt(seconds, 10)

    if (Number.isNaN(totalSeconds) || totalSeconds < 0) {
        return fallbackValue(seconds)
    }

    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const remainingSeconds = totalSeconds % 60

    const parts = [hours, minutes, remainingSeconds].map((part) => String(part).padStart(2, '0'))
    return `${parts[0]}:${parts[1]}:${parts[2]}`
}

const summaryDescription = computed(() => {
    return `Video analisado em ${formatDate(result.value.createdAt)}`
})

const videoItems = computed(() => [
    { label: 'ID da analise', value: String(result.value.id) },
    { label: 'Titulo', value: fallbackValue(result.value.title) },
    { label: 'ID do video', value: fallbackValue(result.value.videoId) },
    { label: 'Duracao', value: formatDuration(result.value.lengthSeconds) },
    { label: 'Categoria', value: fallbackValue(result.value.category) },
    { label: 'URL do YouTube', value: fallbackValue(result.value.youtubeUrl) },
])

const channelItems = computed(() => [
    { label: 'Autor', value: fallbackValue(result.value.author) },
    { label: 'ID do canal', value: fallbackValue(result.value.channelId) },
    { label: 'Perfil do canal', value: fallbackValue(result.value.ownerProfileUrl) },
    { label: 'Quantidade de visualizacoes', value: fallbackValue(result.value.viewCount) },
    { label: 'Quantidade de likes', value: fallbackValue(result.value.likeCount) },
    { label: 'Conteudo ao vivo', value: fallbackValue(result.value.isLiveContent) },
])

const metadataItems = computed(() => [
    { label: 'Criado em', value: formatDate(result.value.createdAt) },
])
</script>

<style scoped>
.dashboard-card {
    width: 100%;
    background: #fff;
    border-radius: 14px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    padding: 2rem;
    margin-top: 1.5rem;
    margin-bottom: 2rem;
    border: 1px solid #e5e7eb;
    color: #0f172a;
}

.analysis-section {
    margin-bottom: 1.5rem;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    box-shadow: 0 8px 22px rgba(0, 0, 0, 0.06);
    background: #f9fafb;
}

.analysis-section-title {
    color: #0f172a;
    font-size: 1.2rem;
    font-weight: 700;
}

.analysis-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 1rem;
}

.single-column {
    grid-template-columns: 1fr;
}

.analysis-grid-title {
    color: #1f2937;
    font-size: 1rem;
    font-weight: 600;
}

.analysis-item {
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 10px;
    padding: 0.9rem 1rem;
}

.analysis-item h4 {
    color: #1f2937;
    margin: 0 0 0.5rem 0;
    font-size: 0.95rem;
}

.analysis-item p {
    margin: 0;
    color: #374151;
    font-size: 0.95rem;
    line-height: 1.45;
    white-space: pre-wrap;
    word-break: break-word;
}

:deep(.p-card) {
    background: transparent;
}

@media (max-width: 900px) {
    .dashboard-card {
        padding: 1.1rem;
    }

    .analysis-grid {
        grid-template-columns: 1fr;
    }
}
</style>
