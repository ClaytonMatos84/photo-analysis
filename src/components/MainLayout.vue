<template>
    <div class="main-layout">
        <header class="header">
            <h1>Análise de fotos</h1>
        </header>
        <div class="layout-body">
            <aside class="sidebar" :class="{ 'sidebar-mobile': !isDesktop }" v-if="isDesktop">
                <div class="sidebar-content">
                    <Menu :model="menuItems" :router="true" />
                </div>
            </aside>
            <Button v-if="!isDesktop" icon="pi pi-bars" class="sidebar-toggle" @click="sidebarVisible = true" />
            <Sidebar v-model:visible="sidebarVisible" :style="{ width: '250px' }" v-if="!isDesktop">
                <div class="sidebar-content">
                    <Menu :model="menuItems" :router="true" />
                </div>
            </Sidebar>
            <main class="main-content">
                <slot />
            </main>
        </div>
        <footer class="footer">
            <span>© 2025 Análise de fotos | Desenvolvido com PrimeVue</span>
        </footer>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Sidebar from 'primevue/sidebar';
import Menu from 'primevue/menu';
import Button from 'primevue/button';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const authStore = useAuthStore();
const sidebarVisible = ref(false);
const isDesktop = ref(window.innerWidth >= 1024);
window.addEventListener('resize', () => {
    isDesktop.value = window.innerWidth >= 1024;
});

function handleLogout() {
    authStore.clearToken();
    router.push('/login');
}

const menuItems = [
    { label: 'Enviar Análise', icon: 'pi pi-upload', command: () => router.push('/') },
    { label: 'Sair', icon: 'pi pi-sign-out', command: handleLogout }
];
</script>

<style scoped>
.main-layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    position: relative;
}

.header {
    background: #1976d2;
    color: #fff;
    padding: 1rem;
    font-size: 1.5rem;
    text-align: left;
    z-index: 2;
    position: relative;
}

.layout-body {
    display: flex;
    flex: 1;
    gap: 2rem;
    padding: 2rem 0 0 0;
}

.main-content {
    flex: 1;
    padding: 2rem;
    background: #f4f6fa;
    min-height: calc(100vh - 70px - 50px);
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    margin: 0 2rem 2rem 0;
}

.footer {
    background: #1976d2;
    color: #fff;
    text-align: center;
    padding: 1rem 0;
    font-size: 1rem;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 2;
    box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.04);
}

.sidebar {
    width: 250px;
    background: #fff;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.04);
    border-radius: 0 12px 12px 0;
    margin-right: 2rem;
    padding: 2rem 0;
    min-height: calc(100vh - 70px - 50px);
}

.sidebar-content {
    padding: 0 1rem;
}

.sidebar-toggle {
    position: fixed;
    top: 80px;
    left: 1.2rem;
    z-index: 1001;
    background: #1976d2;
    color: #fff;
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}
</style>
