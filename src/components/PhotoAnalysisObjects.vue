<template>
    <Card>
        <template #title>
            <span class="section-title-text">Objetos Identificados</span>
        </template>
        <template #content>
            <div class="objects-card-content">
                <ul class="objects-list">
                    <li v-for="obj in objects" :key="obj" class="objects-tag">
                        <i class="pi pi-tag"></i> {{ obj }}
                    </li>
                </ul>
            </div>
        </template>
    </Card>
</template>

<script lang="ts" setup>
import type { PhotoAnalysisResult } from '@/types/PhotoAnalysisResult';
import Card from 'primevue/card';
defineProps<{ objects: PhotoAnalysisResult['objetos_identificados'] }>();
</script>

<style scoped>
.section-title-text {
    color: #0f172a;
    font-size: 1.25rem;
    font-weight: 700;
    letter-spacing: -0.2px;
    display: block;
    text-align: left;
}

.objects-card-content {
    background: #f5f7fb;
    border-radius: 12px;
    padding: 1rem;
    margin-bottom: 1rem;
    border: 1px solid #e5e7eb;
}

.objects-list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.objects-tag {
    background: linear-gradient(135deg, #4f8df8 0%, #357ae8 100%);
    color: #fff;
    border-radius: 999px;
    padding: 0.45rem 1.1rem;
    font-size: 0.95rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    box-shadow: 0 6px 18px rgba(66, 135, 245, 0.22);
}

:deep(.p-card) {
    background: transparent;
    border: none;
    box-shadow: none;
}
</style>
