<template>
    <section class="results-section">
        <header class="prime-header">
            <span class="prime-header-title">
                <i class="pi pi-youtube"></i> Minhas análises de vídeos
            </span>
            <p class="prime-header-desc">
                Consulte as análises de vídeos do YouTube e abra os detalhes completos quando necessário.
            </p>
        </header>

        <DataTable
            :value="items"
            :loading="loading"
            :paginator="true"
            :rows="limit"
            :totalRecords="total"
            :lazy="true"
            :first="first"
            @page="onPage"
            class="results-table"
            :rowsPerPageOptions="[5, 10, 20, 50]"
        >
            <Column header="Título" :sortable="false">
                <template #body="{ data }">
                    <a
                        v-if="isValidUrl(data.youtubeUrl)"
                        :href="data.youtubeUrl"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="table-link"
                    >
                        {{ fallbackValue(data.title) }}
                    </a>
                    <span v-else>{{ fallbackValue(data.title) }}</span>
                </template>
            </Column>
            <Column header="Autor" :sortable="false">
                <template #body="{ data }">
                    {{ fallbackValue(data.author) }}
                </template>
            </Column>
            <Column header="Categoria" :sortable="false">
                <template #body="{ data }">
                    {{ fallbackValue(data.category) }}
                </template>
            </Column>
            <Column header="Data da análise" :sortable="false">
                <template #body="{ data }">
                    {{ formatDate(data.createdAt) }}
                </template>
            </Column>
            <Column :sortable="false">
                <template #body="{ data }">
                    <button class="detail-btn" @click="openDetails(data.id)">
                        <i class="pi pi-eye"></i> Detalhes
                    </button>
                </template>
            </Column>
        </DataTable>

        <Dialog
            v-model:visible="showModal"
            :header="'Análise de vídeo completa'"
            :modal="true"
            :style="{ width: '90%', maxWidth: '760px' }"
            @hide="closeModal"
        >
            <div v-if="detailLoading" class="detail-loading">
                <i class="pi pi-spin pi-spinner"></i> Carregando...
            </div>
            <div v-else-if="selectedDetail" class="detail-content">
                <div class="detail-group">
                    <h3 class="group-title">Dados principais</h3>
                    <div class="detail-item">
                        <h4 class="detail-label">Título</h4>
                        <p class="detail-value">{{ fallbackValue(selectedDetail.title) }}</p>
                    </div>
                    <div class="detail-item">
                        <h4 class="detail-label">Autor</h4>
                        <p class="detail-value">{{ fallbackValue(selectedDetail.author) }}</p>
                    </div>
                    <div class="detail-item">
                        <h4 class="detail-label">Categoria</h4>
                        <p class="detail-value">{{ fallbackValue(selectedDetail.category) }}</p>
                    </div>
                    <div class="detail-item">
                        <h4 class="detail-label">URL do YouTube</h4>
                        <p class="detail-value">
                            <a
                                v-if="isValidUrl(selectedDetail.youtubeUrl)"
                                :href="selectedDetail.youtubeUrl as string"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="table-link"
                            >
                                {{ selectedDetail.youtubeUrl }}
                            </a>
                            <span v-else>{{ fallbackValue(selectedDetail.youtubeUrl) }}</span>
                        </p>
                    </div>
                </div>

                <div class="detail-group">
                    <h3 class="group-title">Metadados do vídeo</h3>
                    <div class="detail-item">
                        <h4 class="detail-label">ID da análise</h4>
                        <p class="detail-value">{{ selectedDetail.id }}</p>
                    </div>
                    <div class="detail-item">
                        <h4 class="detail-label">ID do vídeo</h4>
                        <p class="detail-value">{{ fallbackValue(selectedDetail.videoId) }}</p>
                    </div>
                    <div class="detail-item">
                        <h4 class="detail-label">Duração</h4>
                        <p class="detail-value">{{ formatDuration(selectedDetail.lengthSeconds) }}</p>
                    </div>
                    <div class="detail-item">
                        <h4 class="detail-label">ID do canal</h4>
                        <p class="detail-value">{{ fallbackValue(selectedDetail.channelId) }}</p>
                    </div>
                    <div class="detail-item">
                        <h4 class="detail-label">Perfil do canal</h4>
                        <p class="detail-value">
                            <a
                                v-if="isValidUrl(selectedDetail.ownerProfileUrl)"
                                :href="selectedDetail.ownerProfileUrl as string"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="table-link"
                            >
                                {{ selectedDetail.ownerProfileUrl }}
                            </a>
                            <span v-else>{{ fallbackValue(selectedDetail.ownerProfileUrl) }}</span>
                        </p>
                    </div>
                    <div class="detail-item">
                        <h4 class="detail-label">Conteúdo ao vivo</h4>
                        <p class="detail-value">{{ selectedDetail.isLiveContent ? 'Sim' : 'Não' }}</p>
                    </div>
                    <div class="detail-item">
                        <h4 class="detail-label">Visualizações</h4>
                        <p class="detail-value">{{ fallbackValue(selectedDetail.viewCount) }}</p>
                    </div>
                    <div class="detail-item">
                        <h4 class="detail-label">Likes</h4>
                        <p class="detail-value">{{ fallbackValue(selectedDetail.likeCount) }}</p>
                    </div>
                    <div class="detail-item">
                        <h4 class="detail-label">Data da análise</h4>
                        <p class="detail-value">{{ formatDate(selectedDetail.createdAt) }}</p>
                    </div>
                </div>

                <div class="detail-group">
                    <h3 class="group-title">Descrição</h3>
                    <div class="detail-item">
                        <h4 class="detail-label">Descrição curta</h4>
                        <p class="detail-value">{{ fallbackValue(selectedDetail.shortDescription) }}</p>
                    </div>
                </div>
            </div>
        </Dialog>
    </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Dialog from 'primevue/dialog'
import PhotoAnalysisService from '@/services/PhotoAnalysisService'
import type { YouTubeAnalysisListItem } from '@/types/PhotoAnalysisListItem'
import type { YouTubeAnalysisDetail } from '@/types/PhotoAnalysisListItem'

const items = ref<YouTubeAnalysisListItem[]>([])
const total = ref(0)
const page = ref(1)
const limit = ref(10)
const first = ref(0)
const loading = ref(false)

const showModal = ref(false)
const selectedDetail = ref<YouTubeAnalysisDetail | null>(null)
const detailLoading = ref(false)

async function load() {
    loading.value = true
    try {
        const res = await PhotoAnalysisService.listYoutubeResults(page.value, limit.value)
        items.value = res.data
        total.value = res.total
        page.value = res.page
        first.value = (page.value - 1) * limit.value
    } finally {
        loading.value = false
    }
}

function onPage(event: { first: number; rows: number }) {
    first.value = event.first
    limit.value = event.rows
    page.value = Math.floor(event.first / event.rows) + 1
    load()
}

async function openDetails(id: number) {
    detailLoading.value = true
    showModal.value = true
    try {
        selectedDetail.value = await PhotoAnalysisService.getYoutubeResultDetail(id)
    } finally {
        detailLoading.value = false
    }
}

function closeModal() {
    showModal.value = false
    selectedDetail.value = null
}

function fallbackValue(value: string | null | undefined): string {
    if (!value) {
        return '-'
    }

    return value
}

function formatDate(value: string | null | undefined): string {
    if (!value) {
        return '-'
    }

    const parsedDate = new Date(value)

    if (Number.isNaN(parsedDate.getTime())) {
        return '-'
    }

    return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }).format(parsedDate)
}

function formatDuration(seconds: string | null | undefined): string {
    if (!seconds) {
        return '-'
    }

    const totalSeconds = Number.parseInt(seconds, 10)

    if (Number.isNaN(totalSeconds) || totalSeconds < 0) {
        return '-'
    }

    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const remainingSeconds = totalSeconds % 60

    return [hours, minutes, remainingSeconds].map((part) => String(part).padStart(2, '0')).join(':')
}

function isValidUrl(url: string | null | undefined): boolean {
    if (!url) {
        return false
    }

    try {
        const parsed = new URL(url)
        return parsed.protocol === 'http:' || parsed.protocol === 'https:'
    } catch {
        return false
    }
}

onMounted(() => {
    load()
})
</script>

<style scoped>
.results-section {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
}

.results-table :deep(.p-datatable) {
    border-radius: 14px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    border: 1px solid #e5e7eb;
}

.prime-header {
    width: 100%;
    background: #fff;
    border-radius: 14px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    padding: 1.5rem 2rem;
    border: 1px solid #e5e7eb;
}

.prime-header-title {
    color: #1f2937;
    font-size: 1.4rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 0.6rem;
    margin-bottom: 0.5rem;
}

.prime-header-title .pi {
    color: #4287f5;
    font-size: 1.2rem;
}

.prime-header-desc {
    font-size: 1rem;
    color: #374151;
}

.table-link {
    color: #2563eb;
    text-decoration: underline;
    word-break: break-all;
}

.detail-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: #4287f5;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s, transform 0.2s;
}

.detail-btn:hover {
    background: #3070d8;
    transform: translateY(-1px);
}

.detail-btn:active {
    transform: translateY(0);
}

.detail-btn .pi {
    font-size: 0.75rem;
}

.detail-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    color: #4287f5;
    font-size: 1.1rem;
    gap: 0.5rem;
}

.detail-content {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.detail-group {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.group-title {
    color: #1f2937;
    margin: 0;
}

.detail-item {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
}

.detail-label {
    color: #4287f5;
    font-size: 0.9rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin: 0;
}

.detail-value {
    color: #1f2937;
    font-size: 1rem;
    line-height: 1.6;
    margin: 0;
    padding: 0.75rem;
    background: #f9fafb;
    border-radius: 8px;
    border-left: 3px solid #4287f5;
    white-space: pre-wrap;
    word-break: break-word;
}
</style>
