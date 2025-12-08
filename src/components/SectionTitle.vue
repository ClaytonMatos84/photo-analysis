<template>
    <div class="section-title">
        <Card>
            <template #title>
                <span class="section-title-text">
                    {{ title }}
                </span>
            </template>
            <template #content>
                <div v-if="description" class="section-title-desc">
                    {{ description }}
                </div>
            </template>
        </Card>
    </div>
</template>

<script lang="ts" setup>
import Card from 'primevue/card';
defineProps<{ title: string; description?: string }>();
</script>

<style scoped>
.section-title {
    margin-bottom: 1.5rem;
}

.section-title-text {
    color: var(--primary-color, #1976d2);
    font-size: 1.5rem;
    font-weight: bold;
    letter-spacing: 1px;
    display: block;
    text-align: left;
}

.section-title-desc {
    font-size: 1.1rem;
    color: #333;
    margin-top: 0.5rem;
    margin-bottom: 1.5rem;
    background: var(--background-color, #f4f6fa);
    border-radius: 8px;
    padding: 1rem;
}
</style>
