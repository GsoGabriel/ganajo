import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Produto } from '../../DTOs/Produto';
import './produtos.css';
import SearchAppBar from '../Components/Inputs/InputSearch.tsx';
import { useApi } from '../../Api/useApi.tsx';
import { CircularProgress, Modal, Box } from '@mui/material';
import ProductCard from '../Components/Cliente/CardProduto/CardADM.tsx';
import { getProductsAxiosConfig, updateProductAxiosConfig } from '../../Api/ganajoClient.ts';
import axios from 'axios';
import EditProductForm from '../Components/Cliente/CardProduto/EditProductForm.tsx';
import DeleteProductForm from '../Components/Cliente/CardProduto/DeleteProductForm.tsx';

const ProductsAdmin = () => {
  const { isLoading, data } = useApi<Produto[]>(getProductsAxiosConfig());
  const [screenItens, setScreenItems] = useState<Produto[] | undefined>([]);
  const [editedProduct, setEditedProduct] = useState<Produto | null>(null);
  const [deleteProduct, setDeleteProduct] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteProductModalOpen, setIsDeleteProductModalOpen] = useState(false);
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
    setEditedProduct(productToEdit);
    setIsModalOpen(true);
  };

  const handleSaveProduct = async (editedProduct: Produto) => {
    try {
      const response = await axios(updateProductAxiosConfig(editedProduct));
      console.log('Produto editado:', response.data);
      setEditedProduct(null);
      setIsModalOpen(false);
      // Atualiza a lista de produtos após a edição
      const updatedData = data?.map(p => (p.id === editedProduct.id ? editedProduct : p));
      setScreenItems(updatedData);
    } catch (error) {
      console.error('Erro ao editar o produto:', error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditedProduct(null);
  };

  const handleCloseDeleteProductModal = () => {
    setDeleteProduct(false);
  };

  const handleDeleteProduct = () => {
    setDeleteProduct(true);
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
            />
          ))
        }
      </div>
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="edit-form-container">
          {editedProduct && (
            <EditProductForm
              product={editedProduct}
              onSave={handleSaveProduct}
              onClose={handleCloseModal}
              onDelete={handleDeleteProduct}
            />
          )}
        </Box>
      </Modal>
      <Modal
        open={isDeleteProductModalOpen}
        onClose={handleCloseDeleteProductModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="edit-form-container">
          {deleteProduct && (
            <DeleteProductForm onClose={handleCloseDeleteProductModal} onDelete={undefined} />
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default ProductsAdmin;
