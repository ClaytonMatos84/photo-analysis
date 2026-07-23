<template>
    <section class="steps-section" :class="{ 'steps-section-padded': padded }" :style="{ '--step-card-accent': accentColor }">
        <h2 v-if="title" class="steps-section-title">{{ title }}</h2>
        <div class="steps-section-grid">
            <template v-for="(step, index) in steps" :key="step.number">
                <div v-animateonscroll="{ enterClass: 'animate-slide-bottom' }">
                    <StepCard
                        :icon="step.icon"
                        :number="step.number"
                        :title="step.title"
                        :description="step.description"
                    />
                </div>

                <div class="steps-section-arrow" v-if="index < steps.length - 1 && isDesktop">→</div>
            </template>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import StepCard from '@/components/utils/StepCard.vue'

export interface StepsSectionStep {
    number: number | string
    title: string
    description: string
    icon?: string
}

withDefaults(
    defineProps<{
        steps: StepsSectionStep[]
        title?: string
        accentColor?: string
        padded?: boolean
    }>(),
    {
        title: 'Como Funciona',
        accentColor: '#357ae8',
        padded: true,
    },
)

const isDesktop = ref(window.innerWidth >= 1024)

function onResize() {
    isDesktop.value = window.innerWidth >= 1024
}

onMounted(() => {
    window.addEventListener('resize', onResize)
})

onUnmounted(() => {
    window.removeEventListener('resize', onResize)
})
</script>

<style scoped>
.steps-section {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.steps-section-padded {
    padding: 2rem 1rem;
    max-width: 1280px;
    margin: 0 auto;
}

@media (min-width: 768px) {
    .steps-section-padded {
        padding: 2.5rem 1.5rem;
    }
}

.steps-section-title {
    font-weight: 700;
    color: #1f2937;
    text-align: center;
    margin: 0;
}

.steps-section-grid {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    width: 100%;
}

.steps-section-arrow {
    display: none;
    font-size: 1.5rem;
    color: var(--step-card-accent, #357ae8);
    font-weight: 700;
    align-self: center;
}

@media (min-width: 1024px) {
    .steps-section-grid {
        flex-direction: row;
        justify-content: center;
    }

    .steps-section-arrow {
        display: block;
    }
}

/* Animation */
.animate-slide-bottom {
    animation: slideBottom 0.6s ease-out both;
}

@keyframes slideBottom {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@media (prefers-reduced-motion: reduce) {
    .animate-slide-bottom {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
    }
}
</style>
