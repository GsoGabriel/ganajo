import { TextField } from '@mui/material'
import React, { useState } from 'react'
import styles from './PedidoFullComponent.module.scss'
import {  getCustomerByTelephoneNumberAxiosRequest } from '../../Api/ganajoClient.ts';
import { toast } from 'react-toastify';
import { ClienteDTO, ClienteDTODefaultProps } from '../../DTOs/Cliente.ts';
import EscolherBairro from './EscolherBairro.tsx';
import { usePedidoContext } from '../../Context/PedidoContext.tsx';

const PedidoFullComponent = () => {
    const {setCliente} = usePedidoContext();
    const [telephone, setTelephone] = useState<string>();
    const [customer, setCustomer] = useState<ClienteDTO>();
    const [showFormulario, setShowFormulario] = useState<boolean>(false);

    const getClienteByTelephoneNumber = async (telephone : string) => {
        if(telephone === undefined || telephone.length <= 0) {
            toast.error("Informe um telefone válido...", {
                toastId: 'invalid-telephone',
                position: 'top-right',
                autoClose: false,
              });
            return;
        }  

        const customer = await getCustomerByTelephoneNumberAxiosRequest(telephone);
        if(customer === undefined) {
          toast.info("Cadastre um novo usuário :D")
        }

        setShowFormulario(true);
        setCustomer(customer);
        setCliente(customer ?? ClienteDTODefaultProps);
    }
    return (
        <div className={styles.pedidoContainer}>
            {
                !showFormulario ?
                    (<div className={styles.identificacaoContainer}>
                        <h1>Informe seu número de telefone</h1>
                        <TextField className={styles.textField}
                        placeholder='ex: 31999999999'
                        id="outlined-number"
                        type="number"
                        value={telephone}
                        onChange={(e) => setTelephone(e.target.value)}
                        InputLabelProps={{
                            shrink: false,
                        }}
                        />
                        <button className={styles.buttonPedir} onClick={() => {getClienteByTelephoneNumber(telephone ?? '')}}>Prosseguir</button>
                    </div>)
                    :
                    (<div>
                        <EscolherBairro bairro={customer?.regiaoPostal}/>
                    </div>)
            }   
        </div>
        
    )
}

export default PedidoFullComponent