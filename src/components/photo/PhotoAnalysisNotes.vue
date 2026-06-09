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
    background: #f9fafb;
    border-left: 6px solid #4287f5;
    border-radius: 12px;
    box-shadow: 0 8px 22px rgba(0, 0, 0, 0.08);
    color: #0f172a;
    border: 1px solid #e5e7eb;
}

.notes-title {
    color: #0f172a;
    font-size: 1.15rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.notes-title .pi {
    color: #4287f5;
}

.notes-content {
    font-size: 1rem;
    color: #111827;
    background: #f5f7fb;
    border-radius: 10px;
    padding: 1rem;
    border: 1px solid #e5e7eb;
}

:deep(.p-card) {
    background: transparent;
    border: none;
    box-shadow: none;
}
</style>
