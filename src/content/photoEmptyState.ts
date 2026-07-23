import type {
    AnalysisEmptyStateStep,
    AnalysisEmptyStateBenefit,
} from '@/components/utils/AnalysisEmptyState.vue'

export const photoEmptyStateSteps: AnalysisEmptyStateStep[] = [
    {
        number: 1,
        icon: 'pi pi-upload',
        title: 'Envie uma imagem',
        description: 'Selecione uma foto em PNG, JPG ou JPEG para iniciar a análise.',
    },
    {
        number: 2,
        icon: 'pi pi-cog',
        title: 'Aguarde a análise',
        description: 'Nossa inteligência artificial processa a imagem em poucos instantes.',
    },
    {
        number: 3,
        icon: 'pi pi-chart-bar',
        title: 'Veja o resultado',
        description: 'Visualize a imagem enviada junto com todos os insights encontrados.',
    },
]

export const photoEmptyStateBenefits: AnalysisEmptyStateBenefit[] = [
    {
        icon: 'pi pi-images',
        title: 'Objetos identificados',
        description: 'Lista dos principais objetos e elementos reconhecidos na foto.',
    },
    {
        icon: 'pi pi-heart',
        title: 'Sentimento transmitido',
        description: 'A emoção ou clima geral que a imagem comunica.',
    },
    {
        icon: 'pi pi-palette',
        title: 'Estilo da foto',
        description: 'Características visuais e estéticas identificadas na composição.',
    },
    {
        icon: 'pi pi-map-marker',
        title: 'Pessoas e ambiente',
        description: 'Quantidade de pessoas presentes e descrição do local ou ambiente da cena.',
    },
]
