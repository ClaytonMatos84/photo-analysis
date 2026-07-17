<template>
    <section class="home-carousel" v-animateonscroll="{ enterClass: 'animate-fade-in' }">
        <h2 class="home-section-title">Análises Recentes</h2>
        <div v-if="carouselLoading" class="home-carousel-loading">
            <ProgressSpinner style="width: 40px; height: 40px" />
        </div>
        <div v-else-if="recentAnalyses.length === 0" class="home-carousel-empty">
            <i class="pi pi-inbox"></i>
            <p>Nenhuma análise realizada ainda</p>
        </div>
        <Carousel
            v-else
            :value="recentAnalyses"
            :numVisible="numVisible"
            :numScroll="1"
            :responsiveOptions="responsiveOptions"
            circular
            class="home-carousel-widget"
        >
            <template #item="slotProps">
                <Card class="carousel-card">
                    <template #title>
                        <Tag
                            :value="slotProps.data.type"
                            :severity="tagSeverity(slotProps.data.type)"
                        />
                    </template>
                    <template #content>
                        <p class="carousel-title">{{ slotProps.data.title }}</p>
                    </template>
                    <template #footer>
                        <Button
                            label="Ver detalhes"
                            icon="pi pi-external-link"
                            iconPos="right"
                            size="small"
                            @click="router.push('/results')"
                            outlined
                        />
                    </template>
                </Card>
            </template>
        </Carousel>
    </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Card from 'primevue/card'
import Tag from 'primevue/tag'
import Button from 'primevue/button'
import Carousel from 'primevue/carousel'
import ProgressSpinner from 'primevue/progressspinner'
import { useRecentAnalyses } from '@/composables/useRecentAnalyses'

const router = useRouter()
const { analyses: recentAnalyses, loading: carouselLoading } = useRecentAnalyses()

const windowWidth = ref(window.innerWidth)

onMounted(() => {
    window.addEventListener('resize', () => {
        windowWidth.value = window.innerWidth
    })
})

const numVisible = computed(() => {
    if (windowWidth.value >= 1024) return 3
    if (windowWidth.value >= 768) return 2
    return 1
})

const responsiveOptions = [
    { breakpoint: '1024px', numVisible: 3, numScroll: 1 },
    { breakpoint: '768px', numVisible: 2, numScroll: 1 },
    { breakpoint: '560px', numVisible: 1, numScroll: 1 },
]

function tagSeverity(type: string) {
    if (type === 'foto') return 'info'
    if (type === 'anúncio') return 'success'
    if (type === 'youtube') return 'danger'
    return undefined
}
</script>

<style scoped>
.home-carousel {
    padding: 2rem 1rem;
    background: #f8fafc;
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

.home-carousel-loading {
    display: flex;
    justify-content: center;
    padding: 2rem;
}

.home-carousel-empty {
    text-align: center;
    padding: 2rem;
    color: #9ca3af;
}

.home-carousel-empty .pi {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    display: block;
}

.home-carousel-empty p {
    margin: 0;
    font-size: 1rem;
}

.carousel-card {
    margin: 0 0.5rem;
}

:deep(.carousel-card .p-card-title) {
    display: flex;
    align-items: center;
}

.carousel-title {
    margin: 0;
    color: #374151;
    font-size: 0.9rem;
    display: -webkit-box;
    line-clamp: 2;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

:deep(.carousel-card .p-card-footer) {
    display: flex;
    justify-content: flex-end;
}

@media (min-width: 768px) {
    .home-carousel {
        padding: 2.5rem 1.5rem;
    }
}

/* Animation */
.animate-fade-in {
    animation: fadeIn 0.6s ease-out both;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
</style>
