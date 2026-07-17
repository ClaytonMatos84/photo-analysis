<template>
    <section class="home-how">
        <h2 class="home-section-title">Como Funciona</h2>
        <div class="home-how-steps">
            <div class="how-step" v-animateonscroll="{ enterClass: 'animate-slide-bottom' }">
                <Avatar icon="pi pi-upload" size="xlarge" class="how-avatar" />
                <div class="how-step-number">1</div>
                <h3 class="how-step-title">Envie ou Cole</h3>
                <p class="how-step-desc">Faça upload de uma foto, cole a URL de um anúncio ou vídeo YouTube.</p>
            </div>

            <div class="how-arrow" v-if="isDesktop">→</div>

            <div class="how-step" v-animateonscroll="{ enterClass: 'animate-slide-bottom' }">
                <Avatar icon="pi pi-cog" size="xlarge" class="how-avatar" />
                <div class="how-step-number">2</div>
                <h3 class="how-step-title">IA Analisa</h3>
                <p class="how-step-desc">Nossa inteligência artificial processa e extrai insights detalhados da mídia.</p>
            </div>

            <div class="how-arrow" v-if="isDesktop">→</div>

            <div class="how-step" v-animateonscroll="{ enterClass: 'animate-slide-bottom' }">
                <Avatar icon="pi pi-chart-bar" size="xlarge" class="how-avatar" />
                <div class="how-step-number">3</div>
                <h3 class="how-step-title">Resultado</h3>
                <p class="how-step-desc">Visualize o dashboard com métricas, comparações e recomendações.</p>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Avatar from 'primevue/avatar'

const isDesktop = ref(window.innerWidth >= 1024)

onMounted(() => {
    window.addEventListener('resize', () => {
        isDesktop.value = window.innerWidth >= 1024
    })
})
</script>

<style scoped>
.home-how {
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

.home-how-steps {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
}

.how-step {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    max-width: 280px;
}

.how-avatar {
    background: linear-gradient(135deg, #357ae8, #1e4bb8) !important;
    color: #fff !important;
    margin-bottom: 0.5rem;
}

:deep(.how-avatar .p-avatar-icon) {
    color: #fff;
    font-size: 1.5rem;
}

.how-step-number {
    background: #357ae8;
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

.how-step-title {
    font-size: 1.05rem;
    font-weight: 600;
    color: #1f2937;
    margin: 0 0 0.3rem;
}

.how-step-desc {
    font-size: 0.9rem;
    color: #6b7280;
    margin: 0;
    line-height: 1.4;
}

.how-arrow {
    display: none;
    font-size: 1.5rem;
    color: #357ae8;
    font-weight: 700;
    align-self: center;
}

@media (min-width: 768px) {
    .home-how {
        padding: 2.5rem 1.5rem;
    }
}

@media (min-width: 1024px) {
    .home-how-steps {
        flex-direction: row;
        justify-content: center;
    }

    .how-arrow {
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
</style>
