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
    color: var(--primary-color, #1976d2);
    font-size: 1.2rem;
    font-weight: bold;
    letter-spacing: 1px;
    display: block;
    text-align: left;
}

.objects-card-content {
    background: #e3eaf3;
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 1rem;
}

.objects-list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.objects-tag {
    background: var(--accent-color, #64b5f6);
    color: #fff;
    border-radius: 8px;
    padding: 0.4rem 1rem;
    font-size: 0.95rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}
</style>
