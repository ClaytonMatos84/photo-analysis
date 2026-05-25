<template>
    <section class="results-section">
        <header class="prime-header">
            <span class="prime-header-title">
                <i class="pi pi-megaphone"></i> Minhas análises de anúncios
            </span>
            <p class="prime-header-desc">
                Consulte as análises de anúncios e abra os detalhes completos quando necessário.
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
            <Column header="Marca analisada" :sortable="false">
                <template #body="{ data }">
                    {{ data.comparador?.marcaAnalisada || '-' }}
                </template>
            </Column>
            <Column header="Principal concorrente" :sortable="false">
                <template #body="{ data }">
                    {{ data.melhoria?.principalConcorrente || '-' }}
                </template>
            </Column>
            <Column header="URL" :sortable="false">
                <template #body="{ data }">
                    <a
                        v-if="isValidUrl(data.melhoria?.url)"
                        :href="data.melhoria?.url"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="table-link"
                    >
                        {{ data.melhoria?.url }}
                    </a>
                    <span v-else>-</span>
                </template>
            </Column>
            <Column header="Data da análise" :sortable="false">
                <template #body="{ data }">
                    {{ formatDate(data.dataAnalise) }}
                </template>
            </Column>
            <Column :sortable="false">
                <template #body="{ data }">
                    <button class="detail-btn" @click="openDetails(data.analysisId)">
                        <i class="pi pi-eye"></i> Detalhes
                    </button>
                </template>
            </Column>
        </DataTable>

        <Dialog
            v-model:visible="showModal"
            :header="'Análise de anúncio completa'"
            :modal="true"
            :style="{ width: '90%', maxWidth: '760px' }"
            @hide="closeModal"
        >
            <div v-if="detailLoading" class="detail-loading">
                <i class="pi pi-spin pi-spinner"></i> Carregando...
            </div>
            <div v-else-if="selectedDetail" class="detail-content">
                <div class="detail-group">
                    <h3 class="group-title">Comparador</h3>
                    <div class="detail-item">
                        <h4 class="detail-label">Resumo de posicionamento da marca</h4>
                        <p class="detail-value">{{ selectedDetail.comparador.resumoPosicionamentoMarca }}</p>
                    </div>
                    <div class="detail-item">
                        <h4 class="detail-label">Quantidade de concorrentes</h4>
                        <p class="detail-value">{{ selectedDetail.comparador.quantidadeConcorrentes }}</p>
                    </div>
                    <div class="detail-item">
                        <h4 class="detail-label">Forças da marca</h4>
                        <p class="detail-value">{{ selectedDetail.comparador.forcasDaMarca }}</p>
                    </div>
                    <div class="detail-item">
                        <h4 class="detail-label">Fraquezas da marca</h4>
                        <p class="detail-value">{{ selectedDetail.comparador.fraquezasDaMarca }}</p>
                    </div>
                    <div class="detail-item">
                        <h4 class="detail-label">Oportunidades de mercado</h4>
                        <p class="detail-value">{{ selectedDetail.comparador.oportunidadesDeMercado }}</p>
                    </div>
                    <div class="detail-item">
                        <h4 class="detail-label">Ameaças</h4>
                        <p class="detail-value">{{ selectedDetail.comparador.ameacas }}</p>
                    </div>
                    <div class="detail-item">
                        <h4 class="detail-label">Insight final</h4>
                        <p class="detail-value">{{ selectedDetail.comparador.insightFinal }}</p>
                    </div>
                </div>

                <div class="detail-group">
                    <h3 class="group-title">Estratégia</h3>
                    <div class="detail-item">
                        <h4 class="detail-label">Posicionamento sugerido</h4>
                        <p class="detail-value">{{ selectedDetail.estrategia.posicionamentoSugerido }}</p>
                    </div>
                    <div class="detail-item">
                        <h4 class="detail-label">Proposta de valor reforçada</h4>
                        <p class="detail-value">{{ selectedDetail.estrategia.propostaDeValorReforcada }}</p>
                    </div>
                    <div class="detail-item">
                        <h4 class="detail-label">Mensagem principal</h4>
                        <p class="detail-value">{{ selectedDetail.estrategia.mensagemPrincipal }}</p>
                    </div>
                    <div class="detail-item">
                        <h4 class="detail-label">Tom de voz sugerido</h4>
                        <p class="detail-value">{{ selectedDetail.estrategia.tomDeVozSugerido }}</p>
                    </div>
                </div>

                <div class="detail-group">
                    <h3 class="group-title">Melhoria</h3>
                    <div class="detail-item">
                        <h4 class="detail-label">Critério de escolha do concorrente</h4>
                        <p class="detail-value">{{ selectedDetail.melhoria.criterioDeEscolhaDoConcorrente }}</p>
                    </div>
                    <div class="detail-item">
                        <h4 class="detail-label">Pontos fortes do cliente</h4>
                        <p class="detail-value">{{ selectedDetail.melhoria.pontosFortesDoCliente }}</p>
                    </div>
                    <div class="detail-item">
                        <h4 class="detail-label">Pontos fortes do concorrente</h4>
                        <p class="detail-value">{{ selectedDetail.melhoria.pontosFortesDoConcorrente }}</p>
                    </div>
                    <div class="detail-item">
                        <h4 class="detail-label">Oportunidades de melhoria para o cliente</h4>
                        <p class="detail-value">{{ selectedDetail.melhoria.oportunidadesDeMelhoriaParaOCliente }}</p>
                    </div>
                    <div class="detail-item">
                        <h4 class="detail-label">Mensagem</h4>
                        <p class="detail-value">{{ selectedDetail.melhoria.mensagem }}</p>
                    </div>
                    <div class="detail-item">
                        <h4 class="detail-label">Elementos visuais</h4>
                        <p class="detail-value">{{ selectedDetail.melhoria.elementosVisuais }}</p>
                    </div>
                    <div class="detail-item">
                        <h4 class="detail-label">Tom de voz</h4>
                        <p class="detail-value">{{ selectedDetail.melhoria.tomDeVoz }}</p>
                    </div>
                    <div class="detail-item">
                        <h4 class="detail-label">Call to action</h4>
                        <p class="detail-value">{{ selectedDetail.melhoria.callToAction }}</p>
                    </div>
                    <div class="detail-item">
                        <h4 class="detail-label">Proposta de valor reforçada</h4>
                        <p class="detail-value">{{ selectedDetail.melhoria.propostaDeValorReforcada }}</p>
                    </div>
                    <div class="detail-item">
                        <h4 class="detail-label">Exemplo resumido de reformulação</h4>
                        <p class="detail-value">{{ selectedDetail.melhoria.exemploResumidoDeReformulacao }}</p>
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
import type { AdAnalysisListItem } from '@/types/PhotoAnalysisListItem'
import type { AdAnalysisResult } from '@/types/PhotoAnalysisResult'

const items = ref<AdAnalysisListItem[]>([])
const total = ref(0)
const page = ref(1)
const limit = ref(10)
const first = ref(0)
const loading = ref(false)

const showModal = ref(false)
const selectedDetail = ref<AdAnalysisResult | null>(null)
const detailLoading = ref(false)

async function load() {
    loading.value = true
    try {
        const res = await PhotoAnalysisService.listAdResults(page.value, limit.value)
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

async function openDetails(analysisId: string) {
    detailLoading.value = true
    showModal.value = true
    try {
        selectedDetail.value = await PhotoAnalysisService.getAdResultDetail(analysisId)
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

    if (Number.isNaN(date.getTime())) {
        return '-'
    }

    return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }).format(date)
}

function isValidUrl(url: string | undefined): boolean {
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
}
</style>
