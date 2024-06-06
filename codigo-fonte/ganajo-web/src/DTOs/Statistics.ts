export interface StatisticsDTO {
    vendas: number;
    vendasTotal: number;
    topCategorias: Statistic[];
    topStatusPedidos: Statistic[];
    topProdutos: Statistic[];
    qtdClientes: number;
    qtdBairros: number;
    qtdProdutos: number;
    precoMedio: number;
}

export interface Statistic {
    id: number;
    key: string;
    value: string;
}

export interface StatisticChart {
    id: number,
    value: string;
    label: string
}