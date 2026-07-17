<template>
    <MainLayout>
        <PageHero
            title="Enviar imagem"
            icon="pi pi-upload"
            description="Envie uma imagem nos formatos PNG, JPG ou JPEG para análise."
        >
            <div v-animateonscroll="{ enterClass: 'animate-zoom-in' }">
                <PhotoUploadForm @file="handleFile" @analysis="handleAnalysis" />
            </div>
        </PageHero>
        <main class="upload-main">
            <PhotoDisplay v-if="imageFile" :imageFile="imageFile" />
            <PhotoAnalysisDashboard
                v-if="analysisResult"
                v-animateonscroll="{ enterClass: 'animate-slide-bottom' }"
                :result="analysisResult"
                :imageFile="imageFile"
            />
        </main>
    </MainLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MainLayout from '@/components/utils/MainLayout.vue'
import PageHero from '@/components/utils/PageHero.vue'
import PhotoUploadForm from '@/components/photo/PhotoUploadForm.vue'
import PhotoAnalysisDashboard from '@/components/photo/PhotoAnalysisDashboard.vue'
import PhotoDisplay from '@/components/photo/PhotoDisplay.vue'
import type { PhotoAnalysisResult } from '@/types/PhotoAnalysisTypes'

const analysisResult = ref<PhotoAnalysisResult | null>(null)
const imageFile = ref<File | undefined>(undefined)

function handleFile(file: File) {
    imageFile.value = file
}

function handleAnalysis(result: PhotoAnalysisResult) {
    analysisResult.value = result
}
</script>

<style scoped>
.upload-main {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    color: #0f172a;
    padding: 1.5rem 1rem 2rem;
    max-width: 1280px;
    margin: 0 auto;
    width: 100%;
}

/* Animations */
.animate-zoom-in {
    animation: zoomIn 0.5s ease-out both;
}

.animate-slide-bottom {
    animation: slideBottom 0.6s ease-out both;
}

@keyframes zoomIn {
    from {
        opacity: 0;
        transform: scale(0.85);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

@keyframes slideBottom {
    from {
        opacity: 0;
        transform: translateY(40px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
