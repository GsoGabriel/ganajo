import React, { useCallback, useEffect, useState } from 'react';
import { Produto } from '../../DTOs/Produto.ts';
import { CircularProgress, Grid } from '@mui/material'; 
import SearchAppBar from '../Components/Inputs/InputSearch.tsx';
import ProductCard from '../Components/Cliente/CardProduto/CardProduto.tsx';
import { useApi } from '../../Api/useApi.tsx';
import {  getProductsAxiosConfig } from '../../Api/ganajoClient.ts';
import { useAdminContext } from '../../Context/AdminContext.tsx';
import styles from './Home.module.scss'

const Home = () => {
  const {data, isLoading} = useApi<Produto[]>(getProductsAxiosConfig())
  const {setAdminInStorage} = useAdminContext();
  const [screenItens, setScreenItems] = useState<Produto[]>();
  const searchingHandleCallBack = useCallback((value : string) => {
    setScreenItems(data?.filter(f => f.nome.toLowerCase().includes(value.toLowerCase()) || f.descricao.toLowerCase().includes(value.toLowerCase())));
  }, [data]);
  
  useEffect(() => {
    setScreenItems(data ?? [])
    setAdminInStorage(undefined);
  }, [data, setAdminInStorage])

  return (
    <div className="container"> 
      <div className="deliveryContainer"> 
        <div className="inputStyle"> 
            <SearchAppBar onSearch={searchingHandleCallBack} /> 
        </div>
      </div>
      <div className={styles.products}>
      {
        isLoading ? <CircularProgress size={'10rem'} /> :
        screenItens?.map(m => (
            <ProductCard product={m}/> 
        ))
      }
      </div>
    </div>
  );
};

export default Home;