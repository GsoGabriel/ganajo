import { ClienteDTO } from "./Cliente";
import { FormaPagamento } from "./FormaPagamento";
import { PedidoProdutoDTO } from "./PedidoProduto";
import { StatusPedido } from "./Status";

export interface PedidoDTO {
    Id : number,
    NomeCliente : string,
    CPF : string,
    Endereco : string,
    Descricao : string,
    FormaPagamento: FormaPagamento,
    Status : StatusPedido,
    Items : PedidoProdutoDTO[],
    Cliente : ClienteDTO,
    ValorTotal : number
}

export const PedidoDTODefaultProps: PedidoDTO = {
    Cliente: {
        id: 0,
        complemento: '',
        cpf: '',
        nome: '',
        numeroCasa: 0,
        numeroTelefone: '',
        regiaoPostal: {
            Id: 0,
            Nome: ''
        }
    },
    CPF: '',
    Descricao: '',
    Endereco: '',
    FormaPagamento: 0,
    Id: 0,
    Items: [],
    NomeCliente: '',
    Status: 0,
    ValorTotal: 0
 }