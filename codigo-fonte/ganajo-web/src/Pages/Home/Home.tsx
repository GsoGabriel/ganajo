import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import generateProducts from './data.ts';
import { Produto } from '../../DTOs/Produto.ts';
import { FaMotorcycle } from "react-icons/fa6";
import { Grid } from '@mui/material'; 
import SearchAppBar from '../Components/Inputs/InputSearch.tsx';
import ProductCard from '../Components/Cliente/CardProduto/CardProduto.tsx';
import { ModalMontaPrato } from '../Components/Cliente/CardMontaPrato/CardMontaPrato.tsx';
import { useApi } from '../../Api/useApi.tsx';
import { getProductAxiosConfig, getProductsAxiosConfig } from '../../Api/ganajoClient.ts';

const Home = () => {
  const {isLoading, data} = useApi<Produto[]>(getProductsAxiosConfig())
  const {isLoading : isloading2, data: data2} = useApi<Produto>(getProductAxiosConfig(5))
  const [screenItens, setScreenItems] = useState<Produto[]>();
  const navigate = useNavigate();
  console.log(data2);
  const searchingHandleCallBack = useCallback((value : string) => {
    setScreenItems(data?.filter(f => f.nome.toLowerCase().includes(value.toLowerCase()) || f.descricao.toLowerCase().includes(value.toLowerCase())));
  }, [data]);

  useEffect(() => {
    setScreenItems(data ?? [])
  }, [data])

  return (
    <div className="container"> 
      <div className="deliveryContainer"> 
        <div>
          <FaMotorcycle className="iconTheme"/> 
        </div>
        <div>
          <h1 className="deliveryTime">Tempo médio de preparo: 40 min</h1> 
        </div>
        <div className="inputStyle"> 
            <SearchAppBar onSearch={searchingHandleCallBack} /> 
        </div>
      </div>
      <Grid container spacing={2} className="itemsStyle"> 
        {
          screenItens?.map(m => (
            <Grid key={m.id} item xs={12} sm={6} md={4}>
              <ProductCard product={m}/> 
            </Grid>
          ))
        }
      </Grid>
      </div>
  );
};

export default Home;