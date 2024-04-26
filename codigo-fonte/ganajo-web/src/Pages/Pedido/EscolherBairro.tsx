import React, { useEffect, useState } from 'react'
import { useApi } from '../../Api/useApi.tsx';
import {  getBairrosAxiosConfig } from '../../Api/ganajoClient.ts';
import { Bairro } from '../../DTOs/Bairro.ts';
import { Autocomplete, CircularProgress, Select, TextField } from '@mui/material';
import styles from './EscolherBairro.module.scss'
import { usePedidoContext } from '../../Context/PedidoContext.tsx';

interface BairroCompleteOption {
    label: string,
    bairro: Bairro
}

const defaultBairroProp : Bairro = {
    bairro: '',
    cep: '',
    editadoData: '',
    editadoPor: 0, 
    id: 0,
    precoDelivery: 0
}

const defaultBairroAutoCompleteProp : BairroCompleteOption = {
    bairro: defaultBairroProp,
    label: ''
}

interface EscolherBairroProps {
    bairro : Bairro | undefined
}

const convertBairroToAutoCompleteBairroProp = (bairro: Bairro) => {
    const bairroAutoComplete : BairroCompleteOption = {
        bairro: bairro,
        label: bairro.bairro
    }
    return bairroAutoComplete;
}

const EscolherBairro = ({bairro} : EscolherBairroProps) => {
    const {setBairro} = usePedidoContext();
    const {data, isLoading} = useApi<Bairro[]>(getBairrosAxiosConfig())
    const [bairrosAutoComplete, setBairrosAutoComplete] = useState<BairroCompleteOption[]>([]);
    const [selectedBairro, setSelectedBairro] = useState<BairroCompleteOption>(convertBairroToAutoCompleteBairroProp(bairro ?? defaultBairroProp));
    console.log()
    useEffect(() => {
        setBairrosAutoComplete(data?.map(m => convertBairroToAutoCompleteBairroProp(m)) ?? []);
    }, [data])

    const handleSelectedBairro = (bairro : BairroCompleteOption) => {
        setSelectedBairro(bairro);
        setBairro(bairro.bairro);
    }

  return (
    <div className={styles.primaryContainer}>
        {
            isLoading ? <CircularProgress size={'10rem'}/> :
            (
                <div className={styles.container}>
                    <h1>Confirme seu bairro</h1>
                    <h4>Você pode escolher um dos bairros disponiveis abaixo para o delivery :D</h4>
                    <Autocomplete
                        className={styles.autoCompleteInput}
                        disablePortal
                        value={selectedBairro}
                        onChange={(e, o) => handleSelectedBairro(o ?? defaultBairroAutoCompleteProp)}
                        id="combo-box-demo"
                        options={bairrosAutoComplete}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Escolha seu Bairro" />}
                    />
                </div>
                
            )
        }
    </div>
  )
}

export default EscolherBairro