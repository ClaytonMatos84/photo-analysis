<template>
    <MainLayout>
        <template #default>
            <main class="top-videos-main">
                <header class="prime-header">
                    <span class="prime-header-title">
                        <i class="pi pi-chart-bar"></i> Top Vídeos do YouTube
                    </span>
                    <p class="prime-header-desc">
                        Veja os vídeos mais assistidos e mais curtidos
                        das suas análises do YouTube.
                    </p>

                    <div class="limit-control">
                        <label for="limitSlider" class="limit-label">Quantidade: {{ limit }}</label>
                        <Slider
                            v-model="limit"
                            :min="3"
                            :max="10"
                            :step="1"
                            inputId="limitSlider"
                            class="limit-slider"
                        />
                    </div>

                    <Message
                        v-if="errorMessage"
                        severity="error"
                        :closable="false"
                        class="top-error"
                    >
                        {{ errorMessage }}
                    </Message>
                </header>

                <section class="top-videos-tabs">
                    <Tabs value="topLikes">
                        <TabList>
                            <Tab value="topLikes">
                                <i class="pi pi-heart"></i> Top Likes
                            </Tab>
                            <Tab value="topViews">
                                <i class="pi pi-eye"></i> Top Visualizações
                            </Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel value="topLikes">
                                <YouTubeTopVideosList
                                    :videos="topLikes"
                                    metric="likeCount"
                                    :loading="loadingLikes"
                                />
                            </TabPanel>
                            <TabPanel value="topViews">
                                <YouTubeTopVideosList
                                    :videos="topViews"
                                    metric="viewCount"
                                    :loading="loadingViews"
                                />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </section>
            </main>
        </template>
    </MainLayout>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import MainLayout from '@/components/utils/MainLayout.vue'
import YouTubeTopVideosList from '@/components/youtube/YouTubeTopVideosList.vue'
import YouTubeAnalysisService from '@/services/YouTubeAnalysisService'
import Slider from 'primevue/slider'
import Message from 'primevue/message'
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'
import { useErrorHandler } from '@/composables/useErrorHandler'
import type { YouTubeTopVideo } from '@/types/YouTubeAnalysisTypes'

const limit = ref(5)
const topViews = ref<YouTubeTopVideo[]>([])
const topLikes = ref<YouTubeTopVideo[]>([])
const loadingViews = ref(false)
const loadingLikes = ref(false)
const errorMessage = ref('')

const { handleError } = useErrorHandler()

async function loadTopViews(): Promise<void> {
    loadingViews.value = true
    try {
        const response = await YouTubeAnalysisService.getTopViews(limit.value)
        topViews.value = response.videos
    } catch (error) {
        handleError(error, 'Erro ao carregar top visualizações')
        errorMessage.value = 'Erro ao carregar top visualizações.'
    } finally {
        loadingViews.value = false
    }
}

async function loadTopLikes(): Promise<void> {
    loadingLikes.value = true
    try {
        const response = await YouTubeAnalysisService.getTopLikes(limit.value)
        topLikes.value = response.videos
    } catch (error) {
        handleError(error, 'Erro ao carregar top likes')
        errorMessage.value = 'Erro ao carregar top likes.'
    } finally {
        loadingLikes.value = false
    }
}

async function loadAll(): Promise<void> {
    errorMessage.value = ''
    await Promise.allSettled([loadTopViews(), loadTopLikes()])
}

watch(limit, () => {
    loadAll()
})

onMounted(() => {
    loadAll()
})
</script>

<style scoped>
.top-videos-main {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    color: #0f172a;
}

.prime-header {
    width: 100%;
    background: #fff;
    border-radius: 14px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    padding: 2rem 2.5rem;
    margin-bottom: 0.5rem;
    text-align: center;
    border: 1px solid #e5e7eb;
}

.prime-header-title {
    color: #1f2937;
    font-size: 1.6rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 0.6rem;
    justify-content: center;
    margin-bottom: 0.75rem;
    letter-spacing: -0.3px;
}

.prime-header-title .pi {
    color: #4287f5;
    font-size: 1.4rem;
}

.prime-header-desc {
    font-size: 1.05rem;
    color: #374151;
    background: #f5f7fb;
    border-radius: 12px;
    padding: 1rem 1.25rem;
    margin: 0 auto 1.25rem auto;
    display: inline-block;
    border: 1px solid #e5e7eb;
}

.limit-control {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 0.5rem;
}

.limit-label {
    color: #374151;
    font-size: 1rem;
    font-weight: 600;
}

.limit-slider {
    width: 200px;
}

.top-error {
    margin-top: 1rem;
    text-align: left;
}

.top-videos-tabs {
    width: 100%;
}

@media (max-width: 900px) {
    .prime-header {
        padding: 1.2rem;
    }
}
</style>
