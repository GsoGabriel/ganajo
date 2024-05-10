import { ClienteDTO } from "./Cliente";
import { FormaPagamento } from "./FormaPagamento";
import { PedidoProdutoDTO } from "./PedidoProduto";
import { StatusPedido } from "./Status";

export interface PedidoDTO {
    id: number;
    descricao: string | null;
    valorTotal: number;
    statusPedido: StatusPedido;
    tipoPagamento: FormaPagamento;
    removido: boolean;
    cliente: ClienteDTO;
    produtos: PedidoProdutoDTO[];
}

export const PedidoDTODefaultProps: PedidoDTO = {
    cliente: {
        id: 0,
        complemento: '',
        cpf: '',
        nome: '',
        numeroCasa: '',
        numeroTelefone: '',
        endereco: '',
        regiaoPostal: {
            id: 0,
            bairro: '',
            cep: '',
            editadoData: '',
            editadoPor: 1,
            precoDelivery: 0,
        }
    },
    descricao: '',
    tipoPagamento: 0,
    id: 0,
    produtos: [],
    statusPedido: 0,
    valorTotal: 0,
    removido: false
 }