<template>
    <MainLayout>
        <template #default>
            <main class="upload-main">
                <header class="upload-header prime-header">
                    <span class="prime-header-title">
                        <i class="pi pi-upload"></i> Enviar imagem
                    </span>
                    <p class="prime-header-desc">
                        Envie uma imagem nos formatos <strong>PNG, JPG ou JPEG</strong> para análise.
                    </p>

                    <PhotoUploadForm @analysis="handleAnalysis" />
                </header>
                <PhotoAnalysisDashboard v-if="analysisResult" :result="analysisResult" />
            </main>
        </template>
    </MainLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MainLayout from '@/components/MainLayout.vue';
import PhotoUploadForm from '@/components/PhotoUploadForm.vue';
import PhotoAnalysisDashboard from '@/components/PhotoAnalysisDashboard.vue';
import type { PhotoAnalysisResult } from '@/types/PhotoAnalysisResult';

const analysisResult = ref<PhotoAnalysisResult | null>(null);

function handleAnalysis(result: PhotoAnalysisResult) {
    analysisResult.value = result;
}
</script>

<style scoped>
.upload-main {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.prime-header {
    width: 100%;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(25, 118, 210, 0.08);
    padding: 1.5rem 2rem;
    margin-bottom: 2rem;
    text-align: center;
}

.prime-header-title {
    color: var(--primary-color, #1976d2);
    font-size: 1.3rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    justify-content: center;
    margin-bottom: 0.5rem;
}

.prime-header-desc {
    font-size: 1.05rem;
    color: #333;
    background: var(--background-color, #f4f6fa);
    border-radius: 8px;
    padding: 1rem;
    margin: 0 auto;
    margin-bottom: 1.5rem;
    display: inline-block;
}
</style>
