<template>
    <div class="home-page">
        <HomeHeader />
        <main class="home-content">
            <HomeHero />
            <HomeStats />
            <HomeFeatures />
            <HomeHowItWorks />
            <HomeCarousel />
        </main>
        <HomeFooter />
    </div>
</template>

<script setup lang="ts">
import HomeHeader from '@/components/home/HomeHeader.vue'
import HomeHero from '@/components/home/HomeHero.vue'
import HomeStats from '@/components/home/HomeStats.vue'
import HomeFeatures from '@/components/home/HomeFeatures.vue'
import HomeHowItWorks from '@/components/home/HomeHowItWorks.vue'
import HomeCarousel from '@/components/home/HomeCarousel.vue'
import HomeFooter from '@/components/home/HomeFooter.vue'
</script>

<style scoped>
.home-page {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background: #fff;
}

.home-content {
    flex: 1;
    scroll-behavior: smooth;
}
</style>
