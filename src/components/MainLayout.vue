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
            <Drawer v-model:visible="sidebarVisible" position="left" :style="{ width: '250px' }" v-if="!isDesktop">
                <div class="sidebar-content">
                    <Menu :model="menuItems" :router="true" />
                </div>
            </Drawer>
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
import Drawer from 'primevue/drawer';
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
    background: #f5f7fb;
    color: #0f172a;
}

.header {
    background: #357ae8;
    color: #fff;
    padding: 1.2rem 2rem 1.2rem 2.75rem;
    font-size: 1.6rem;
    text-align: left;
    z-index: 2;
    position: sticky;
    top: 0;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
}

.layout-body {
    display: flex;
    flex: 1;
    gap: 2rem;
    padding: 2rem 2rem 3rem 2rem;
}

.main-content {
    flex: 1;
    padding: 2rem;
    background: #fff;
    border: 1px solid #e5e7eb;
    min-height: calc(100vh - 70px - 50px);
    border-radius: 14px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    margin: 0 2rem 2rem 0;
}

.footer {
    background: #357ae8;
    color: #fff;
    text-align: center;
    padding: 1rem 0;
    font-size: 1rem;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 2;
    box-shadow: 0 -6px 18px rgba(0, 0, 0, 0.12);
}

.sidebar {
    width: 250px;
    background: #fff;
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
    border-radius: 14px;
    margin-right: 2rem;
    padding: 2rem 0;
    min-height: calc(100vh - 70px - 50px);
    border: 1px solid #e5e7eb;
}

.sidebar-content {
    padding: 0 1.25rem;
}

.sidebar-toggle {
    position: fixed;
    top: 80px;
    left: 1.2rem;
    z-index: 1001;
    background: linear-gradient(135deg, #4287f5 0%, #357ae8 100%) !important;
    color: #fff !important;
    border: none !important;
    border-radius: 50%;
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 10px 24px rgba(66, 135, 245, 0.35);
}

:deep(.sidebar-toggle.p-button:hover) {
    background: linear-gradient(135deg, #4f8df8 0%, #3b82f6 100%) !important;
    box-shadow: 0 12px 28px rgba(66, 135, 245, 0.45) !important;
}

:deep(.sidebar-toggle .pi) {
    color: #fff !important;
}
</style>
