import React, { useEffect, useState } from 'react'
import PedidoComponent from './Components/PedidoComponent.tsx'
import styles from './MeusPedidos.module.scss'
import { ClienteDTO, ClienteDTODefaultProps } from '../../DTOs/Cliente.ts'
import { toast } from 'react-toastify'
import { getCustomerByTelephoneNumberAxiosRequest, getPedidoByUserAxiosRequest } from '../../Api/ganajoClient.ts'
import { TextField } from '@mui/material'
import { PedidoDTO } from '../../DTOs/Pedido.ts'

interface MeusPedidosParams {
    isAdmin: boolean
}
  
const MeusPedidos = ({isAdmin} : MeusPedidosParams) => {
  const [telephone, setTelephone] = useState<string>();
    const [showPedidos, setShowPedidos] = useState<boolean>(false);
    const [pedidos, setPedidos] = useState<PedidoDTO[]>([]);
    const [cliente, setCliente] = useState<ClienteDTO>(ClienteDTODefaultProps);

    const localStorageTelephone = 'localStorageTelephone';

    useEffect(() => {
        const telephoneCached = localStorage.getItem(localStorageTelephone);
        setTelephone(telephoneCached ?? '');
    }, [])

    const getClienteByTelephoneNumber = async (telephone : string) => {
        if(telephone === undefined || telephone.length <= 0) {
            toast.error("Informe um telefone válido...", {
                toastId: 'invalid-telephone',
                position: 'top-right',
                autoClose: false,
            });
            return;
        }  

        localStorage.setItem(localStorageTelephone, telephone);

        const customer = await getCustomerByTelephoneNumberAxiosRequest(telephone);
        if(customer === undefined) {
          toast.error("Usuário não encontrado...")
          return;
        }

        setShowPedidos(true);
        setCliente(customer ?? ClienteDTODefaultProps);
    }

    useEffect(() => {
      
      if((isAdmin === false && cliente.id === 0) || isAdmin === undefined)
        return;

      getPedidosByUserAsync(isAdmin, cliente.id);

    }, [cliente, isAdmin])

    const getPedidosByUserAsync = async (isAdmin : boolean, idUser : number | undefined) => {
      const pedidos = await getPedidoByUserAxiosRequest(isAdmin, idUser);
      if(pedidos === undefined) {
        toast.error("Não foi encontrado pedidos para esse usuário...")
        return;
      }

      setPedidos(pedidos);
      setShowPedidos(true);
    }

  return (
    <div className={styles.container}>
      {
        isAdmin ? 
        (
          <div>
            <h1 style={{textAlign: 'center'}}>Meus Pedidos</h1>
            <div style={{display: 'flex', flexDirection:'column', gap: '15px'}}>
            {
                pedidos.map(m => <PedidoComponent key={m.id} Pedido={m} isAdmin={isAdmin}/> )
            }   
            </div>
          </div>
        ) : 
        (
          <div>
            {
              !showPedidos ?
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
              (
                <div>
                  <h1 style={{textAlign: 'center'}}>Meus Pedidos</h1>
                  <div style={{display: 'flex', flexDirection:'column', gap: '15px'}}>
                  {
                      pedidos.map(m => <PedidoComponent key={m.id} Pedido={m} isAdmin={isAdmin}/> )
                  }   
                  </div>
                </div>
              )
            }
          </div>
        )
      }
        
    </div>
  )
}

export default MeusPedidos