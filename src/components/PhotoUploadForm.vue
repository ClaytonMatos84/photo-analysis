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

const emit = defineEmits<{ (e: 'analysis', result: PhotoAnalysisResult): void; (e: 'file', file: File): void }>();
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
    emit('file', file as File);
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

        // Limpar o arquivo após o sucesso do envio
        const fu = fileUploadRef.value as FileUploadRef | null;
        if (fu) {
            fu.files = [];
            fu.uploadedFiles = [];
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
    background: #fff;
    margin-bottom: 10px;
    padding: 1.25rem 1rem;
    position: relative;
    border-radius: 14px;
    border: 1px solid #e5e7eb;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
    color: #0f172a;
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
    background: #fff;
    border-radius: 14px;
    padding: 2rem;
    box-shadow: 0 10px 28px rgba(0, 0, 0, 0.12);
    border: 1px solid #e5e7eb;
}

.upload-loading-text {
    margin-top: 1rem;
    color: #0f172a;
    font-weight: 600;
    font-size: 1.05rem;
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
    color: #ef4444;
    font-size: 2rem;
    margin-top: 0.2rem;
}

.upload-error-retry {
    display: block;
    margin-top: 0.5rem;
    color: #fca5a5;
    font-size: 0.95rem;
}

:deep(.p-fileupload) {
    width: 100%;
    background: transparent;
    border: none;
    box-shadow: none;
    color: #0f172a;
}

:deep(.p-fileupload-buttonbar) {
    background: #f8fafc;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
}

:deep(.p-fileupload-content) {
    background: #fff;
    border: 1px dashed #cbd5e1;
    border-radius: 12px;
    color: #475569;
}

:deep(.p-button) {
    background: linear-gradient(135deg, #4287f5 0%, #357ae8 100%);
    border: none;
    border-radius: 0.75rem;
    padding: 0.65rem 1.25rem;
    font-weight: 600;
    box-shadow: 0 6px 18px rgba(66, 135, 245, 0.25);
}

:deep(.p-button:hover:not(.p-disabled)) {
    background: linear-gradient(135deg, #4f8df8 0%, #3b82f6 100%);
    box-shadow: 0 8px 22px rgba(66, 135, 245, 0.3);
}

:deep(.p-button:focus-visible) {
    outline: 2px solid #93c5fd;
    outline-offset: 2px;
}

:deep(.p-button.p-button-outlined) {
    background: transparent;
    border: 1px solid #4287f5;
    color: #1d4ed8;
    box-shadow: none;
}
</style>
