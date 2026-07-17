<template>
    <div class="main-layout">
        <AppHeader />
        <main class="main-content">
            <slot />
        </main>
        <AppFooter />
    </div>
</template>

<script lang="ts" setup>
import AppHeader from '@/components/utils/AppHeader.vue'
import AppFooter from '@/components/utils/AppFooter.vue'
</script>

<style scoped>
.main-layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background: #f5f7fb;
    color: #0f172a;
}

.main-content {
    flex: 1;
}
</style>
