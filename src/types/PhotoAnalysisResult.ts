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
