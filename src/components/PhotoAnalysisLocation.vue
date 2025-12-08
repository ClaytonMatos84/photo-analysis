<template>
    <Card>
        <template #title>
            <span class="section-title-text">Local/Ambiente</span>
        </template>
        <template #content>
            <div class="location-card-content">
                <p>{{ location }}</p>
            </div>
        </template>
    </Card>
</template>

<script lang="ts" setup>
import Card from 'primevue/card';
defineProps<{ location: string }>();
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

.location-card-content {
    background: #e3eaf3;
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 1rem;
}
</style>
