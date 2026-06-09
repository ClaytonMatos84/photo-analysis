<template>
    <div class="sentiment-card">
        <Message severity="info" icon="pi pi-info-circle" class="sentiment-message">
            <span class="sentiment-title">Sentimento Transmitido</span>
            <span class="sentiment-text">{{ sentiment }}</span>
        </Message>
    </div>
</template>

<script lang="ts" setup>
import Message from 'primevue/message';
defineProps<{ sentiment: string }>();
</script>

<style scoped>
.sentiment-card {
    margin-bottom: 1.5rem;
    display: flex;
    justify-content: center;
}

.sentiment-message {
    width: 100%;
    border-radius: 12px;
    font-size: 1.05rem;
    padding: 1.25rem 1.5rem;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
    background: #e9f2ff;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    border: 1px solid #cbd5e1;
    color: #0f172a;
}

:deep(.p-message) {
    background: transparent;
    border: none;
    padding: 0;
    width: 100%;
}

.sentiment-title {
    font-size: 1.15rem;
    font-weight: 700;
    color: #1d4ed8;
    margin-bottom: 0.35rem;
    display: block;
    margin-left: 0.5rem;
}

.sentiment-text {
    font-size: 1.02rem;
    color: #0f172a;
    margin-left: 0.5rem;
}
</style>
