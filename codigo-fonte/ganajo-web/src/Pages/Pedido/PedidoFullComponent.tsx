import { Accordion, AccordionDetails, AccordionSummary, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import styles from './PedidoFullComponent.module.scss'
import {  getCustomerByTelephoneNumberAxiosRequest } from '../../Api/ganajoClient.ts';
import { toast } from 'react-toastify';
import { ClienteDTO, ClienteDTODefaultProps } from '../../DTOs/Cliente.ts';
import EscolherBairro from './EscolherBairro.tsx';
import { usePedidoContext } from '../../Context/PedidoContext.tsx';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import EnderecoFormulario from './EnderecoFormulario.tsx';
import FormaPagamentoComponent from './FormaPagamentoComponent.tsx';
import CarrinhoComponent from '../CarrinhoCompras/CarrinhoComponent.tsx';

const PedidoFullComponent = () => {
    const {setCliente} = usePedidoContext();
    const [telephone, setTelephone] = useState<string>();
    const [customer, setCustomer] = useState<ClienteDTO>();
    const [showFormulario, setShowFormulario] = useState<boolean>(false);
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
                    (<div className={styles.containerEtapas}>
                        <Accordion>
                            <AccordionSummary expandIcon={<ArrowDownwardIcon />}>
                                <h4>Etapa 1 - Escolha seu Bairro</h4>
                            </AccordionSummary>
                            <AccordionDetails>
                                <EscolherBairro bairro={customer?.regiaoPostal}/>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary expandIcon={<ArrowDownwardIcon />}>
                                <h4>Etapa 2 - Confirme as informações de endereço</h4>
                            </AccordionSummary>
                            <AccordionDetails>
                                <EnderecoFormulario />
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary expandIcon={<ArrowDownwardIcon />}>
                                <h4>Etapa 3 - Forma de Pagamento</h4>
                            </AccordionSummary>
                            <AccordionDetails>
                                <FormaPagamentoComponent />
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary expandIcon={<ArrowDownwardIcon />}>
                                <h4>Etapa 4 - Informações do pedido</h4>
                            </AccordionSummary>
                            <AccordionDetails>
                                <CarrinhoComponent />
                            </AccordionDetails>
                        </Accordion>
                    </div>)
            }   
        </div>
        
    )
}

export default PedidoFullComponent