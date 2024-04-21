import { FormaPagamento } from "./FormaPagamento";
import { PedidoProdutoDTO } from "./PedidoProduto";
import { StatusPedido } from "./Status";

export interface Pedido {
    Id : number,
    NomeCliente : string,
    CPF : string,
    Endereco : string,
    FormaPagamento: FormaPagamento,
    Status : StatusPedido,
    Items : PedidoProdutoDTO[],
    ValorTotal : number
}