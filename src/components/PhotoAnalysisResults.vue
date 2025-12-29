<template>
    <section class="results-section">
        <header class="prime-header">
            <span class="prime-header-title">
                <i class="pi pi-list"></i> Minhas análises
            </span>
            <p class="prime-header-desc">
                Consulte as análises realizadas. Você pode navegar pelas páginas.
            </p>
        </header>

        <DataTable :value="items" :loading="loading" :paginator="true" :rows="limit" :totalRecords="total" :lazy="true"
            :first="first" @page="onPage" class="results-table" :rowsPerPageOptions="[5, 10, 20, 50]">
            <Column field="location" header="Local/ambiente" :sortable="false" />
            <Column field="style" header="Estilo" :sortable="false" />
            <Column field="feeling" header="Sentimento" :sortable="false" />
            <Column :sortable="false">
                <template #body="{ data }">
                    <button class="detail-btn" @click="openDetails(data.id)">
                        <i class="pi pi-eye"></i> Detalhes
                    </button>
                </template>
            </Column>
        </DataTable>

        <Dialog v-model:visible="showModal" :header="'Análise Completa'" :modal="true"
            :style="{ width: '90%', maxWidth: '600px' }" @hide="closeModal">
            <div v-if="detailLoading" class="detail-loading">
                <i class="pi pi-spin pi-spinner"></i> Carregando...
            </div>
            <div v-else-if="selectedDetail" class="detail-content">
                <div class="detail-item">
                    <h3 class="detail-label">Local/Ambiente</h3>
                    <p class="detail-value">{{ selectedDetail.location }}</p>
                </div>
                <div class="detail-item">
                    <h3 class="detail-label">Descrição</h3>
                    <p class="detail-value">{{ selectedDetail.description }}</p>
                </div>
                <div class="detail-item">
                    <h3 class="detail-label">Estilo</h3>
                    <p class="detail-value">{{ selectedDetail.style }}</p>
                </div>
                <div class="detail-item">
                    <h3 class="detail-label">Sentimento</h3>
                    <p class="detail-value">{{ selectedDetail.feeling }}</p>
                </div>
                <div class="detail-item">
                    <h3 class="detail-label">Data da Análise</h3>
                    <p class="detail-value">{{ formatDate(selectedDetail.createdAt) }}</p>
                </div>
            </div>
        </Dialog>
    </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Dialog from 'primevue/dialog'
import PhotoAnalysisService from '@/services/PhotoAnalysisService'
import type { PhotoAnalysisListItem } from '@/types/PhotoAnalysisListItem'
import type { PhotoAnalysisDetail } from '@/types/PhotoAnalysisListItem'

const items = ref<PhotoAnalysisListItem[]>([])
const total = ref(0)
const page = ref(1)
const limit = ref(10)
const first = ref(0)
const loading = ref(false)

const showModal = ref(false)
const selectedDetail = ref<PhotoAnalysisDetail | null>(null)
const detailLoading = ref(false)

async function load() {
    loading.value = true
    try {
        const res = await PhotoAnalysisService.listResults(page.value, limit.value)
        items.value = res.data
        total.value = res.total
        // Keep page/first in sync with backend
        page.value = res.page
        first.value = (page.value - 1) * limit.value
    } finally {
        loading.value = false
    }
}

function onPage(event: { first: number; rows: number }) {
    first.value = event.first
    limit.value = event.rows
    // Convert first/rows to 1-based page
    page.value = Math.floor(event.first / event.rows) + 1
    load()
}

async function openDetails(id: number) {
    detailLoading.value = true
    showModal.value = true
    try {
        selectedDetail.value = await PhotoAnalysisService.getResultDetail(id)
    } finally {
        detailLoading.value = false
    }
}

function closeModal() {
    showModal.value = false
    selectedDetail.value = null
}

function formatDate(dateString: string): string {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }).format(date)
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
}
</style>
