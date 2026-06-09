export interface PhotoAnalysisListItem {
    id: number
    description: string
    location: string
    style: string
    feeling: string
}

export interface PhotoAnalysisDetail {
    id: number
    userId: number
    description: string
    location: string
    style: string
    feeling: string
    createdAt: string
}

export interface AdAnalysisListItem {
    analysisId: string
    dataAnalise: string
    comparador: {
        marcaAnalisada: string
    }
    melhoria: {
        principalConcorrente: string
        url: string
    }
}

export interface YouTubeAnalysisListItem {
    id: number
    youtubeUrl: string | null
    title: string | null
    author: string | null
    category: string | null
    createdAt: string | null
}

export interface YouTubeAnalysisDetail {
    id: number
    youtubeUrl: string | null
    videoId: string | null
    title: string | null
    lengthSeconds: string | null
    channelId: string | null
    shortDescription: string | null
    viewCount: string | null
    author: string | null
    isLiveContent: boolean
    likeCount: string | null
    category: string | null
    ownerProfileUrl: string | null
    createdAt: string | null
}
