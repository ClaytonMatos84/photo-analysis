<template>
    <div class="login-container">
        <div class="login-box">
            <div class="login-title">Bem vindo</div>
            <div class="login-fields">
                <IconField class="w-full">
                    <InputIcon class="pi pi-user text-white/70" />
                    <InputText v-model="username" type="text" class="w-full" placeholder="Usuário"
                        :class="{ 'p-invalid': usernameError }" />
                </IconField>
                <Message v-if="usernameError" severity="error" class="login-error-msg" :closable="false">{{
                    usernameError }}</Message>
                <IconField class="w-full">
                    <InputIcon class="pi pi-lock text-white/70" />
                    <InputText v-model="password" type="password" class="w-full" placeholder="Password"
                        :class="{ 'p-invalid': passwordError }" />
                </IconField>
                <Message v-if="passwordError" severity="error" class="login-error-msg" :closable="false">{{
                    passwordError }}</Message>
            </div>
            <Button label="Entrar" class="w-full p-button-rounded p-button-primary login-btn" :disabled="isLoading"
                @click="handleLogin" />
            <Message v-if="formError" severity="error" class="login-form-error" :closable="false">{{ formError }}
            </Message>
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

const router = useRouter();
const username = ref('');
const password = ref('');
const usernameError = ref('');
const passwordError = ref('');
const formError = ref('');
const isLoading = ref(false);

function validateForm() {
    let valid = true;
    usernameError.value = '';
    passwordError.value = '';
    formError.value = '';
    if (!username.value) {
        usernameError.value = 'Usuário é obrigatório.';
        valid = false;
    }
    if (!password.value) {
        passwordError.value = 'Senha é obrigatória.';
        valid = false;
    }
    return valid;
}

async function handleLogin() {
    if (!validateForm()) return;
    isLoading.value = true;
    formError.value = '';
    // Simulação de autenticação (substitua por chamada real de API se necessário)
    await new Promise(resolve => setTimeout(resolve, 800));
    if (username.value === 'admin' && password.value === 'admin') {
        router.push({ name: 'home' });
    } else {
        formError.value = 'Usuário ou senha inválidos.';
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
</style>