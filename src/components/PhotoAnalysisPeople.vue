<template>
    <Card>
        <template #title>
            <span class="section-title-text">Pessoas</span>
        </template>
        <template #content>
            <div class="people-card-content">
                <p><strong>Quantidade:</strong> {{ people.quantidade }}</p>
                <p>{{ people.descricao }}</p>
            </div>
        </template>
    </Card>
</template>

<script lang="ts" setup>
import Card from 'primevue/card';
import type { PhotoAnalysisResult } from '@/types/PhotoAnalysisResult';
defineProps<{ people: PhotoAnalysisResult['pessoas'] }>();
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

.people-card-content {
    background: #f5f7fb;
    border-radius: 12px;
    padding: 1rem;
    margin-bottom: 1rem;
    border: 1px solid #e5e7eb;
    color: #0f172a;
}

:deep(.p-card) {
    background: transparent;
    border: none;
    box-shadow: none;
}
</style>
