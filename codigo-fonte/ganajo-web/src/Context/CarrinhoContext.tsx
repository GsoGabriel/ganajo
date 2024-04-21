import { createContext, useContext, useState } from "react";
import React from 'react'
import { PedidoProdutoDTO } from "../DTOs/PedidoProduto";

const pedidoProdutoInitialState :  PedidoProdutoDTO[] = []

interface CarrinhoContextType {
    produtos : PedidoProdutoDTO[],
    setProduto(produto : PedidoProdutoDTO) : void,
    count : number
}

interface CarrinhoContextProviderProps {
    children : React.ReactNode
}

const carrinhoContextInitialState : CarrinhoContextType = {
    produtos: pedidoProdutoInitialState,
    setProduto: (produto => {}),
    count: 0
}

export const CarrinhoContext = createContext<CarrinhoContextType>(carrinhoContextInitialState);

export const CarrinhoProvider = ({children} : CarrinhoContextProviderProps) => {
    const [produtos, setProdutos] = useState<PedidoProdutoDTO[]>(pedidoProdutoInitialState);
    const [count, setCount] = useState<number>(0);


    function pushProdutos(produto : PedidoProdutoDTO){
        const newArray = produtos;
        newArray.push(produto);
        setProdutos(newArray);

        setCount(newArray.length);
    }

    return <CarrinhoContext.Provider value={{produtos, setProduto: pushProdutos, count}}>
        {children}
    </CarrinhoContext.Provider>
}

export const useCarrinhoContext = () => {
    return useContext(CarrinhoContext);
}