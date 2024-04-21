import { Produto } from "./Produto";

export interface PedidoProdutoDTO {
    id: number;
    pedidoId: number;
    produto: Produto | null;
    descricao: string | null;
    quantidade: number | null;
    valorTotal: number;
}