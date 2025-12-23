<template>
    <div class="register-container">
        <div class="register-box">
            <form @submit.prevent="handleRegister">
                <div class="register-title">Cadastre-se</div>
                <div class="register-fields">
                    <IconField class="w-full">
                        <InputIcon class="pi pi-envelope text-white/70" />
                        <InputText v-model="email" type="email" class="w-full" placeholder="Email"
                            :class="{ 'p-invalid': emailError }" />
                    </IconField>
                    <Message v-if="emailError" severity="error" class="register-error-msg" :closable="false">{{
                        emailError }}</Message>
                    <IconField class="w-full">
                        <InputIcon class="pi pi-lock text-white/70" />
                        <InputText v-model="password" type="password" class="w-full" placeholder="Senha"
                            autocomplete="false" :class="{ 'p-invalid': passwordError }" />
                    </IconField>
                    <Message v-if="passwordError" severity="error" class="register-error-msg" :closable="false">{{
                        passwordError }}</Message>
                    <IconField class="w-full">
                        <InputIcon class="pi pi-lock text-white/70" />
                        <InputText v-model="confirmPassword" type="password" class="w-full" autocomplete="false"
                            placeholder="Confirmar Senha" :class="{ 'p-invalid': confirmPasswordError }" />
                    </IconField>
                    <Message v-if="confirmPasswordError" severity="error" class="register-error-msg" :closable="false">
                        {{
                            confirmPasswordError }}</Message>
                </div>
                <Button label="Cadastrar" type="submit" class="w-full p-button-rounded p-button-primary register-btn"
                    :disabled="isLoading" />
                <Message v-if="formError" severity="error" class="register-form-error" :closable="false">{{ formError }}
                </Message>
                <Message v-if="successMessage" severity="success" class="register-form-error" :closable="false">{{
                    successMessage }}
                </Message>
            </form>
            <div class="toggle-mode">
                <span class="toggle-text">
                    Já tem uma conta?
                </span>
                <Button label="Fazer Login" class="p-button-text p-button-sm toggle-btn"
                    @click="router.push({ name: 'login' })" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Button from 'primevue/button';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';
import Message from 'primevue/message';
import AuthService from '@/services/AuthService';

const router = useRouter();
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const emailError = ref('');
const passwordError = ref('');
const confirmPasswordError = ref('');
const formError = ref('');
const successMessage = ref('');
const isLoading = ref(false);

function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateForm() {
    let valid = true;
    emailError.value = '';
    passwordError.value = '';
    confirmPasswordError.value = '';
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

    if (!confirmPassword.value) {
        confirmPasswordError.value = 'Confirmação de senha é obrigatória.';
        valid = false;
    } else if (password.value !== confirmPassword.value) {
        confirmPasswordError.value = 'As senhas não coincidem.';
        valid = false;
    }

    return valid;
}

async function handleRegister() {
    if (!validateForm()) return;
    isLoading.value = true;
    formError.value = '';
    successMessage.value = '';

    const response = await AuthService.register(email.value, password.value);

    if (response.userId) {
        successMessage.value = 'Cadastro realizado com sucesso! Redirecionando para o login...';
        setTimeout(() => {
            router.push({ name: 'login' });
        }, 2000);
    } else {
        formError.value = response.message || 'Erro ao realizar cadastro.';
    }

    isLoading.value = false;
}
</script>

<style scoped>
/* Animações */
@keyframes shake {

    0%,
    100% {
        transform: translateX(0);
    }

    10%,
    30%,
    50%,
    70%,
    90% {
        transform: translateX(-5px);
    }

    20%,
    40%,
    60%,
    80% {
        transform: translateX(5px);
    }
}

.register-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #0f1419 0%, #232526 50%, #414345 100%);
    padding: 1rem;
}

.register-box {
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 1.5rem;
    box-shadow:
        0 8px 32px 0 rgba(31, 38, 135, 0.37),
        0 0 40px rgba(66, 135, 245, 0.15);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    padding: 2.5rem 2rem;
    max-width: 380px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    transition: all 0.3s ease;
}

.register-box:hover {
    border-color: rgba(255, 255, 255, 0.3);
    box-shadow:
        0 12px 40px 0 rgba(31, 38, 135, 0.5),
        0 0 50px rgba(66, 135, 245, 0.25);
}

.register-title {
    color: #fff;
    font-size: 2.2rem;
    font-weight: 700;
    text-align: center;
    background: linear-gradient(135deg, #fff 0%, #d4d4d8 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: -0.5px;
    margin-bottom: 1rem;
}

.register-fields {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.3rem;
}

/* Input styling */
:deep(.p-inputtext) {
    background: rgba(255, 255, 255, 0.08) !important;
    border: 1px solid rgba(255, 255, 255, 0.15) !important;
    border-radius: 0.75rem !important;
    color: #fff !important;
    padding: 0.75rem 1rem !important;
    transition: all 0.3s ease !important;
    font-size: 0.95rem !important;
}

:deep(.p-inputtext::placeholder) {
    color: rgba(255, 255, 255, 0.5) !important;
}

:deep(.p-inputtext:focus) {
    background: rgba(255, 255, 255, 0.12) !important;
    border-color: rgba(66, 135, 245, 0.8) !important;
    box-shadow: 0 0 15px rgba(66, 135, 245, 0.4) !important;
    outline: none !important;
}

:deep(.p-inputtext.p-invalid) {
    border-color: #ef4444 !important;
}

:deep(.p-inputtext.p-invalid:focus) {
    box-shadow: 0 0 15px rgba(239, 68, 68, 0.4) !important;
}

:deep(.p-iconfield .p-input-icon-left) {
    left: 0.5rem;
}

:deep(.p-iconfield .pi) {
    font-size: 1.1rem;
    transition: all 0.3s ease;
}

:deep(.p-inputtext) {
    padding-left: 2.8rem !important;
}

/* Icon color dynamics */
:deep(.p-inputtext:focus ~ .pi) {
    color: rgba(66, 135, 245, 0.9) !important;
}

.register-error-msg {
    margin-top: -0.8rem !important;
    font-size: 0.85rem !important;
}

:deep(.register-error-msg .p-message-wrapper) {
    padding: 0.5rem 0.75rem !important;
    background: rgba(239, 68, 68, 0.1) !important;
    border: 1px solid rgba(239, 68, 68, 0.3) !important;
    border-radius: 0.5rem !important;
}

:deep(.register-error-msg .p-message-text) {
    color: #fca5a5 !important;
    font-size: 0.85rem !important;
}

.register-btn {
    margin-top: 1.5rem;
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease !important;
}

:deep(.register-btn) {
    background: linear-gradient(135deg, #4287f5 0%, #357ae8 100%) !important;
    border: none !important;
    border-radius: 0.75rem !important;
    padding: 0.85rem 2rem !important;
    font-size: 1rem !important;
    font-weight: 600 !important;
    letter-spacing: 0.5px !important;
    box-shadow: 0 4px 15px rgba(66, 135, 245, 0.4) !important;
}

:deep(.register-btn:hover:not(:disabled)) {
    background: linear-gradient(135deg, #4287f5 0%, #357ae8 100%) !important;
    box-shadow: 0 8px 25px rgba(66, 135, 245, 0.6) !important;
    transform: translateY(-2px) !important;
}

:deep(.register-btn:active:not(:disabled)) {
    transform: translateY(0) !important;
}

:deep(.register-btn:disabled) {
    opacity: 0.7 !important;
    cursor: not-allowed !important;
}

:deep(.register-form-error .p-message-wrapper) {
    padding: 1rem !important;
    background: rgba(239, 68, 68, 0.1) !important;
    border: 1px solid rgba(239, 68, 68, 0.3) !important;
    border-radius: 0.75rem !important;
}

:deep(.register-form-error .p-message-text) {
    color: #fca5a5 !important;
}

.toggle-mode {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    width: 100%;
    padding-top: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.toggle-text {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.9rem;
    transition: color 0.3s ease;
}

.toggle-btn {
    color: #4287f5 !important;
    font-weight: 600 !important;
    text-decoration: none !important;
    transition: all 0.3s ease !important;
    position: relative;
}

.toggle-btn::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #4287f5, transparent);
    transition: width 0.3s ease;
}

.toggle-btn:hover {
    background: transparent !important;
    color: #fff !important;
}

.toggle-btn:hover::after {
    width: 100%;
}

/* Responsividade */
@media (max-width: 480px) {
    .register-box {
        padding: 2rem 1.5rem;
        max-width: 100%;
        gap: 1.5rem;
    }

    .register-title {
        font-size: 1.8rem;
    }

    .register-fields {
        gap: 1rem;
    }

    .toggle-mode {
        flex-direction: column;
        gap: 1rem;
    }

    .toggle-text {
        font-size: 0.85rem;
    }
}
</style>
