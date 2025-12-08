<template>
    <div class="dashboard-card">
        <h2 class="dashboard-title">Descrição da Cena</h2>
        <p class="dashboard-desc">{{ result.descricao_cena }}</p>

        <PhotoAnalysisObjects :objects="result.objetos_identificados" />
        <PhotoAnalysisPeople :people="result.pessoas" />

        <div class="dashboard-section">
            <h3>Local/Ambiente</h3>
            <p>{{ result.local_ambiente }}</p>
        </div>

        <div class="dashboard-section">
            <h3>Estilo da Foto</h3>
            <p>{{ result.estilo_foto }}</p>
        </div>

        <div class="dashboard-section">
            <h3>Sentimento Transmitido</h3>
            <p>{{ result.sentimento_transmitido }}</p>
        </div>

        <div class="dashboard-section">
            <h3>Observações Adicionais</h3>
            <p>{{ result.observacoes_adicionais }}</p>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { PhotoAnalysisResult } from '@/types/PhotoAnalysisResult';
import PhotoAnalysisObjects from './PhotoAnalysisObjects.vue';
import PhotoAnalysisPeople from './PhotoAnalysisPeople.vue';
defineProps<{ result: PhotoAnalysisResult }>();
</script>

<style scoped>
.dashboard-card {
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    padding: 2rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
}

.dashboard-title {
    color: var(--primary-color, #1976d2);
    margin-bottom: 1rem;
}

.dashboard-desc {
    font-size: 1.1rem;
    margin-bottom: 1.5rem;
}

.dashboard-section {
    margin-bottom: 1.2rem;
}
</style>
