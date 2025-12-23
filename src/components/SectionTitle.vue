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

:deep(.p-card) {
    background: transparent;
    border: none;
    box-shadow: none;
}

.section-title-text {
    color: #0f172a;
    font-size: 1.6rem;
    font-weight: 700;
    letter-spacing: -0.2px;
    display: block;
    text-align: left;
}

.section-title-desc {
    font-size: 1.05rem;
    color: #374151;
    margin-top: 0.5rem;
    margin-bottom: 1.5rem;
    background: #f5f7fb;
    border-radius: 12px;
    padding: 1rem 1.25rem;
    border: 1px solid #e5e7eb;
}
</style>
