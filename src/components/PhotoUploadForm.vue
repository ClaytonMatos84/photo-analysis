<template>
    <div class="upload-form">
        <FileUpload ref="fileUploadRef" name="file" :accept="accept" :showUploadButton="true" :showCancelButton="true"
            :multiple="false" @select="onSelect($event)" @uploader="onUpload($event)" chooseLabel="Selecionar"
            uploadLabel="Enviar" :disabled="isLoading" :auto="false" :customUpload="true" />
        <div v-if="isLoading" class="upload-loading">
            <ProgressSpinner strokeWidth="4" />
            <span class="upload-loading-text">Analisando imagem...</span>
        </div>
        <Message v-if="errorMessage" severity="error" class="upload-error" :closable="false">
            <span class="upload-error-content">
                <i class="pi pi-times-circle upload-error-icon"></i>
                <span>
                    {{ errorMessage }}<br>
                    <span class="upload-error-retry">Por favor, tente novamente em alguns segundos.</span>
                </span>
            </span>
        </Message>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import FileUpload from 'primevue/fileupload';
import ProgressSpinner from 'primevue/progressspinner';
import Message from 'primevue/message';
import PhotoAnalysisService from '@/services/PhotoAnalysisService';
import type { PhotoAnalysisResult } from '@/types/PhotoAnalysisResult';

const emit = defineEmits<{ (e: 'analysis', result: PhotoAnalysisResult): void }>();
const accept = 'image/png, image/jpeg, image/jpg';
const isLoading = ref(false);
const errorMessage = ref('');
interface FileUploadRef {
    files?: File[];
    uploadedFiles?: File[];
}

const fileUploadRef = ref<FileUploadRef | null>(null);

function onSelect(event: { files: File | File[] }) {
    const fu = fileUploadRef.value;
    const file = Array.isArray(event.files) ? event.files[0] : event.files || null;
    if (fu) {
        fu.files = file ? [file] : [];
    }
}

async function onUpload(event: { files: File | File[] }) {
    const file = Array.isArray(event.files) ? event.files[0] : event.files || null;
    if (!file) return;
    isLoading.value = true;
    errorMessage.value = '';
    try {
        const result = await PhotoAnalysisService.sendPhotoBinary(file) as PhotoAnalysisResult;
        emit('analysis', result);

        const fu = fileUploadRef.value as FileUploadRef | null;
        if (fu) {
            const filesArr = fu.files || [];
            const uploadedArr = fu.uploadedFiles || [];
            // Usar a mesma referência do File se possível
            const matchIndex = filesArr.findIndex((f: File) => f === file || (f?.name === file?.name && f?.size === file?.size));
            const matchedFile = matchIndex !== -1 ? filesArr[matchIndex] : file;
            if (matchedFile) {
                fu.uploadedFiles = [...uploadedArr, matchedFile];
            }
            if (matchIndex !== -1) {
                fu.files = [...filesArr.slice(0, matchIndex), ...filesArr.slice(matchIndex + 1)];
            }
        }
    } catch (error) {
        errorMessage.value = 'Ocorreu um erro ao enviar a imagem.';
        setTimeout(() => {
            errorMessage.value = '';
        }, 4000);
        console.error('Erro ao enviar imagem:', error);
    } finally {
        isLoading.value = false;
    }
}
</script>

<style scoped>
.upload-form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    align-items: center;
    background-color: #f0f0f0;
    margin-bottom: 10px;
    padding: 1rem 0;
    position: relative;
}

.upload-loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 10;
    background: rgba(255, 255, 255, 0.85);
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 2px 8px rgba(25, 118, 210, 0.08);
}

.upload-loading-text {
    margin-top: 1rem;
    color: var(--primary-color, #1976d2);
    font-weight: 500;
    font-size: 1.1rem;
}

.upload-error {
    width: 100%;
    margin-top: 1rem;
    text-align: left;
    font-size: 1.05rem;
    padding-left: 1.5rem;
}

.upload-error-content {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
}

.upload-error-icon {
    color: #d32f2f;
    font-size: 2rem;
    margin-top: 0.2rem;
}

.upload-error-retry {
    display: block;
    margin-top: 0.5rem;
    color: #d32f2f;
    font-size: 0.95rem;
}
</style>
