<template>
    <section class="home-hero" v-animateonscroll="{ enterClass: 'animate-fade-slide-top' }">
        <div class="home-hero-inner">
            <h1 class="home-hero-title">Análise de Mídias</h1>
            <p class="home-hero-subtitle">
                Utilize o poder da inteligência artificial para analisar fotos, anúncios e vídeos do YouTube
                com insights detalhados e automáticos.
            </p>
            <Button
                label="Começar Agora"
                icon="pi pi-arrow-right"
                iconPos="right"
                class="home-hero-cta"
                @click="router.push('/photo-analysis')"
                size="large"
            />
        </div>
    </section>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import Button from 'primevue/button'

const router = useRouter()
</script>

<style scoped>
.home-hero {
    background: linear-gradient(135deg, #357ae8 0%, #1e4bb8 50%, #0f2d7a 100%);
    color: #fff;
    text-align: center;
    padding: 3rem 1rem;
}

.home-hero-inner {
    max-width: 800px;
    margin: 0 auto;
}

.home-hero-title {
    font-size: 1.8rem;
    font-weight: 800;
    margin: 0 0 1rem;
    letter-spacing: -0.5px;
    line-height: 1.2;
}

.home-hero-subtitle {
    font-size: 1rem;
    opacity: 0.9;
    margin: 0 0 1.5rem;
    line-height: 1.5;
}

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

@media (min-width: 768px) {
    .home-hero {
        padding: 3.5rem 1.5rem;
    }
    .home-hero-title {
        font-size: 2.4rem;
    }
    .home-hero-subtitle {
        font-size: 1.1rem;
    }
}

@media (min-width: 1024px) {
    .home-hero {
        padding: 4rem 3rem;
    }
    .home-hero-title {
        font-size: 3rem;
    }
    .home-hero-subtitle {
        font-size: 1.15rem;
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
    }
    :deep(.home-hero-cta.p-button) {
        width: auto;
    }
}

/* Animation classes */
.animate-fade-slide-top {
    animation: fadeSlideTop 0.7s ease-out both;
}

@keyframes fadeSlideTop {
    from {
        opacity: 0;
        transform: translateY(-30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
