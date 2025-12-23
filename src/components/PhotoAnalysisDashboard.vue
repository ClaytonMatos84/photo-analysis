<template>
    <div class="dashboard-card">
        <SectionTitle :title="'Descrição da Cena'" :description="result.descricao_cena" />

        <PhotoAnalysisObjects :objects="result.objetos_identificados" />

        <div class="dashboard-row">
            <PhotoAnalysisPeople :people="result.pessoas" />
            <PhotoAnalysisLocation :location="result.local_ambiente" />
            <PhotoAnalysisStyle :photoStyle="result.estilo_foto" />
        </div>

        <PhotoAnalysisSentiment :sentiment="result.sentimento_transmitido" />
        <PhotoAnalysisNotes :notes="result.observacoes_adicionais" />
    </div>
</template>

<script lang="ts" setup>
import type { PhotoAnalysisResult } from '@/types/PhotoAnalysisResult';
import PhotoAnalysisObjects from '@/components/PhotoAnalysisObjects.vue';
import PhotoAnalysisPeople from '@/components/PhotoAnalysisPeople.vue';
import SectionTitle from '@/components/SectionTitle.vue';
import PhotoAnalysisLocation from '@/components/PhotoAnalysisLocation.vue';
import PhotoAnalysisStyle from '@/components/PhotoAnalysisStyle.vue';
import PhotoAnalysisSentiment from '@/components/PhotoAnalysisSentiment.vue';
import PhotoAnalysisNotes from '@/components/PhotoAnalysisNotes.vue';

defineProps<{ result: PhotoAnalysisResult }>();
</script>

<style scoped>
.dashboard-card {
    background: #fff;
    border-radius: 14px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    padding: 2rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
    border: 1px solid #e5e7eb;
    color: #0f172a;
}

.dashboard-row {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    margin-bottom: 2rem;
    margin-top: 2rem;
    align-items: stretch;
}

.dashboard-row>* {
    flex: 1 1 0;
    min-width: 0;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    align-items: stretch;
    min-height: 100%;
}

@media (min-width: 900px) {
    .dashboard-row {
        gap: 2rem;
    }

    .dashboard-row>* {
        min-width: 250px;
        max-width: 33%;
        height: 100%;
    }
}

@media (max-width: 900px) {
    .dashboard-row {
        flex-direction: column;
        gap: 1rem;
        margin-top: 1rem;
        margin-bottom: 1rem;
    }

    .dashboard-row>* {
        max-width: 100%;
        min-height: unset;
    }
}
</style>
