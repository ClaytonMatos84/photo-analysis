import type {
    AnalysisEmptyStateStep,
    AnalysisEmptyStateBenefit,
} from '@/components/utils/AnalysisEmptyState.vue'

export const adEmptyStateSteps: AnalysisEmptyStateStep[] = [
    {
        number: 1,
        icon: 'pi pi-link',
        title: 'Informe a URL do anúncio',
        description: 'Cole o endereço da imagem do anúncio que deseja analisar.',
    },
    {
        number: 2,
        icon: 'pi pi-cog',
        title: 'Aguarde a análise estratégica',
        description: 'Nossa IA compara o anúncio com o mercado e a concorrência.',
    },
    {
        number: 3,
        icon: 'pi pi-chart-bar',
        title: 'Veja a comparação e as recomendações',
        description: 'Visualize o comparativo de mercado e as sugestões de melhoria.',
    },
]

export const adEmptyStateBenefits: AnalysisEmptyStateBenefit[] = [
    {
        icon: 'pi pi-sitemap',
        title: 'Posicionamento da marca',
        description: 'Como a marca analisada se posiciona em relação ao mercado.',
    },
    {
        icon: 'pi pi-chart-bar',
        title: 'Forças e fraquezas',
        description: 'Pontos fortes e fracos identificados na comparação com concorrentes.',
    },
    {
        icon: 'pi pi-compass',
        title: 'Estratégia sugerida',
        description: 'Posicionamento e mensagem principal recomendados para o anúncio.',
    },
    {
        icon: 'pi pi-lightbulb',
        title: 'Proposta de melhoria',
        description: 'Sugestões práticas de como reformular o anúncio para se destacar.',
    },
]
