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

                    <PhotoUploadForm @file="handleFile" @analysis="handleAnalysis" />
                </header>
                <PhotoDisplay v-if="imageFile" :imageFile="imageFile" />
                <PhotoAnalysisDashboard v-if="analysisResult" :result="analysisResult" :imageFile="imageFile" />
            </main>
        </template>
    </MainLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MainLayout from '@/components/MainLayout.vue';
import PhotoUploadForm from '@/components/PhotoUploadForm.vue';
import PhotoAnalysisDashboard from '@/components/PhotoAnalysisDashboard.vue';
import PhotoDisplay from '@/components/PhotoDisplay.vue';
import type { PhotoAnalysisResult } from '@/types/PhotoAnalysisResult';

const analysisResult = ref<PhotoAnalysisResult | null>(null);
const imageFile = ref<File | undefined>(undefined);

function handleFile(file: File) {
    imageFile.value = file;
}

function handleAnalysis(result: PhotoAnalysisResult) {
    analysisResult.value = result;
}
</script>

<style scoped>
.upload-main {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    color: #0f172a;
}

.prime-header {
    width: 100%;
    background: #fff;
    border-radius: 14px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    padding: 2rem 2.5rem;
    margin-bottom: 1.5rem;
    text-align: center;
    border: 1px solid #e5e7eb;
}

.prime-header-title {
    color: #1f2937;
    font-size: 1.6rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 0.6rem;
    justify-content: center;
    margin-bottom: 0.75rem;
    letter-spacing: -0.3px;
}

.prime-header-title .pi {
    color: #4287f5;
    font-size: 1.4rem;
}

.prime-header-desc {
    font-size: 1.05rem;
    color: #374151;
    background: #f5f7fb;
    border-radius: 12px;
    padding: 1rem 1.25rem;
    margin: 0 auto 1.25rem auto;
    display: inline-block;
    border: 1px solid #e5e7eb;
}
</style>
