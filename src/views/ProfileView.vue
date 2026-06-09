<template>
    <MainLayout>
        <template #default>
            <main class="profile-main">
                <header class="profile-header prime-header">
                    <span class="prime-header-title"> <i class="pi pi-user"></i> Meu Perfil </span>
                    <p class="prime-header-desc">Visualize e edite suas informações pessoais</p>
                </header>

                <div class="profile-content">
                    <UserProfileForm />
                </div>
            </main>
        </template>
    </MainLayout>
</template>

<script setup lang="ts">
import MainLayout from '@/components/utils/MainLayout.vue'
import UserProfileForm from '@/components/auth/UserProfileForm.vue'
</script>

<style scoped>
.profile-main {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    color: #0f172a;
    padding-bottom: 2rem;
}

.profile-header {
    width: 100%;
    max-width: 1200px;
    text-align: center;
}

.prime-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    padding: 1.5rem 1rem;
}

.prime-header-title {
    font-size: 1.75rem;
    font-weight: 700;
    color: #1e293b;
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.prime-header-title .pi {
    font-size: 1.5rem;
    color: #3b82f6;
}

.prime-header-desc {
    font-size: 1rem;
    color: #64748b;
    margin: 0;
    font-weight: 400;
}

.profile-content {
    width: 100%;
    max-width: 1200px;
    padding: 0 1rem;
}

@media (max-width: 768px) {
    .prime-header-title {
        font-size: 1.5rem;
    }

    .prime-header-title .pi {
        font-size: 1.25rem;
    }

    .prime-header-desc {
        font-size: 0.875rem;
    }
}
</style>
