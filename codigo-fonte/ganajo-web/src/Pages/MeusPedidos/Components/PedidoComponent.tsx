import React, { useCallback, useEffect, useState } from 'react'
import { PedidoDTO } from '../../../DTOs/Pedido.ts'
import styles from './PedidoComponent.module.scss'
import { FormaPagamento } from '../../../DTOs/FormaPagamento.ts';
import { KeyValue } from './../../../DTOs/KeyValue';
import formatValue from '../../../Utils/formatValue.ts';
import { Card, CardActionArea, CardContent, CardMedia, Grid, MenuItem, Paper, Select, Typography } from '@mui/material';
import { StatusPedido } from '../../../DTOs/Status.ts';
import { updateStatusPedido } from '../../../Api/ganajoClient.ts'
import { toast } from 'react-toastify';

interface PedidoProps {
  Pedido: PedidoDTO,
  isAdmin: boolean
}

const PedidoComponent = ({ Pedido, isAdmin }: PedidoProps) => {
  const [pedido, setPedido] = useState<PedidoDTO>(Pedido);
  const [pedidoStatus, setPedidoStatus] = useState<number>(Pedido.statusPedido);
  
  useEffect(() => {
    setPedidoStatus(Pedido.statusPedido)
  }, [pedido, Pedido])

  const options = [
    { Id: 0, Value: 'Analise' },
    { Id: 1, Value: 'Em Preparo' },
    { Id: 2, Value: 'Saiu Para Entrega' },
    { Id: 3, Value: 'Entregue' },
    { Id: 4, Value: 'Negado' }
  ]

  const changePedidoStatus = async (statusPedido: number) => {
    pedido.statusPedido = statusPedido;
    setPedido(pedido);
    setPedidoStatus(statusPedido);

    const result = await updateStatusPedido(pedido.id, statusPedido);
    if (result) {
      toast.success(`Status do pedido #${pedido.id} foi atualizado para [${options.filter(f => f.Id === pedido.statusPedido).at(0)?.Value}]`)
    } else {
      toast.error(`Erro ao alterar o status do pedido...`);
    }
  }

  function getFormaPagamento(formaPagamento: FormaPagamento) {
    if (formaPagamento === FormaPagamento.Cartao)
      return <Typography>Cartão</Typography>

    if (formaPagamento === FormaPagamento.Dinheiro)
      return <Typography>Dinheiro</Typography>

    if (formaPagamento === FormaPagamento.Pix)
      return <Typography>Pix</Typography>

    if (formaPagamento === FormaPagamento.VA)
      return <Typography>Vale Alimentação/Refeição</Typography>
  }

  return (
    <Card sx={{ maxWidth: 400 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={pedido.produtos[0].produto?.enderecoImagem}
          alt="ui ui ui"
        />
        <CardContent>
          <Typography className={styles.title} style={{fontSize: '1.2em'}}>
            Informações do Cliente
          </Typography>
          <Typography>{pedido.cliente.nome}</Typography>
          <Typography>{pedido.cliente.cpf}</Typography>
          <Typography>{pedido.cliente.endereco}</Typography>
          <Typography>{pedido.cliente.complemento}</Typography>
          <Typography className={styles.title} style={{fontSize: '1.2em'}}>
            Bairro
          </Typography>
          <Typography>{pedido.cliente.regiaoPostal.bairro}</Typography>
          <Typography>{pedido.cliente.regiaoPostal.cep}</Typography>
          <Typography>{formatValue(pedido.cliente.regiaoPostal.precoDelivery, 2, 'R$')}</Typography>

          <Typography className={styles.title} style={{fontSize: '1.2em'}}>
            Informações do Pedido
          </Typography>
          {
            pedido.produtos.map(m => <Typography key={m.id}>{m.quantidade}x {m.produto?.nome} - {m.produto?.valor} R$ unidade {m.descricao && `(obs: ${m.descricao})`}</Typography>)
          }
          <Typography className={styles.title} style={{fontSize: '1.2em'}}>
            Forma de Pagamento
          </Typography>
          {
            getFormaPagamento(pedido.tipoPagamento)
          }
          <Typography className={styles.title} style={{fontSize: '1.2em'}}>
            Valor total
          </Typography>
          <Typography>{formatValue(pedido.valorTotal, 2, 'R$')}</Typography>
          <Typography className={styles.title} style={{fontSize: '1.2em'}}>
            Status do Pedido
          </Typography>
          <Select
            IconComponent={() => null}
            readOnly={!isAdmin}
            fullWidth
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={pedidoStatus}
            onChange={(e) => {
              changePedidoStatus(Number(e.target.value));
            }}
            label="Status do pedido"
          >
            <MenuItem value={StatusPedido.Analise}>Análise</MenuItem>
            <MenuItem value={StatusPedido.EmPreparo}>Em Preparo</MenuItem>
            <MenuItem value={StatusPedido.SaiuParaEntrega}>Saiu Para Entrega</MenuItem>
            <MenuItem value={StatusPedido.Entregue}>Entregue</MenuItem>
            <MenuItem value={StatusPedido.Negado}>Negado</MenuItem>
          </Select>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default PedidoComponent