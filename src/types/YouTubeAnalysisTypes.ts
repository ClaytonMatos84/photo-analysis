export interface YouTubeAnalysisResult {
    id: number
    youtubeUrl: string
    videoId: string
    title: string
    lengthSeconds: string
    channelId: string
    shortDescription: string
    viewCount: string
    author: string
    isLiveContent: boolean
    likeCount: string
    category: string
    ownerProfileUrl: string
    createdAt: string
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

export interface YouTubeTopVideo {
    id: number
    youtubeUrl: string
    videoId: string
    title: string
    author: string
    viewCount: number
    likeCount: number
    createdAt: string
}

export interface YouTubeTopVideosResponse {
    metric: 'viewCount' | 'likeCount'
    totalReturned: number
    videos: YouTubeTopVideo[]
}
