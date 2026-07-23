<template>
    <div class="step-card">
        <Avatar :icon="icon || 'pi pi-circle'" size="xlarge" class="step-card-avatar" />
        <div class="step-card-number">{{ number }}</div>
        <h3 class="step-card-title">{{ title }}</h3>
        <p class="step-card-desc">{{ description }}</p>
    </div>
</template>

<script setup lang="ts">
import Avatar from 'primevue/avatar'

withDefaults(
    defineProps<{
        icon?: string
        number: number | string
        title: string
        description: string
    }>(),
    {
        icon: 'pi pi-circle',
    },
)
</script>

<style scoped>
.step-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    max-width: 280px;
}

.step-card-avatar {
    background: linear-gradient(135deg, var(--step-card-accent, #357ae8), #1e4bb8) !important;
    color: #fff !important;
    margin-bottom: 0.5rem;
}

.step-card-avatar :deep(.p-avatar-icon) {
    color: #fff;
    font-size: 1.5rem;
}

.step-card-number {
    background: var(--step-card-accent, #357ae8);
    color: #fff;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 0.85rem;
    margin-bottom: 0.5rem;
}

.step-card-title {
    font-size: 1.05rem;
    font-weight: 600;
    color: #1f2937;
    margin: 0 0 0.3rem;
}

.step-card-desc {
    font-size: 0.9rem;
    color: #6b7280;
    margin: 0;
    line-height: 1.4;
}
</style>
