<template>
    <section
        class="analysis-empty-state"
        :style="{ '--empty-state-accent': accentColor || '#357ae8' }"
        v-animateonscroll="{ enterClass: 'animate-slide-bottom' }"
    >
        <StepsSection :steps="steps" title="Passo a passo" :accent-color="accentColor" :padded="false" />

            <div class="empty-state-benefits-header">
                <i class="pi pi-check-circle empty-state-benefits-header-icon"></i>
                <h2 class="empty-state-benefits-header-title">Benefícios</h2>
            </div>
            <div class="empty-state-benefits">
                <Card v-for="benefit in benefits" :key="benefit.title" class="empty-state-benefit-card">
                    <template #title>
                        <span class="empty-state-benefit-title">
                            <i :class="benefit.icon" class="empty-state-benefit-icon"></i>
                            {{ benefit.title }}
                        </span>
                    </template>
                    <template #content>
                        <p class="empty-state-benefit-desc">{{ benefit.description }}</p>
                    </template>
                </Card>
            </div>
    </section>
</template>

<script setup lang="ts">
import Card from 'primevue/card'
import StepsSection from '@/components/utils/StepsSection.vue'

export interface AnalysisEmptyStateStep {
    number: number
    title: string
    description: string
    icon?: string
}

export interface AnalysisEmptyStateBenefit {
    icon: string
    title: string
    description: string
}

withDefaults(
    defineProps<{
        steps: AnalysisEmptyStateStep[]
        benefits: AnalysisEmptyStateBenefit[]
        accentColor?: string
    }>(),
    {
        accentColor: '#357ae8',
    },
)
</script>

<style scoped>
.analysis-empty-state {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 3rem;
}

.empty-state-benefits-header {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.6rem;
}

.empty-state-benefits-header-title {
    font-weight: 700;
    color: #1f2937;
    text-align: center;
    margin: 0;
}

.empty-state-benefits {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.25rem;
    width: 100%;
}

.empty-state-benefit-card {
    height: 100%;
}

.empty-state-benefit-title {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-size: 1.05rem;
    font-weight: 700;
    color: #0f172a;
}

.empty-state-benefit-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 34px;
    height: 34px;
    border-radius: 10px;
    background: color-mix(in srgb, var(--empty-state-accent) 15%, #fff 85%);
    color: var(--empty-state-accent);
    font-size: 1.05rem;
    flex-shrink: 0;
}

.empty-state-benefit-desc {
    font-size: 0.92rem;
    color: #475569;
    line-height: 1.5;
    margin: 0;
}

@media (max-width: 600px) {
    .empty-state-benefits {
        grid-template-columns: 1fr;
    }
}

/* Animation */
.animate-slide-bottom {
    animation: slideBottom 0.6s ease-out both;
}

@keyframes slideBottom {
    from {
        opacity: 0;
        transform: translateY(40px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Content stays fully visible/legible even when animation is skipped */
@media (prefers-reduced-motion: reduce) {
    .animate-slide-bottom {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
    }
}
</style>
