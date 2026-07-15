<template>
    <div class="top-videos-list">
        <h3 class="ranking-title">
            <i :class="metricIcon" class="ranking-icon"></i>
            {{ metricLabel }}
        </h3>

        <DataView
            :value="videos"
            :loading="loading"
            layout="list"
        >
            <template #list="slotProps">
                <div class="ranking-items">
                    <div
                        v-for="(video, index) in slotProps.items"
                        :key="video.id"
                        class="ranking-item"
                    >
                        <span class="rank-badge">
                            {{ rankLabel(Number(index)) }}
                        </span>

                        <div class="thumbnail-wrapper">
                            <img
                                :src="thumbnailUrl(video.videoId)"
                                :alt="video.title"
                                class="thumbnail"
                                @error="onThumbnailError"
                            />
                            <div class="thumbnail-fallback" style="display: none">
                                <i class="pi pi-video"></i>
                            </div>
                        </div>

                        <div class="video-info">
                            <span class="metric-value">
                                {{ formatNumber(getMetricValue(video)) }}
                            </span>
                            <span class="metric-label">{{ metricUnitLabel }}</span>
                            <p class="video-title">{{ video.title }}</p>
                            <p class="video-author">{{ video.author }}</p>
                        </div>

                        <a
                            :href="video.youtubeUrl"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="watch-link"
                        >
                            <i class="pi pi-external-link"></i> Assistir
                        </a>
                    </div>
                </div>
            </template>

            <template #empty>
                <div class="empty-state">
                    <i class="pi pi-inbox"></i>
                    <p>Nenhum vídeo encontrado para este ranking.</p>
                </div>
            </template>
        </DataView>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import DataView from 'primevue/dataview'
import type { YouTubeTopVideo } from '@/types/YouTubeAnalysisTypes'

const props = defineProps<{
    videos: YouTubeTopVideo[]
    metric: 'viewCount' | 'likeCount'
    loading: boolean
}>()

const metricLabel = computed(() => {
    return props.metric === 'viewCount'
        ? 'Top Visualizações'
        : 'Top Likes'
})

const metricIcon = computed(() => {
    return props.metric === 'viewCount'
        ? 'pi pi-eye'
        : 'pi pi-heart'
})

const metricUnitLabel = computed(() => {
    return props.metric === 'viewCount'
        ? 'visualizações'
        : 'likes'
})

function getMetricValue(video: YouTubeTopVideo): number {
    return props.metric === 'viewCount'
        ? video.viewCount
        : video.likeCount
}

function rankLabel(index: number): string {
    const medals = ['🥇', '🥈', '🥉']

    if (index < 3) {
        return medals[index]!
    }

    return String(index + 1)
}

function thumbnailUrl(videoId: string): string {
    return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
}

function onThumbnailError(event: Event): void {
    const img = event.target as HTMLImageElement
    const fallback = img.nextElementSibling as HTMLElement

    if (img && fallback) {
        img.style.display = 'none'
        fallback.style.display = 'flex'
    }
}

function formatNumber(value: number): string {
    return new Intl.NumberFormat('pt-BR').format(value)
}
</script>

<style scoped>
.top-videos-list {
    background: #fff;
    border-radius: 14px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    padding: 1.5rem;
    border: 1px solid #e5e7eb;
}

.ranking-title {
    color: #1f2937;
    font-size: 1.3rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin: 0 0 1rem 0;
}

.ranking-icon {
    color: #4287f5;
    font-size: 1.1rem;
}

.ranking-items {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.ranking-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.9rem 1rem;
    background: #f9fafb;
    border: 1px solid #e5e7eb;
    border-radius: 10px;
    transition: box-shadow 0.2s, transform 0.2s;
}

.ranking-item:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
    transform: translateY(-1px);
}

.rank-badge {
    font-size: 1.4rem;
    font-weight: 700;
    min-width: 2rem;
    text-align: center;
    flex-shrink: 0;
}

.thumbnail-wrapper {
    width: 120px;
    height: 68px;
    border-radius: 8px;
    overflow: hidden;
    flex-shrink: 0;
    background: #0f172a;
    position: relative;
}

.thumbnail {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

.thumbnail-fallback {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #9ca3af;
    font-size: 1.5rem;
    position: absolute;
    top: 0;
    left: 0;
}

.video-info {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
}

.metric-value {
    color: #4287f5;
    font-size: 1.1rem;
    font-weight: 700;
}

.metric-label {
    color: #6b7280;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.video-title {
    color: #1f2937;
    font-size: 0.95rem;
    font-weight: 600;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.video-author {
    color: #6b7280;
    font-size: 0.85rem;
    margin: 0;
}

.watch-link {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.5rem 0.9rem;
    background: #4287f5;
    color: #fff;
    border-radius: 8px;
    font-size: 0.8rem;
    font-weight: 600;
    text-decoration: none;
    white-space: nowrap;
    flex-shrink: 0;
    transition: background-color 0.2s, transform 0.2s;
}

.watch-link:hover {
    background: #3070d8;
    transform: translateY(-1px);
}

.watch-link:active {
    transform: translateY(0);
}

.empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem 1rem;
    color: #6b7280;
    gap: 0.75rem;
}

.empty-state .pi {
    font-size: 2rem;
    color: #9ca3af;
}

.empty-state p {
    margin: 0;
    font-size: 0.95rem;
}

@media (max-width: 900px) {
    .ranking-item {
        flex-wrap: wrap;
    }

    .thumbnail-wrapper {
        width: 100%;
        height: 0;
        padding-bottom: 56.25%;
        position: relative;
    }

    .thumbnail,
    .thumbnail-fallback {
        position: absolute;
        top: 0;
        left: 0;
    }

    .watch-link {
        width: 100%;
        justify-content: center;
    }
}
</style>
