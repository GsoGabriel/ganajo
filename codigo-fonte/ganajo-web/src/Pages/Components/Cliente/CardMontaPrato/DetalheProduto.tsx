import React, { useEffect, useState } from 'react';
import { Produto } from '../../../../DTOs/Produto.ts';
import styles from './DetalheProdutoComponent.module.scss';
import formatValue from '../../../../Utils/formatValue.ts';
import formatStringLimit from '../../../../Utils/formatStringLimit.ts';
import ButtonClose from '../../Buttons/Fechar/Fechar.tsx';
import {
    Unstable_NumberInput as BaseNumberInput
  } from '@mui/base/Unstable_NumberInput';
import { PedidoProdutoDTO } from './../../../../DTOs/PedidoProduto';
import {StyledInputElement, StyledInputRoot, StyledButton} from '../../CustomStyles/NumberSelectorStyles.ts';
import { useCarrinhoContext } from '../../../../Context/CarrinhoContext.tsx';

interface DetalheProdutoComponentProps {
    Produto: Produto,
    onClose: () => void
}

export const DetalheProdutoComponent = ({ Produto, onClose }: DetalheProdutoComponentProps) => {

    const pedidoProdutoInitialState = {
        id: 0,
        pedidoId: 0,
        produto: Produto,
        quantidade: 1,
        valorTotal: 0,
        descricao: ''
    }

    const {setProduto} = useCarrinhoContext();
    const [pedidoProduto, setPedidoProduto] = useState<PedidoProdutoDTO>(pedidoProdutoInitialState)

    const [quantidade, setQuantidade] = useState(1);
    const [valorTotal, setValorTotal] = useState(Produto.valor);
    const [descricao, setDescricao] = useState('');

    useEffect(() => {
        setValorTotal(Produto.valor * quantidade);
    }, [Produto.valor, quantidade])

    useEffect(() => {
        setPedidoProduto({
            id: 0,
            pedidoId: 0,
            produto: Produto,
            quantidade: quantidade,
            valorTotal: valorTotal,
            descricao: descricao
        })
    }, [Produto, Produto.valor, descricao, quantidade, valorTotal])

    const adicionarProdutoCarrinhoCallBack = () => {
        setProduto(pedidoProduto);
        onClose();
    };

    return (
        <div className={styles.modalBackground}>
            <div className={styles.container}>
                <div className={styles.leftColumn}>
                    <img className={styles.imgDetalhe} src={Produto.enderecoImagem} alt={Produto.nome} />
                    <h1 className={styles.nomeStyle}>{formatStringLimit(Produto.nome, 0, 70, "...")}</h1>
                    <h3 className={styles.descricaoStyle}>{formatStringLimit(Produto.descricao, 0, 999, "...")}</h3>
                </div>
                <div className={styles.rightColumn}>
                    <div className={styles.quantidadeContainerStyle}>
                        <h2>Valor Unidade: {formatValue(Produto.valor, 2, "R$")}</h2>
                    </div>
                    <div>
                        <h3 className={styles.descricaoStyle}>Aqui você pode adicionar a quantidade desse produto e adicionar uma observação para atendermos melhor seus gostos!</h3>
                    </div>
                    <div className={styles.quantidadeContainerStyle}>
                        <h2>Selecione a quantidade:</h2>
                        <BaseNumberInput
                            min={1}
                            max={20}
                            slots={{
                                root: StyledInputRoot,
                                input: StyledInputElement,
                                incrementButton: StyledButton,
                                decrementButton: StyledButton,
                            }}
                            slotProps={{
                                incrementButton: {
                                children: '▴',
                                },
                                decrementButton: {
                                children: '▾',
                                },
                            }} value={quantidade} onChange={(event, value) => setQuantidade(value ?? 1)}
                        />
                    </div>
                    <div className={styles.quantidadeContainerStyle}>
                        <h2>Valor Total: {formatValue(valorTotal, 2, "R$")}</h2>
                    </div>
                    <div className={styles.observacaoItem}>
                        <input type="text" value={descricao} onChange={(e) => setDescricao(e.target.value)} className={styles.inputObservacao} placeholder="Adicione uma observação" />
                    </div>
                    <div>
                        <button className={styles.buttonPedir} onClick={() => adicionarProdutoCarrinhoCallBack()}>Adicionar ao carrinho</button>
                    </div>
                    <div className={styles.buttonClose}>
                        <ButtonClose onClick={onClose} />
                    </div>
                </div>
            </div>
        </div>
    )
}

