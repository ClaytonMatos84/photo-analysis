<template>
    <div class="dashboard-card">
        <SectionTitle :title="'Descrição da Cena'" :description="result.descricao_cena" />

        <PhotoAnalysisObjects :objects="result.objetos_identificados" />
        <PhotoAnalysisPeople :people="result.pessoas" />
        <PhotoAnalysisLocation :location="result.local_ambiente" />
        <PhotoAnalysisStyle :photoStyle="result.estilo_foto" />
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
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    padding: 2rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
}
</style>
