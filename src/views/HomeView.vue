<script setup lang="ts">
import { ref } from 'vue';
import FileUpload from 'primevue/fileupload';
import MainLayout from '../components/MainLayout.vue';

const selectedFile = ref<File | null>(null);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function uploadImage(event: any) {
    console.log('Upload event:', event);

    const file = event.files?.[0] || event.target?.files?.[0] || null;
    selectedFile.value = file;
    if (!selectedFile.value) return;
    // Exemplo de serviço de upload
    const formData = new FormData();
    formData.append('file', selectedFile.value);
    // Substitua a URL abaixo pelo endpoint real do seu backend
    await fetch('/api/upload', {
        method: 'POST',
        body: formData,
    });
    // Aqui você pode adicionar feedback de sucesso/erro
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
                    <FileUpload name="file" url="/api/upload" accept="image/png, image/jpeg, image/jpg" :auto="false"
                        :showUploadButton="true" :showCancelButton="true" :multiple="false"
                        @upload="uploadImage($event)" chooseLabel="Selecionar" uploadLabel="Enviar"
                        cancelLabel="Cancelar" />
                </div>
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
