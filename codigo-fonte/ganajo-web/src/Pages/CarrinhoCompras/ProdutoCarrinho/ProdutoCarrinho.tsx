import React from 'react'
import { PedidoProdutoDTO } from '../../../DTOs/PedidoProduto'
import styles from './ProdutoCarrinho.module.scss'
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import formatValue from '../../../Utils/formatValue.ts';
import ButtonClose from './../../Components/Buttons/Fechar/Fechar.tsx';

interface ProdutoCarrinhoProps {
  pedidoProduto : PedidoProdutoDTO;
  removeHandle(index : number): void
}

const ProdutoCarrinho = ({pedidoProduto, removeHandle} : ProdutoCarrinhoProps) => {
  return (
    <div className={styles.container}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ArrowDownwardIcon />}>
            <h4 style={{fontSize:'1.2rem', margin: 0, padding: 0}}>{pedidoProduto.produto?.nome} - {formatValue(pedidoProduto.valorTotal, 2, "R$")}</h4>
          </AccordionSummary>
          <AccordionDetails>
          <div className={styles.produtoInfo}>
            <div style={{display: 'flex', flexDirection: 'column', textAlign: 'start'}}>
              <p>Quantidade: {pedidoProduto.quantidade}x</p>
              <p>Valor unitário: {formatValue(pedidoProduto.produto?.valor ?? 1, 2, "R$")}</p>
              <p>Valor total: {formatValue(pedidoProduto.valorTotal, 2, "R$")}</p>
              {
                pedidoProduto.descricao?.length !== undefined && pedidoProduto.descricao?.length > 0 && (<p>"{pedidoProduto.descricao}"</p>)
              }
              
            </div>
            <div>
              <ButtonClose onClick={() => removeHandle(pedidoProduto.id)}/>
            </div>
          </div>
          </AccordionDetails>
        </Accordion>
    </div>
  )
}

export default ProdutoCarrinho