<script setup lang="ts">
import { ref } from 'vue';
import FileUpload from 'primevue/fileupload';
import MainLayout from '@/components/MainLayout.vue';
import PhotoAnalysisService from '@/services/PhotoAnalysisService';
import PhotoAnalysisDashboard from '@/components/PhotoAnalysisDashboard.vue';
import type { PhotoAnalysisResult } from '@/types/PhotoAnalysisResult';

const selectedFile = ref<File | null>(null);
const analysisResult = ref<PhotoAnalysisResult | null>(null);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function uploadImage(event: any) {
    console.log('Upload event:', event);

    const file = event.files?.[0] || event.target?.files?.[0] || null;
    selectedFile.value = file;
    if (!selectedFile.value) return;
    try {
        const result = await PhotoAnalysisService.sendPhotoBinary(selectedFile.value) as PhotoAnalysisResult;
        analysisResult.value = result;
        console.log('Resultado da análise:', result);
    } catch (error) {
        console.error('Erro ao enviar imagem:', error);
    }
}
</script>


<template>
    <MainLayout>
        <template #default>
            <main class="upload-main">
                <header class="upload-header">
                    <h2>Upload de Imagem</h2>
                    <p>Envie uma imagem nos formatos PNG, JPG ou JPEG para análise.</p>
                </header>
                <div class="upload-form">
                    <FileUpload name="file" url="http://localhost:5678/webhook/analise-foto"
                        accept="image/png, image/jpeg, image/jpg" :showUploadButton="true" :showCancelButton="true"
                        :multiple="false" @upload="uploadImage($event)" chooseLabel="Selecionar" uploadLabel="Enviar"
                        cancelLabel="Cancelar" />
                </div>
                <PhotoAnalysisDashboard v-if="analysisResult" :result="analysisResult" />
            </main>
        </template>
    </MainLayout>
</template>

<style scoped>
.upload-main {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.upload-header {
    text-align: center;
    margin-bottom: 2rem;
}

.upload-header h1 {
    font-size: 2rem;
    color: #0e4d8b;
    margin-bottom: 0.5rem;
}

.upload-header p {
    color: #555;
    font-size: 1rem;
}

.upload-form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    align-items: center;
    background-color: #f0f0f0;
    margin-bottom: 10px;
}
</style>
