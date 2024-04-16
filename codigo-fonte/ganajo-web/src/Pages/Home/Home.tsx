import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import generateProducts from './data.ts';
import { Produto } from '../../DTOs/Produto.ts';
import { FaMotorcycle } from "react-icons/fa6";
import { Grid } from '@mui/material'; 
import SearchAppBar from '../Components/Inputs/InputSearch.tsx';
import ProductCard from '../Components/Cliente/CardProduto/CardProduto.tsx';


const Home = () => {
  const [itens, setItems] = useState<Produto[]>();
  const [screenItens, setScreenItems] = useState<Produto[]>();
  const navigate = useNavigate();

  const searchingHandleCallBack = useCallback((value : string) => {
    setScreenItems(itens?.filter(f => f.Nome.toLowerCase().includes(value.toLowerCase()) || f.Descricao.toLowerCase().includes(value.toLowerCase())));
  }, [itens]);

  useEffect(() => {
    const mockItens = generateProducts();
    setItems(mockItens);
    setScreenItems(mockItens);
  }, []);

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
            <Grid key={m.Id} item xs={12} sm={6} md={4}>
              <ProductCard nome={m.Nome} descricao={m.Descricao} imagem={m.Imagem} preco={m.Valor}/> 
            </Grid>
          ))
        }
      </Grid>
      </div>
  );
};

export default Home;
