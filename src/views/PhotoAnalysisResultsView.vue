<template>
    <MainLayout>
        <PageHero
            title="Minhas Análises"
            icon="pi pi-list"
            description="Consulte o histórico das suas análises de fotos, anúncios e vídeos."
        />
        <section class="results-tabs-wrapper">
            <Tabs value="photos">
                <TabList>
                    <Tab value="photos">Análises de fotos</Tab>
                    <Tab value="ads">Análises de anúncios</Tab>
                    <Tab value="youtube">Análises de vídeos</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel value="photos">
                        <PhotoAnalysisResults />
                    </TabPanel>
                    <TabPanel value="ads">
                        <AdAnalysisResults />
                    </TabPanel>
                    <TabPanel value="youtube">
                        <YouTubeAnalysisResults />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </section>
    </MainLayout>
</template>

<script setup lang="ts">
import MainLayout from '@/components/utils/MainLayout.vue'
import PageHero from '@/components/utils/PageHero.vue'
import PhotoAnalysisResults from '@/components/photo/PhotoAnalysisResults.vue'
import AdAnalysisResults from '@/components/ad/AdAnalysisResults.vue'
import YouTubeAnalysisResults from '@/components/youtube/YouTubeAnalysisResults.vue'
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'
</script>

<style scoped>
.results-tabs-wrapper {
    display: flex;
    flex-direction: column;
    padding: 1.5rem 1rem 2rem;
    max-width: 1280px;
    margin: 0 auto;
    width: 100%;
}
</style>
