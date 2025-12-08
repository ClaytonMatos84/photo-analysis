<template>
    <Card>
        <template #title>
            <span class="section-title-text">Estilo da Foto</span>
        </template>
        <template #content>
            <div class="style-card-content">
                <p>{{ photoStyle }}</p>
            </div>
        </template>
    </Card>
</template>

<script lang="ts" setup>
import Card from 'primevue/card';
defineProps<{ photoStyle: string }>();
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

.style-card-content {
    background: #e3eaf3;
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 1rem;
}
</style>
