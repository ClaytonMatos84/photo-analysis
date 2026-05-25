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
