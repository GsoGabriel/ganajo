import React, { useState } from 'react';
import { usePedidoContext } from '../../Context/PedidoContext.tsx';
import { TextField } from '@mui/material';

const EnderecoFormulario = () => {

    const {cliente, setCliente}= usePedidoContext();

    const [nome, setNome] = useState<string>(cliente.nome);
    const [cpf, setCpf] = useState<string>(cliente.cpf);
    const [numeroCasa, setNumeroCasa] = useState<string>(cliente.numeroCasa);
    const [complemento, setComplemento] = useState<string>(cliente.complemento ?? '');
    const [numeroTelefone, setNumeroTelefone] = useState<string>(cliente.numeroTelefone);

  return (
    <div>
        <TextField
            autoFocus
            margin="dense"
            label="Nome completo"
            value={nome}
            onChange={(e) => {
                const updateCLiente = cliente;
                updateCLiente.nome = e.target.value;
                setCliente(updateCLiente);
                setNome(e.target.value)
            }}
            fullWidth
        />
        <TextField
            autoFocus
            margin="dense"
            label="CPF"
            value={cpf}
            onChange={(e) => {
                const updateCLiente = cliente;
                updateCLiente.cpf = e.target.value;
                setCliente(updateCLiente);
                setCpf(e.target.value)
            }}
            fullWidth
        />
        <TextField
            autoFocus
            margin="dense"
            label="Numero da casa"
            type='number'
            value={numeroCasa}
            onChange={(e) => {
                const updateCLiente = cliente;
                updateCLiente.numeroCasa = e.target.value;
                setCliente(updateCLiente);
                setNumeroCasa(e.target.value)
            }}
            fullWidth
        />
        <TextField
            autoFocus
            margin="dense"
            label="Complemento"
            value={complemento}
            onChange={(e) => {
                const updateCLiente = cliente;
                updateCLiente.complemento = e.target.value;
                setCliente(updateCLiente);
                setComplemento(e.target.value)
            }}
            fullWidth
        />
        <TextField
            autoFocus
            margin="dense"
            value={numeroTelefone}
            label="Numero de telefone"
            onChange={(e) => {
                const updateCLiente = cliente;
                updateCLiente.numeroTelefone = e.target.value;
                setCliente(updateCLiente);
                setNumeroTelefone(e.target.value)
            }}
            fullWidth
        />
    </div>
  )
}

export default EnderecoFormulario