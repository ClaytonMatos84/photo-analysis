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
            <Column field="description" header="Descrição" :sortable="false" />
            <Column field="location" header="Local/ambiente" :sortable="false" />
            <Column field="style" header="Estilo" :sortable="false" />
            <Column field="feeling" header="Sentimento" :sortable="false" />
        </DataTable>
    </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import PhotoAnalysisService from '@/services/PhotoAnalysisService'
import type { PhotoAnalysisListItem } from '@/types/PhotoAnalysisListItem'

const items = ref<PhotoAnalysisListItem[]>([])
const total = ref(0)
const page = ref(1)
const limit = ref(10)
const first = ref(0)
const loading = ref(false)

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
</style>
