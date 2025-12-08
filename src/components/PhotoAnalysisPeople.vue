<template>
    <div class="people-card">
        <h3>Pessoas</h3>
        <p><strong>Quantidade:</strong> {{ people.quantidade }}</p>
        <p>{{ people.descricao }}</p>
    </div>
</template>

<script lang="ts" setup>
import type { PhotoAnalysisResult } from '@/types/PhotoAnalysisResult';
defineProps<{ people: PhotoAnalysisResult['pessoas'] }>();
</script>

<style scoped>
.people-card {
    background: #e3eaf3;
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 1rem;
}
</style>
