<template>
    <div class="objects-card">
        <h3>Objetos Identificados</h3>
        <ul class="objects-list">
            <li v-for="obj in objects" :key="obj" class="objects-tag">
                <i class="pi pi-tag"></i> {{ obj }}
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
import type { PhotoAnalysisResult } from '@/types/PhotoAnalysisResult';
defineProps<{ objects: PhotoAnalysisResult['objetos_identificados'] }>();
</script>

<style scoped>
.objects-card {
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
