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
    border-radius: 16px;
    font-size: 1.1rem;
    padding: 1.5rem 2rem;
    box-shadow: 0 2px 12px rgba(25, 118, 210, 0.08);
    background: linear-gradient(90deg, #e3eaf3 0%, #f4f6fa 100%);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.sentiment-title {
    font-size: 1.2rem;
    font-weight: bold;
    color: var(--primary-color, #1976d2);
    margin-bottom: 0.5rem;
    display: block;
    margin-left: 1.0rem;
}

.sentiment-text {
    font-size: 1.1rem;
    color: #333;
    margin-left: 1.0rem;
}
</style>
