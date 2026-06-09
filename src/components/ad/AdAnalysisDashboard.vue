<template>
    <div class="dashboard-card">
        <SectionTitle title="Resumo da Análise de Anúncio" :description="analysisSummary" />

        <Card class="analysis-section">
            <template #title>
                <span class="analysis-section-title">Comparador</span>
            </template>
            <template #content>
                <div class="analysis-grid">
                    <div v-for="item in comparadorItems" :key="item.label" class="analysis-item">
                        <h4 class="analysis-grid-title">{{ item.label }}</h4>
                        <p>{{ item.value }}</p>
                    </div>
                </div>
            </template>
        </Card>

        <Card class="analysis-section">
            <template #title>
                <span class="analysis-section-title">Estratégia</span>
            </template>
            <template #content>
                <div class="analysis-grid">
                    <div v-for="item in estrategiaItems" :key="item.label" class="analysis-item">
                        <h4 class="analysis-grid-title">{{ item.label }}</h4>
                        <p>{{ item.value }}</p>
                    </div>
                </div>
            </template>
        </Card>

        <Card class="analysis-section">
            <template #title>
                <span class="analysis-section-title">Melhoria</span>
            </template>
            <template #content>
                <div class="analysis-grid">
                    <div v-for="item in melhoriaItems" :key="item.label" class="analysis-item">
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
import SectionTitle from '@/components/utils/SectionTitle.vue'
import type { AdAnalysisResult } from '@/types/AdAnalysisTypes'

const props = defineProps<{ result: AdAnalysisResult }>()

function formatDate(value: string): string {
    const date = new Date(value)

    if (Number.isNaN(date.getTime())) {
        return value
    }

    return date.toLocaleString('pt-BR')
}

const analysisSummary = computed(() => {
    return `Data: ${formatDate(props.result.dataAnalise)}`
})

const comparadorItems = computed(() => [
    { label: 'Marca analisada', value: props.result.comparador.marcaAnalisada },
    {
        label: 'Resumo de posicionamento da marca',
        value: props.result.comparador.resumoPosicionamentoMarca,
    },
    {
        label: 'Quantidade de concorrentes',
        value: String(props.result.comparador.quantidadeConcorrentes),
    },
    { label: 'Forças da marca', value: props.result.comparador.forcasDaMarca },
    { label: 'Fraquezas da marca', value: props.result.comparador.fraquezasDaMarca },
    {
        label: 'Oportunidades de mercado',
        value: props.result.comparador.oportunidadesDeMercado,
    },
    { label: 'Ameaças', value: props.result.comparador.ameacas },
    { label: 'Insight final', value: props.result.comparador.insightFinal },
])

const estrategiaItems = computed(() => [
    {
        label: 'Posicionamento sugerido',
        value: props.result.estrategia.posicionamentoSugerido,
    },
    {
        label: 'Proposta de valor reforçada',
        value: props.result.estrategia.propostaDeValorReforcada,
    },
    { label: 'Mensagem principal', value: props.result.estrategia.mensagemPrincipal },
    { label: 'Tom de voz sugerido', value: props.result.estrategia.tomDeVozSugerido },
])

const melhoriaItems = computed(() => [
    {
        label: 'Principal concorrente',
        value: props.result.melhoria.principalConcorrente,
    },
    {
        label: 'Critério de escolha do concorrente',
        value: props.result.melhoria.criterioDeEscolhaDoConcorrente,
    },
    {
        label: 'Pontos fortes do cliente',
        value: props.result.melhoria.pontosFortesDoCliente,
    },
    {
        label: 'Pontos fortes do concorrente',
        value: props.result.melhoria.pontosFortesDoConcorrente,
    },
    {
        label: 'Oportunidades de melhoria para o cliente',
        value: props.result.melhoria.oportunidadesDeMelhoriaParaOCliente,
    },
    { label: 'Mensagem', value: props.result.melhoria.mensagem },
    { label: 'Elementos visuais', value: props.result.melhoria.elementosVisuais },
    { label: 'Tom de voz', value: props.result.melhoria.tomDeVoz },
    { label: 'Call to action', value: props.result.melhoria.callToAction },
    {
        label: 'Proposta de valor reforçada',
        value: props.result.melhoria.propostaDeValorReforcada,
    },
    {
        label: 'Exemplo resumido de reformulação',
        value: props.result.melhoria.exemploResumidoDeReformulacao,
    },
    { label: 'URL analisada', value: props.result.melhoria.url },
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