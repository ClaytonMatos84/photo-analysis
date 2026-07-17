<template>
    <section class="home-stats">
        <h2 class="home-section-title">Estatísticas</h2>
        <div v-if="statsLoading" class="home-stats-loading">
            <ProgressSpinner style="width: 40px; height: 40px" />
        </div>
        <div v-else class="home-stats-grid">
            <Card class="stats-card" v-animateonscroll="{ enterClass: 'animate-zoom-in' }">
                <template #title>
                    <i class="pi pi-image stats-icon"></i>
                    Fotos
                </template>
                <template #content>
                    <div class="stats-value">{{ photoCount }}</div>
                    <MeterGroup :value="[{ value: photoCount, color: '#357ae8', label: 'Fotos' }]" :max="sumAnalytics" />
                </template>
            </Card>
            <Card class="stats-card" v-animateonscroll="{ enterClass: 'animate-zoom-in' }">
                <template #title>
                    <i class="pi pi-megaphone stats-icon"></i>
                    Anúncios
                </template>
                <template #content>
                    <div class="stats-value">{{ adCount }}</div>
                    <MeterGroup :value="[{ value: adCount, color: '#10b981', label: 'Anúncios' }]" :max="sumAnalytics" />
                </template>
            </Card>
            <Card class="stats-card" v-animateonscroll="{ enterClass: 'animate-zoom-in' }">
                <template #title>
                    <i class="pi pi-youtube stats-icon"></i>
                    Vídeos
                </template>
                <template #content>
                    <div class="stats-value">{{ youtubeCount }}</div>
                    <MeterGroup :value="[{ value: youtubeCount, color: '#ef4444', label: 'Vídeos' }]" :max="sumAnalytics" />
                </template>
            </Card>
        </div>
    </section>
</template>

<script setup lang="ts">
import Card from 'primevue/card'
import MeterGroup from 'primevue/metergroup'
import ProgressSpinner from 'primevue/progressspinner'
import { useHomeStats } from '@/composables/useHomeStats'

const { photoCount, adCount, youtubeCount, sumAnalytics, loading: statsLoading } = useHomeStats()
</script>

<style scoped>
.home-stats {
    padding: 2rem 1rem;
    max-width: 1280px;
    margin: 0 auto;
}

.home-section-title {
    font-size: 1.4rem;
    font-weight: 700;
    color: #1f2937;
    text-align: center;
    margin: 0 0 1.5rem;
}

.home-stats-loading {
    display: flex;
    justify-content: center;
    padding: 2rem;
}

.home-stats-grid {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.stats-card {
    border-radius: 12px;
}

:deep(.stats-card .p-card-title) {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1rem;
    font-weight: 600;
}

.stats-icon {
    color: #357ae8;
    font-size: 1.2rem;
}

.stats-value {
    font-size: 2rem;
    font-weight: 800;
    color: #1f2937;
    margin-bottom: 0.5rem;
}

@media (min-width: 768px) {
    .home-stats {
        padding: 2.5rem 1.5rem;
    }
}

@media (min-width: 1024px) {
    .home-stats-grid {
        flex-direction: row;
    }
    .stats-card {
        flex: 1;
    }
}

/* Animation */
.animate-zoom-in {
    animation: zoomIn 0.5s ease-out both;
}

@keyframes zoomIn {
    from {
        opacity: 0;
        transform: scale(0.85);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}
</style>
