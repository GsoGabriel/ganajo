import React, { useCallback, useEffect, useState } from 'react';
import { Navigate, useNavigate,  } from 'react-router-dom';
import generateProducts from './../Home/data.ts';
import { Produto } from '../../DTOs/Produto.ts';
import './produtos.css'; 
import SearchAppBar from '../Components/Inputs/InputSearch.tsx';
import { useApi } from '../../Api/useApi.tsx';
import { Grid } from '@mui/material';
import ProductCard from '../Components/Cliente/CardProduto/CardProduto.tsx';
import { getProductsAxiosConfig } from '../../Api/ganajoClient.ts';

const ProductsAdmin = () => {

  const {isLoading, data} = useApi<Produto[]>(getProductsAxiosConfig())
  const [screenItens, setScreenItems] = useState<Produto[] | undefined>([]);
  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const navigate = useNavigate();
  const [showAddProducts, setShowAddProducts] = React.useState(false);
  
  const searchingHandleCallBack = useCallback((value : string) => {
    setScreenItems(data?.filter(f => f.nome.toLowerCase().includes(value.toLowerCase()) || f.descricao.toLowerCase().includes(value.toLowerCase())));
  }, [data]);

  useEffect(() => {
    setScreenItems(data ?? []);
  }, [data])

  const handleAddNewProduct = () => {
    navigate('/addProdutos')
  };

  const handleEditProduct = (productId: number) => {
    setEditingItemId(productId);
  };

  const handleSaveProduct = (editedProduct: Produto) => {
    console.log('Produto editado:', editedProduct);
    setEditingItemId(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
  };

  return (
    <div className="container"> 
      <div className="deliveryContainer"> 
        <div className="inputStyle"> 
          <SearchAppBar onSearch={searchingHandleCallBack} /> 
        </div>
        <div className="buttonContainer">
          <button className="addButton" onClick={handleAddNewProduct}>Adicionar Novo Produto</button>
        </div>
      </div>
      {
        isLoading ? <div>Is Loading...</div> : 
        <Grid container spacing={2} className="itemsStyle"> 
        {
          screenItens?.map(m => (
            <Grid key={m.id} item xs={12} sm={6} md={4}>
              <ProductCard product={m}/> 
            </Grid>
          ))
        }
      </Grid>
      }
    </div>
  );
};

export default ProductsAdmin;
