<template>
    <header class="home-header">
        <div class="home-header-inner">
            <div class="home-header-logo" @click="router.push('/')">
                <i class="pi pi-images"></i>
                <span>Análise de Mídias</span>
            </div>

            <!-- Desktop nav links -->
            <nav class="home-header-nav" v-if="isDesktop">
                <router-link to="/" class="nav-link" active-class="nav-link-active">
                    <i class="pi pi-home"></i> Início
                </router-link>
                <router-link to="/photo-analysis" class="nav-link" active-class="nav-link-active">
                    <i class="pi pi-upload"></i> Análise de foto
                </router-link>
                <router-link to="/ad-analysis" class="nav-link" active-class="nav-link-active">
                    <i class="pi pi-megaphone"></i> Análise de anúncio
                </router-link>
                <router-link to="/youtube-analysis" class="nav-link" active-class="nav-link-active">
                    <i class="pi pi-youtube"></i> Análise de vídeo
                </router-link>
                <router-link to="/profile" class="nav-link" active-class="nav-link-active">
                    <i class="pi pi-user"></i> Meu Perfil
                </router-link>
            </nav>

            <!-- Mobile hamburger -->
            <Button
                v-if="!isDesktop"
                icon="pi pi-bars"
                class="hamburger-btn"
                @click="drawerVisible = true"
                text
                rounded
            />

            <!-- User chip (desktop) -->
            <div class="home-header-user" v-if="isDesktop && userDisplayName">
                <Chip
                    icon="pi pi-user"
                    :label="userDisplayName"
                    @click="router.push('/profile')"
                    class="user-chip"
                />
            </div>
        </div>

        <!-- Mobile Drawer -->
        <Drawer v-model:visible="drawerVisible" position="left" :style="{ width: '280px' }">
            <template #header>
                <div class="drawer-header">
                    <i class="pi pi-images"></i>
                    <span>Análise de Mídias</span>
                </div>
            </template>
            <div class="drawer-menu">
                <div class="drawer-item" @click="navigateTo('/')">
                    <i class="pi pi-home"></i> Início
                </div>
                <div class="drawer-item" @click="navigateTo('/photo-analysis')">
                    <i class="pi pi-upload"></i> Análise de foto
                </div>
                <div class="drawer-item" @click="navigateTo('/ad-analysis')">
                    <i class="pi pi-megaphone"></i> Análise de anúncio
                </div>
                <div class="drawer-item" @click="navigateTo('/youtube-analysis')">
                    <i class="pi pi-youtube"></i> Análise de vídeo
                </div>
                <div class="drawer-item" @click="navigateTo('/profile')">
                    <i class="pi pi-user"></i> Meu Perfil
                </div>
                <div class="drawer-divider"></div>
                <div class="drawer-item drawer-item-logout" @click="handleLogout">
                    <i class="pi pi-sign-out"></i> Sair
                </div>
            </div>
        </Drawer>
    </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Button from 'primevue/button'
import Drawer from 'primevue/drawer'
import Chip from 'primevue/chip'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const drawerVisible = ref(false)
const isDesktop = ref(window.innerWidth >= 1024)

const userDisplayName = computed(() => {
    if (!authStore.userEmail) return ''
    return authStore.userEmail.split('@')[0]
})

function onResize() {
    isDesktop.value = window.innerWidth >= 1024
}

onMounted(() => {
    window.addEventListener('resize', onResize)
    authStore.loadProfile()
})

function navigateTo(route: string) {
    drawerVisible.value = false
    router.push(route)
}

function handleLogout() {
    drawerVisible.value = false
    authStore.clearToken()
    router.push('/login')
}
</script>

<style scoped>
.home-header {
    background: #357ae8;
    color: #fff;
    position: sticky;
    top: 0;
    z-index: 100;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
}

.home-header-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.8rem 1rem;
    max-width: 1280px;
    margin: 0 auto;
    width: 100%;
}

.home-header-logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.2rem;
    font-weight: 700;
    cursor: pointer;
    white-space: nowrap;
}

.home-header-logo .pi {
    font-size: 1.4rem;
}

/* Mobile: hamburger only */
.home-header-nav {
    display: none;
}

.hamburger-btn {
    color: #fff !important;
}

:deep(.hamburger-btn.p-button) {
    color: #fff;
}

.home-header-user {
    display: none;
}

:deep(.user-chip.p-chip) {
    background: rgba(255, 255, 255, 0.15);
    color: #fff;
    font-size: 0.8rem;
    cursor: pointer;
}

:deep(.user-chip .p-chip-icon) {
    color: #fff;
}

/* Drawer styles */
.drawer-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.1rem;
    font-weight: 700;
    color: #357ae8;
}

.drawer-menu {
    padding: 0.5rem 0;
}

.drawer-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.85rem 1.25rem;
    cursor: pointer;
    color: #374151;
    font-size: 0.95rem;
    transition: background 0.2s;
    border-radius: 8px;
    margin: 0.15rem 0.5rem;
}

.drawer-item:hover {
    background: #f0f4ff;
    color: #357ae8;
}

.drawer-item-logout {
    color: #dc2626;
}

.drawer-item-logout:hover {
    background: #fef2f2;
}

.drawer-divider {
    height: 1px;
    background: #e5e7eb;
    margin: 0.5rem 1rem;
}

/* Tablet: 768px+ */
@media (min-width: 768px) {
    .home-header-inner {
        padding: 0.9rem 1.5rem;
    }

    .home-header-logo {
        font-size: 1.3rem;
    }
}

/* Desktop: 1024px+ */
@media (min-width: 1024px) {
    .home-header-inner {
        padding: 0.8rem 2rem;
    }

    .home-header-nav {
        display: flex;
        align-items: center;
        gap: 1.25rem;
    }

    .nav-link {
        display: flex;
        align-items: center;
        gap: 0.35rem;
        color: rgba(255, 255, 255, 0.85);
        text-decoration: none;
        font-size: 0.85rem;
        font-weight: 500;
        transition: color 0.2s;
        white-space: nowrap;
    }

    .nav-link:hover,
    .nav-link-active {
        color: #fff;
    }

    .nav-link-active {
        border-bottom: 2px solid #fff;
        padding-bottom: 2px;
    }

    .home-header-user {
        display: flex;
        align-items: center;
    }

    .hamburger-btn {
        display: none;
    }
}
</style>
