import { createContext, useContext, useState } from "react";
import React from 'react'
import { ClienteDTO, ClienteDTODefaultProps } from "../DTOs/Cliente.ts";
import { StatusPedido } from "../DTOs/Status.ts";
import { FormaPagamento } from "../DTOs/FormaPagamento.ts";
import { Bairro, BairroDTODefaultProps } from "../DTOs/Bairro.ts";

interface PedidoContextType {
    cliente : ClienteDTO,
    descricao : string,
    valorTotal : number,
    statusPedido : StatusPedido,
    tipoPagamento : FormaPagamento,
    bairro : Bairro,
    setCliente : React.Dispatch<React.SetStateAction<ClienteDTO>>,
    setDescricao : React.Dispatch<React.SetStateAction<string>>,   
    setValorTotal : React.Dispatch<React.SetStateAction<number>>,  
    setStatusPedido : React.Dispatch<React.SetStateAction<StatusPedido>>,  
    setTipoPagamento : React.Dispatch<React.SetStateAction<FormaPagamento>>,
    setBairro : React.Dispatch<React.SetStateAction<Bairro>>,
}

interface PedidoContextProviderProps {
    children : React.ReactNode
}

const pedidoContextDefaultProps : PedidoContextType = {
    cliente: ClienteDTODefaultProps,
    descricao: '',
    valorTotal: 0,
    statusPedido: StatusPedido.Analise,
    tipoPagamento: FormaPagamento.Cartao,
    bairro: BairroDTODefaultProps,
    setCliente: (() => {}),
    setDescricao: (() => {}),
    setValorTotal: (() => {}),
    setStatusPedido: (() => {}),
    setTipoPagamento: (() => {}),
    setBairro: (() => {}),
}

export const PedidoContext = createContext<PedidoContextType>(pedidoContextDefaultProps);

export const PedidoProvider = ({children} : PedidoContextProviderProps) => {
    const [cliente, setCliente] = useState<ClienteDTO>(ClienteDTODefaultProps);
    const [descricao, setDescricao] = useState<string>('');
    const [valorTotal, setValorTotal] = useState<number>(0);
    const [statusPedido, setStatusPedido] = useState<StatusPedido>(StatusPedido.Analise);
    const [tipoPagamento, setTipoPagamento] = useState<FormaPagamento>(FormaPagamento.Cartao);
    const [bairro, setBairro] = useState<Bairro>(BairroDTODefaultProps);

    return <PedidoContext.Provider value={{cliente, descricao, valorTotal, statusPedido, tipoPagamento, bairro, setCliente, setDescricao, setValorTotal, setStatusPedido, setTipoPagamento, setBairro}}>
        {children}
    </PedidoContext.Provider>
}

export const usePedidoContext = () => {
    return useContext(PedidoContext);
}