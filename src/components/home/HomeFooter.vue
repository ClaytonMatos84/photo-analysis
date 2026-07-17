<template>
    <footer class="home-footer">
        <span>© {{ year }} Análise de Mídias — Desenvolvido com PrimeVue</span>
        <router-link to="/profile" class="home-footer-link">Meu Perfil</router-link>
    </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<style scoped>
.home-footer {
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

.home-footer-link {
    color: #93c5fd;
    text-decoration: none;
    font-size: 0.8rem;
}

.home-footer-link:hover {
    text-decoration: underline;
}

@media (min-width: 768px) {
    .home-footer {
        flex-direction: row;
        justify-content: center;
        gap: 1.5rem;
    }
}
</style>
