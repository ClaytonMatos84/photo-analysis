<template>
    <MainLayout>
        <PageHero
            title="Top Vídeos do YouTube"
            icon="pi pi-chart-bar"
            description="Veja os vídeos mais assistidos e mais curtidos das suas análises do YouTube."
        >
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

            <Message v-if="errorMessage" severity="error" :closable="false" class="top-error">
                {{ errorMessage }}
            </Message>
        </PageHero>

        <main class="top-videos-main">
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
    </MainLayout>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import MainLayout from '@/components/utils/MainLayout.vue'
import PageHero from '@/components/utils/PageHero.vue'
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
    padding: 1.5rem 1rem 2rem;
    max-width: 1280px;
    margin: 0 auto;
    width: 100%;
}

.limit-control {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 0.5rem;
}

.limit-label {
    color: #fff;
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
</style>
