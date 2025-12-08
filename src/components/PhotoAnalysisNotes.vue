<template>
    <Card class="notes-card">
        <template #title>
            <span class="notes-title">
                <i class="pi pi-info-circle"></i> Observações Adicionais
            </span>
        </template>
        <template #content>
            <div class="notes-content">
                <p>{{ notes }}</p>
            </div>
        </template>
    </Card>
</template>

<script lang="ts" setup>
import Card from 'primevue/card';
defineProps<{ notes: string }>();
</script>

<style scoped>
.notes-card {
    margin-bottom: 1.2rem;
    background: #f9fafc;
    border-left: 6px solid var(--primary-color, #1976d2);
}

.notes-title {
    color: var(--primary-color, #1976d2);
    font-size: 1.15rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.notes-content {
    font-size: 1rem;
    color: #444;
    background: #e3eaf3;
    border-radius: 8px;
    padding: 1rem;
}
</style>
