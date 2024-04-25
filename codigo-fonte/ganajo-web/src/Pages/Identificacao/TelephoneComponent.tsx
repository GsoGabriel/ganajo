import { TextField } from '@mui/material'
import React, { useState } from 'react'
import styles from './TelephoneComponent.module.scss'
import { useLocation, useNavigate } from 'react-router-dom';
import { useApi } from '../../Api/useApi.tsx';
import {  getCustomerByTelephoneNumberAxiosRequest } from '../../Api/ganajoClient.ts';
import { toast } from 'react-toastify';
import { ClienteDTO } from './../../DTOs/Cliente';

const TelephoneComponent = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const goToAfterAuth = location.state as {openAfter : string};
    const [telephone, setTelephone] = useState<string>()


    const goTo = (path : string, cliente: ClienteDTO | undefined) => {
        navigate(path, {state: cliente});
    }

    const getClienteByTelephoneNumber = async (telephone : string) => {
        if(telephone === undefined || telephone.length <= 0){
            toast.error("Informe um telefone válido...", {
                toastId: 'invalid-telephone',
                position: 'top-right',
                autoClose: false,
              });
            return;
        }  

        const customer = await getCustomerByTelephoneNumberAxiosRequest(telephone);
        if(customer !== undefined) {
            goTo(goToAfterAuth.openAfter, customer);
        }
    }

    return (
        <div className={styles.container}>
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
        </div>
    )
}

export default TelephoneComponent