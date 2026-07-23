import type {
    AnalysisEmptyStateStep,
    AnalysisEmptyStateBenefit,
} from '@/components/utils/AnalysisEmptyState.vue'

export const youtubeEmptyStateSteps: AnalysisEmptyStateStep[] = [
    {
        number: 1,
        icon: 'pi pi-link',
        title: 'Informe a URL do vídeo',
        description: 'Cole o endereço de um vídeo do YouTube para iniciar a coleta dos dados.',
    },
    {
        number: 2,
        icon: 'pi pi-cog',
        title: 'Aguarde a coleta dos dados',
        description: 'Nosso sistema coleta os dados do YouTube e engajamento do vídeo.',
    },
    {
        number: 3,
        icon: 'pi pi-chart-bar',
        title: 'Veja identificação e engajamento',
        description: 'Visualize o vídeo junto com os dados de canal e desempenho.',
    },
]

export const youtubeEmptyStateBenefits: AnalysisEmptyStateBenefit[] = [
    {
        icon: 'pi pi-video',
        title: 'Identificação do vídeo',
        description: 'Título, duração e categoria do vídeo analisado.',
    },
    {
        icon: 'pi pi-users',
        title: 'Canal e engajamento',
        description: 'Autor, visualizações e curtidas registradas no canal.',
    },
    {
        icon: 'pi pi-align-left',
        title: 'Descrição do vídeo',
        description: 'Resumo do conteúdo descrito pelo autor do vídeo.',
    },
    {
        icon: 'pi pi-calendar',
        title: 'Metadados',
        description: 'Data de criação e demais informações complementares do vídeo.',
    },
]
