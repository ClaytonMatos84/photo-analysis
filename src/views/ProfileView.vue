<template>
    <MainLayout>
        <PageHero
            title="Meu Perfil"
            icon="pi pi-user"
            description="Visualize e edite suas informações pessoais"
        />
        <main class="profile-main">
            <div class="profile-content">
                <UserProfileForm />
            </div>
        </main>
    </MainLayout>
</template>

<script setup lang="ts">
import MainLayout from '@/components/utils/MainLayout.vue'
import PageHero from '@/components/utils/PageHero.vue'
import UserProfileForm from '@/components/auth/UserProfileForm.vue'
</script>

<style scoped>
.profile-main {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    color: #0f172a;
    padding: 1.5rem 1rem 2rem;
}

.profile-content {
    width: 100%;
    max-width: 1200px;
    padding: 0 1rem;
}
</style>
