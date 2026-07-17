<template>
    <footer class="app-footer">
        <span>© {{ year }} Análise de Mídias — Desenvolvido com PrimeVue</span>
        <router-link to="/profile" class="app-footer-link">Meu Perfil</router-link>
    </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<style scoped>
.app-footer {
    background: #1f2937;
    color: #d1d5db;
    text-align: center;
    padding: 1.25rem 1rem;
    font-size: 0.85rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
}

.app-footer-link {
    color: #93c5fd;
    text-decoration: none;
    font-size: 0.8rem;
}

.app-footer-link:hover {
    text-decoration: underline;
}

@media (min-width: 768px) {
    .app-footer {
        flex-direction: row;
        justify-content: center;
        gap: 1.5rem;
    }
}
</style>
