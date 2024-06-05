import React, { useCallback, useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import generateProducts from './../Home/data.ts';
import { Produto } from '../../DTOs/Produto.ts';
import './produtos.css';
import SearchAppBar from '../Components/Inputs/InputSearch.tsx';
import { useApi } from '../../Api/useApi.tsx';
import { CircularProgress, Grid } from '@mui/material';
import ProductCard from '../Components/Cliente/CardProduto/CardADM.tsx';
import { getProductsAxiosConfig, updateProductAxiosConfig } from '../../Api/ganajoClient.ts';
import axios from 'axios';

const ProductsAdmin = () => {
  const { isLoading, data } = useApi<Produto[]>(getProductsAxiosConfig());
  const [screenItens, setScreenItems] = useState<Produto[] | undefined>([]);
  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const [editedProduct, setEditedProduct] = useState<Produto | null>(null);
  const navigate = useNavigate();
  
  const searchingHandleCallBack = useCallback((value: string) => {
    setScreenItems(data?.filter(f => f.nome.toLowerCase().includes(value.toLowerCase()) || f.descricao.toLowerCase().includes(value.toLowerCase())));
  }, [data]);

  useEffect(() => {
    setScreenItems(data ?? []);
  }, [data]);

  const handleAddNewProduct = () => {
    navigate('/addProdutos');
  };

  const handleEditProduct = (productId: number) => {
    const productToEdit = data?.find(p => p.id === productId) || null;
    setEditingItemId(productId);
    setEditedProduct(productToEdit);
  };

  const handleSaveProduct = async (editedProduct: Produto) => {
    try {
      const response = await axios(updateProductAxiosConfig(editedProduct));
      console.log('Produto editado:', response.data);
      setEditingItemId(null);
      setEditedProduct(null);
      // Atualiza a lista de produtos após a edição
      const updatedData = data?.map(p => (p.id === editedProduct.id ? editedProduct : p));
      setScreenItems(updatedData);
    } catch (error) {
      console.error('Erro ao editar o produto:', error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Implementar lógica para lidar com a mudança de imagem
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
      <div className="products">
        {isLoading ? <CircularProgress size={'10rem'} /> :
          screenItens?.map(m => (
            <ProductCard 
              key={m.id}
              product={m}
              onEdit={() => handleEditProduct(m.id)}
              onSave={handleSaveProduct}
              isEditing={editingItemId === m.id}
              editedProduct={editedProduct}
              onImageChange={handleImageChange}
            />
          ))
        }
      </div>
    </div>
  );
};

export default ProductsAdmin;
