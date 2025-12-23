<template>
    <div class="photo-display">
        <h3 class="photo-title">Foto Analisada</h3>
        <div class="photo-container">
            <img :src="imageUrl" alt="Foto analisada" class="photo-image" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';

const props = defineProps<{ imageFile: File }>();

const imageUrl = ref<string>('');

// Converter o arquivo para base64
watch(() => props.imageFile, (file) => {
    if (!file) {
        imageUrl.value = '';
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        imageUrl.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);
}, { immediate: true });
</script>

<style scoped>
.photo-display {
    background: #fff;
    border-radius: 14px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    padding: 1.5rem;
    margin-bottom: 2rem;
    border: 1px solid #e5e7eb;
    color: #0f172a;
}

.photo-title {
    font-size: 1.35rem;
    font-weight: 700;
    color: #0f172a;
    margin: 0 0 1rem 0;
    text-align: center;
}

.photo-container {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
    overflow: hidden;
    background: #f8fafc;
    border: 1px solid #e5e7eb;
}

.photo-image {
    max-width: 100%;
    max-height: 500px;
    width: auto;
    height: auto;
    display: block;
    object-fit: contain;
}

@media (max-width: 768px) {
    .photo-image {
        max-height: 350px;
    }
}
</style>
