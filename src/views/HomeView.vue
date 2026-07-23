<template>
    <MainLayout>
        <PageHero
            title="Análise de Mídias"
            icon="pi pi-images"
            description="Utilize o poder da inteligência artificial para analisar fotos, anúncios e vídeos do YouTube com insights detalhados e automáticos."
        >
            <Button
                label="Começar Agora"
                icon="pi pi-arrow-right"
                iconPos="right"
                class="home-hero-cta"
                @click="router.push('/photo-analysis')"
                size="large"
            />
        </PageHero>
        <HomeStats />
        <HomeFeatures />
        <StepsSection :steps="homeHowItWorksSteps" />
        <HomeCarousel />
    </MainLayout>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import Button from 'primevue/button'
import MainLayout from '@/components/utils/MainLayout.vue'
import PageHero from '@/components/utils/PageHero.vue'
import HomeStats from '@/components/home/HomeStats.vue'
import HomeFeatures from '@/components/home/HomeFeatures.vue'
import StepsSection from '@/components/utils/StepsSection.vue'
import HomeCarousel from '@/components/home/HomeCarousel.vue'
import { homeHowItWorksSteps } from '@/content/homeHowItWorks'

const router = useRouter()
</script>

<style scoped>
.home-hero-cta {
    width: 100%;
}

:deep(.home-hero-cta.p-button) {
    background: #fff;
    color: #357ae8;
    font-weight: 700;
    border: none;
    padding: 0.85rem 2rem;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    width: 100%;
}

:deep(.home-hero-cta.p-button:hover) {
    background: #f0f4ff;
    box-shadow: 0 10px 28px rgba(0, 0, 0, 0.25);
}

@media (min-width: 1024px) {
    .home-hero-cta {
        width: auto;
    }

    :deep(.home-hero-cta.p-button) {
        width: auto;
    }
}
</style>
