<template>
    <section
        class="page-hero"
        :style="{ '--hero-accent': accentColor || '#357ae8' }"
        v-animateonscroll="{ enterClass: 'animate-fade-slide-top' }"
    >
        <div class="page-hero-inner">
            <i class="page-hero-icon pi" :class="icon"></i>
            <h1 class="page-hero-title">{{ title }}</h1>
            <p v-if="description" class="page-hero-subtitle">{{ description }}</p>
            <div class="page-hero-content">
                <slot />
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
withDefaults(
    defineProps<{
        title: string
        icon: string
        description?: string
        accentColor?: string
    }>(),
    {
        description: undefined,
        accentColor: undefined,
    },
)
</script>

<style scoped>
.page-hero {
    background: linear-gradient(
        135deg,
        var(--hero-accent) 0%,
        color-mix(in srgb, var(--hero-accent) 70%, #000 30%) 50%,
        color-mix(in srgb, var(--hero-accent) 40%, #000 60%) 100%
    );
    color: #fff;
    text-align: center;
    padding: 3rem 1rem;
}

.page-hero-inner {
    max-width: 800px;
    margin: 0 auto;
}

.page-hero-icon {
    font-size: 2rem;
    margin-bottom: 0.75rem;
    display: inline-block;
}

.page-hero-title {
    font-size: 1.8rem;
    font-weight: 800;
    margin: 0 0 1rem;
    letter-spacing: -0.5px;
    line-height: 1.2;
}

.page-hero-subtitle {
    font-size: 1rem;
    opacity: 0.9;
    margin: 0 0 1.5rem;
    line-height: 1.5;
}

.page-hero-content:empty {
    display: none;
}

@media (min-width: 768px) {
    .page-hero {
        padding: 3.5rem 1.5rem;
    }
    .page-hero-title {
        font-size: 2.4rem;
    }
    .page-hero-subtitle {
        font-size: 1.1rem;
    }
}

@media (min-width: 1024px) {
    .page-hero {
        padding: 4rem 3rem;
    }
    .page-hero-title {
        font-size: 3rem;
    }
    .page-hero-subtitle {
        font-size: 1.15rem;
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
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
