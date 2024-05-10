import React, { useCallback, useEffect, useState } from 'react'
import { PedidoDTO } from '../../../DTOs/Pedido.ts'
import styles from './PedidoComponent.module.scss'
import { FormaPagamento } from '../../../DTOs/FormaPagamento.ts';
import { KeyValue } from './../../../DTOs/KeyValue';
import formatValue from '../../../Utils/formatValue.ts';
import { MenuItem, Select } from '@mui/material';
import { StatusPedido } from '../../../DTOs/Status.ts';
import {updateStatusPedido} from '../../../Api/ganajoClient.ts'
import { toast } from 'react-toastify';

interface PedidoProps {
  Pedido : PedidoDTO,
  isAdmin : boolean
}

const PedidoComponent = ({Pedido, isAdmin} : PedidoProps) => {
  const [pedido, setPedido] = useState<PedidoDTO>(Pedido);
  const [pedidoStatus, setPedidoStatus] = useState<number>(pedido.statusPedido);

  const options = [
    {Id: 0, Value: 'Analise' },
    {Id: 1, Value: 'Em Preparo' },
    {Id: 2, Value: 'Saiu Para Entrega' },
    {Id: 3, Value: 'Entregue' },
    {Id: 4, Value: 'Negado' }
  ]

  const changePedidoStatus = async (statusPedido : number) => {
    pedido.statusPedido = statusPedido;
    setPedido(pedido);
    setPedidoStatus(statusPedido);

    const result = await updateStatusPedido(pedido.id, statusPedido);
    if(result) {
      toast.success(`Status do pedido #${pedido.id} foi atualizado para [${options.filter(f => f.Id === pedido.statusPedido).at(0)?.Value}]`)
    }else{
      toast.error(`Erro ao alterar o status do pedido...`);
    }
  }

  function getFormaPagamento(formaPagamento : FormaPagamento){
      if(formaPagamento === FormaPagamento.Cartao)
        return <h1 className={styles.greenStyle}>Cartão</h1>

      if(formaPagamento === FormaPagamento.Dinheiro)
        return <h1 className={styles.greenStyle}>Dinheiro</h1>

      if(formaPagamento === FormaPagamento.Pix)
        return <h1 className={styles.greenStyle}>Pix</h1>

      if(formaPagamento === FormaPagamento.VA)
        return <h1 className={styles.greenStyle}>Vale Alimentação/Refeição</h1>
  }

  return (
    <div className={styles.container}>
        <div className={styles.orderInfo}>
          <div style={{display: 'flex', flexDirection: 'column'}}>
              <img className={styles.imageContainer} alt="Indiano kk" src={pedido.produtos[0].produto?.enderecoImagem}/>
              <h2 className={styles.greenItemStyle}>Pedido #{pedido.id}</h2>
          </div>
          <div>
              <h3 className={styles.primaryColorStyle}>Informações do Cliente</h3>
              <p className={styles.greenItemStyle}>{pedido.cliente.nome}</p>
              <p className={styles.greenItemStyle}>{pedido.cliente.cpf}</p>
              <p className={styles.greenItemStyle}>{pedido.cliente.endereco}</p>
              <p className={styles.greenItemStyle}>{pedido.cliente.complemento}</p>
          </div>
          <div>
            <h3 className={styles.primaryColorStyle}>Bairro</h3>
            <p className={styles.greenItemStyle}>{pedido.cliente.regiaoPostal.bairro}</p>
            <p className={styles.greenItemStyle}>{pedido.cliente.regiaoPostal.cep}</p>
            <p className={styles.greenItemStyle}>{formatValue(pedido.cliente.regiaoPostal.precoDelivery, 2, 'R$')}</p>
          </div>
          <div>
            <h3 className={styles.primaryColorStyle}>Informações do Pedido</h3>
            <div>
              {
                pedido.produtos.map(m => <p key={m.id} className={styles.greenItemStyle}>{m.quantidade}x {m.produto?.nome} - {m.produto?.valor} R$ unidade {m.descricao && `(obs: ${m.descricao})`}</p>)
              }
            </div>
          </div>
          <div>
              <h3 className={styles.primaryColorStyle}>Forma de Pagamento</h3>
              {
                getFormaPagamento(pedido.tipoPagamento)
              }
          </div>
          <div>
            <h3 className={styles.primaryColorStyle}>Valor total</h3>
            <div>
              <h2 className={styles.greenStyle}>{formatValue(pedido.valorTotal, 2, 'R$')}</h2>
            </div>
          </div>
          <div>
            <h3 className={styles.primaryColorStyle}>Status do Pedido</h3>
            <Select
                readOnly={!isAdmin}
                fullWidth
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={pedidoStatus}
                onChange={(e) => {
                  changePedidoStatus(Number(e.target.value));
                }}
                label="Status do pedido"
              >
                <MenuItem value={StatusPedido.Analise}>Analise</MenuItem>
                <MenuItem value={StatusPedido.EmPreparo}>Em Preparo</MenuItem>
                <MenuItem value={StatusPedido.SaiuParaEntrega}>Saiu Para Entrega</MenuItem>
                <MenuItem value={StatusPedido.Entregue}>Entregue</MenuItem>
                <MenuItem value={StatusPedido.Negado}>Negado</MenuItem>
            </Select>
          </div>
        </div>
    </div>
  )
}

export default PedidoComponent