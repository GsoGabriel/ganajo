import React from 'react'
import styles from './FormaPagamento.module.scss';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { usePedidoContext } from '../../Context/PedidoContext.tsx';
import { FormaPagamento } from '../../DTOs/FormaPagamento.ts';

const FormaPagamentoComponent = () => {

const {tipoPagamento, setTipoPagamento} = usePedidoContext();

  return (
    <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Forma de Pagamento</InputLabel>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={tipoPagamento}
            onChange={(s) => setTipoPagamento(Number(s.target.value))}
            label="Age"
        >
            <MenuItem value={FormaPagamento.Pix}>Pix</MenuItem>
            <MenuItem value={FormaPagamento.Cartao}>Cartão</MenuItem>
            <MenuItem value={FormaPagamento.VA}>VA</MenuItem>
            <MenuItem value={FormaPagamento.Dinheiro}>Dinheiro</MenuItem>
        </Select>
    </FormControl>
  )
}

export default FormaPagamentoComponent