import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import generateProducts from './../Home/data.ts';
import { Produto } from '../../DTOs/Produto.ts';
import { FaMotorcycle } from "react-icons/fa6";
import './produtos.css'; 
import SearchAppBar from '../Components/Inputs/InputSearch.tsx';

const Home = () => {
  const [itens, setItems] = useState<Produto[]>([]);
  const [screenItens, setScreenItems] = useState<Produto[]>([]);
  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const navigate = useNavigate();

  const searchingHandleCallBack = useCallback((value : string) => {
    setScreenItems(itens.filter(f => f.Nome.toLowerCase().includes(value.toLowerCase()) || f.Descricao.toLowerCase().includes(value.toLowerCase())));
  }, [itens]);

  useEffect(() => {
    const mockItens = generateProducts();
    setItems(mockItens);
    setScreenItems(mockItens);
  }, []);

  const handleAddNewProduct = () => {
    navigate('/add-product');
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
        <div>
          <FaMotorcycle className="iconTheme"/> 
        </div>
        <div className="inputStyle"> 
          <SearchAppBar onSearch={searchingHandleCallBack} /> 
        </div>
        <div className="buttonContainer">
          <button className="addButton" onClick={handleAddNewProduct}>Adicionar Novo Produto</button>
        </div>
      </div>
      <div className="productsContainer">
        {screenItens.map(m => (
          <div key={m.Id} className="productCard">
            <img src={m.Imagem} alt={m.Nome} className="productImage" />
            {editingItemId === m.Id ? (
              <div className="productInfo editProductArea">
                <input type="file" onChange={handleImageChange} accept="image/*" />
                <input type="text" defaultValue={m.Nome} className="inputField" />
                <textarea defaultValue={m.Descricao} className="inputField descriptionField"></textarea>
                <input type="text" defaultValue={formatPrice(m.Valor)} className="inputField" />
                <button className="editButton saveButton" onClick={() => handleSaveProduct(m)}>Salvar</button>
              </div>
            ) : (
              <div className="productInfo">
                <h3>{m.Nome}</h3>
                <p>{m.Descricao}</p>
                <p>{formatPrice(m.Valor)}</p>
                <button className="editButton" onClick={() => handleEditProduct(m.Id)}>Editar</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
