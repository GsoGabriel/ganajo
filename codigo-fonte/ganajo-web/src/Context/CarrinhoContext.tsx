import { createContext, useContext, useState } from "react";
import React from 'react'
import { PedidoProdutoDTO } from "../DTOs/PedidoProduto";

const pedidoProdutoInitialState :  PedidoProdutoDTO[] = []

interface CarrinhoContextType {
    produtos : PedidoProdutoDTO[],
    setProduto(produto : PedidoProdutoDTO) : void,
    count : number,
    removerProduto(index : number) : void
}

interface CarrinhoContextProviderProps {
    children : React.ReactNode
}

const carrinhoContextInitialState : CarrinhoContextType = {
    produtos: pedidoProdutoInitialState,
    setProduto: (produto => {}),
    count: 0,
    removerProduto: ((index) => {})
}

export const CarrinhoContext = createContext<CarrinhoContextType>(carrinhoContextInitialState);

export const CarrinhoProvider = ({children} : CarrinhoContextProviderProps) => {
    const [produtos, setProdutos] = useState<PedidoProdutoDTO[]>(pedidoProdutoInitialState);
    const [count, setCount] = useState<number>(0);
    const [index, setIndex] = useState<number>(0);

    function pushProdutos(pedidoProduto : PedidoProdutoDTO){
        setIndex(index + 1);
        const newArray = produtos;
        pedidoProduto.id = index;
        newArray.push(pedidoProduto);
        setProdutos(newArray);
        setCount(newArray.length);
    }

    function removerProdutoHandle(index : number){
        const newArray = produtos.filter(f => f.id !== index);
        setProdutos(newArray);
        setCount(newArray.length);
    }

    return <CarrinhoContext.Provider value={{produtos, setProduto: pushProdutos, count, removerProduto: removerProdutoHandle}}>
        {children}
    </CarrinhoContext.Provider>
}

export const useCarrinhoContext = () => {
    return useContext(CarrinhoContext);
}