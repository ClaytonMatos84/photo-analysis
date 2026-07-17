<template>
    <section class="home-features">
        <h2 class="home-section-title">Funcionalidades</h2>
        <div class="home-features-grid">
            <Card class="feature-card" v-animateonscroll="{ enterClass: 'animate-slide-left' }">
                <template #header>
                    <div class="feature-icon-wrap">
                        <i class="pi pi-image"></i>
                    </div>
                </template>
                <template #title>
                    Análise de Foto
                    <Tag value="IA" severity="info" class="feature-tag" />
                </template>
                <template #content>
                    <p>Envie uma foto e receba análise detalhada com identificação de objetos, pessoas, sentimentos e estilo.</p>
                </template>
                <template #footer>
                    <Button label="Acessar" icon="pi pi-arrow-right" iconPos="right" @click="router.push('/photo-analysis')" outlined />
                </template>
            </Card>

            <Card class="feature-card" v-animateonscroll="{ enterClass: 'animate-slide-bottom' }">
                <template #header>
                    <div class="feature-icon-wrap">
                        <i class="pi pi-megaphone"></i>
                    </div>
                </template>
                <template #title>
                    Análise de Anúncio
                    <Tag value="Popular" severity="success" class="feature-tag" />
                </template>
                <template #content>
                    <p>Informe a URL de um anúncio e obtenha comparativo com concorrentes, estratégia e melhorias.</p>
                </template>
                <template #footer>
                    <Button label="Acessar" icon="pi pi-arrow-right" iconPos="right" @click="router.push('/ad-analysis')" outlined />
                </template>
            </Card>

            <Card class="feature-card" v-animateonscroll="{ enterClass: 'animate-slide-right' }">
                <template #header>
                    <div class="feature-icon-wrap">
                        <i class="pi pi-youtube"></i>
                    </div>
                </template>
                <template #title>
                    Análise de Vídeo
                    <Tag value="Novo" severity="warn" class="feature-tag" />
                </template>
                <template #content>
                    <p>Cole a URL de um vídeo YouTube e veja análise completa com métricas, categoria e top vídeos.</p>
                </template>
                <template #footer>
                    <Button label="Acessar" icon="pi pi-arrow-right" iconPos="right" @click="router.push('/youtube-analysis')" outlined />
                </template>
            </Card>
        </div>
    </section>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import Card from 'primevue/card'
import Tag from 'primevue/tag'
import Button from 'primevue/button'

const router = useRouter()
</script>

<style scoped>
.home-features {
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

.home-features-grid {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.feature-icon-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    background: linear-gradient(135deg, #357ae8 0%, #1e4bb8 100%);
    font-size: 2rem;
    color: #fff;
    border-radius: 12px 12px 0 0;
}

:deep(.feature-card .p-card-title) {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
}

.feature-tag {
    font-size: 0.7rem;
}

:deep(.feature-card .p-card-content p) {
    margin: 0;
    color: #4b5563;
    line-height: 1.5;
}

:deep(.feature-card .p-card-footer) {
    display: flex;
    justify-content: flex-end;
}

@media (min-width: 768px) {
    .home-features {
        padding: 2.5rem 1.5rem;
    }
    .home-features-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
}

@media (min-width: 1024px) {
    .home-features-grid {
        grid-template-columns: 1fr 1fr 1fr;
    }
}

/* Animations */
.animate-slide-left {
    animation: slideLeft 0.6s ease-out both;
}
.animate-slide-right {
    animation: slideRight 0.6s ease-out both;
}
.animate-slide-bottom {
    animation: slideBottom 0.6s ease-out both;
}

@keyframes slideLeft {
    from {
        opacity: 0;
        transform: translateX(-40px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}
@keyframes slideRight {
    from {
        opacity: 0;
        transform: translateX(40px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
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
</style>
