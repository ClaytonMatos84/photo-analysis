<template>
    <div class="login-container">
        <div class="login-box">
            <div class="login-title">Bem vindo</div>
            <div class="login-fields">
                <IconField class="w-full">
                    <InputIcon class="pi pi-envelope text-white/70" />
                    <InputText v-model="email" type="email" class="w-full" placeholder="Email"
                        :class="{ 'p-invalid': emailError }" />
                </IconField>
                <Message v-if="emailError" severity="error" class="login-error-msg" :closable="false">{{
                    emailError }}</Message>
                <IconField class="w-full">
                    <InputIcon class="pi pi-lock text-white/70" />
                    <InputText v-model="password" type="password" class="w-full" placeholder="Senha"
                        :class="{ 'p-invalid': passwordError }" />
                </IconField>
                <Message v-if="passwordError" severity="error" class="login-error-msg" :closable="false">{{
                    passwordError }}</Message>
            </div>
            <Button label="Entrar" class="w-full p-button-rounded p-button-primary login-btn" :disabled="isLoading"
                @click="handleLogin" />
            <Message v-if="formError" severity="error" class="login-form-error" :closable="false">{{ formError }}
            </Message>
            <div class="toggle-mode">
                <span class="toggle-text">
                    Não tem uma conta?
                </span>
                <Button label="Cadastre-se" class="p-button-text p-button-sm toggle-btn"
                    @click="router.push({ name: 'register' })" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Button from 'primevue/button';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';
import Message from 'primevue/message';
import AuthService from '@/services/AuthService';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
const email = ref('');
const password = ref('');
const emailError = ref('');
const passwordError = ref('');
const formError = ref('');
const isLoading = ref(false);

function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateForm() {
    let valid = true;
    emailError.value = '';
    passwordError.value = '';
    formError.value = '';

    if (!email.value) {
        emailError.value = 'Email é obrigatório.';
        valid = false;
    } else if (!validateEmail(email.value)) {
        emailError.value = 'Email inválido.';
        valid = false;
    }

    if (!password.value) {
        passwordError.value = 'Senha é obrigatória.';
        valid = false;
    } else if (password.value.length < 6) {
        passwordError.value = 'A senha deve ter no mínimo 6 caracteres.';
        valid = false;
    }

    return valid;
}

async function handleLogin() {
    if (!validateForm()) return;
    isLoading.value = true;
    formError.value = '';

    const response = await AuthService.login(email.value, password.value);

    if (response.success) {
        authStore.setToken(response.token);
        const redirect = (route.query.redirect as string) || '';
        if (redirect) {
            router.push(redirect);
        } else {
            router.push({ name: 'home' });
        }
    } else {
        formError.value = response.message || 'Erro ao realizar login.';
    }

    isLoading.value = false;
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

.toggle-mode {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    width: 100%;
}

.toggle-text {
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.9rem;
}

.toggle-btn {
    color: #fff !important;
    font-weight: 600;
}

.toggle-btn:hover {
    background: rgba(255, 255, 255, 0.1) !important;
}
</style>