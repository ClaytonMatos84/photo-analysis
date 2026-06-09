export interface PhotoAnalysisResult {
    descricao_cena: string
    objetos_identificados: string[]
    pessoas: {
        quantidade: string
        descricao: string
    }
    local_ambiente: string
    estilo_foto: string
    sentimento_transmitido: string
    observacoes_adicionais: string
}

export interface AdAnalysisComparador {
    marcaAnalisada: string
    resumoPosicionamentoMarca: string
    quantidadeConcorrentes: number
    forcasDaMarca: string
    fraquezasDaMarca: string
    oportunidadesDeMercado: string
    ameacas: string
    insightFinal: string
    createdAt: string
}

export interface AdAnalysisEstrategia {
    posicionamentoSugerido: string
    propostaDeValorReforcada: string
    mensagemPrincipal: string
    tomDeVozSugerido: string
    createdAt: string
}

export interface AdAnalysisMelhoria {
    principalConcorrente: string
    criterioDeEscolhaDoConcorrente: string
    pontosFortesDoCliente: string
    pontosFortesDoConcorrente: string
    oportunidadesDeMelhoriaParaOCliente: string
    mensagem: string
    elementosVisuais: string
    tomDeVoz: string
    callToAction: string
    propostaDeValorReforcada: string
    exemploResumidoDeReformulacao: string
    url: string
    createdAt: string
}

export interface AdAnalysisResult {
    analysisId: string
    dataAnalise: string
    comparador: AdAnalysisComparador
    estrategia: AdAnalysisEstrategia
    melhoria: AdAnalysisMelhoria
}

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
