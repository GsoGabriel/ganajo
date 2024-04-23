import styles from './Carrinho.module.scss';
import React, { useEffect, useState } from 'react';
import { useCarrinhoContext } from '../../Context/CarrinhoContext.tsx';
import ProdutoCarrinho from './ProdutoCarrinho/ProdutoCarrinho.tsx';
import { Pedido } from '../../DTOs/Pedido.ts';
import formatValue from '../../Utils/formatValue.ts';
import { Button, List, TextField } from '@mui/material';

const CarrinhoComponent = () => {

    const {produtos, removerProduto} = useCarrinhoContext();


    const [pedido, setPedido] = useState<Pedido>();
    const [descricao, setDescricao] = useState<string>('');
    const [valorTotal, setValorTotal] = useState<number>(0);

    useEffect(() => {
        const sum = produtos.reduce((partialSum, a) => partialSum + a.valorTotal, 0);
        setValorTotal(sum)
    }, [produtos, setValorTotal])

    const removeProductHandler = (index : number) => {
        removerProduto(index);
    }

    return (
        <div className={styles.container}>
            <h1>Meu Carrinho - Produtos</h1>
            {
                produtos.length > 0 ? 
                (
                    <div>
                        <List sx={{ mb: 2 }} className={styles.produtos}>
                        {
                        produtos.map(p => 
                            <ProdutoCarrinho pedidoProduto={p} removeHandle={removeProductHandler}/>
                            )
                        }
                        </List>
                        <div className={styles.pedidoInfo}>
                            <div className={styles.observacaoItem}>
                                <input type="text" value={descricao} onChange={(e) => setDescricao(e.target.value)} className={styles.inputObservacao} placeholder="Adicione uma observação ao pedido" />
                            </div>
                            <h1>Valor total: {formatValue(valorTotal, 2, "R$")}</h1>
                            <Button className={styles.buttonPedir}>Prosseguir</Button>
                        </div>
                    </div>
                ) : <h3>Não há produtos em seu carrinho :(</h3>
            }
            
        </div> 
    );
}

export default CarrinhoComponent