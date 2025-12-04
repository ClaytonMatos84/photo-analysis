<template>
    <div class="login-container">
        <div class="login-box">
            <div class="login-title">Bem vindo</div>
            <div class="login-fields">
                <IconField class="w-full">
                    <InputIcon class="pi pi-user text-white/70" />
                    <InputText type="text" class="w-full" placeholder="Usuário" />
                </IconField>
                <IconField class="w-full">
                    <InputIcon class="pi pi-lock text-white/70" />
                    <InputText type="password" class="w-full" placeholder="Password" />
                </IconField>
            </div>
            <Button label="Entrar" class="w-full p-button-rounded p-button-primary login-btn" @click="redirectHome" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import Button from 'primevue/button';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';

const router = useRouter();
function redirectHome() {
    router.push({ name: 'home' });
}
</script>

<style scoped>
.login-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #232526 0%, #414345 100%);
}

.login-box {
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 1.5rem;
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    padding: 2.5rem 2rem;
    max-width: 350px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
}

.login-title {
    color: #fff;
    font-size: 2rem;
    font-weight: 600;
    text-align: center;
}

.login-fields {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.login-btn {
    margin-top: 0.5rem;
}
</style>