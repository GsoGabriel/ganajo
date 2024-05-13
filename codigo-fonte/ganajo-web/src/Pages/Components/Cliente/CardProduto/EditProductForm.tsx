import React, { useState } from 'react';
import { Produto } from '../../../../DTOs/Produto';
import './edit.css';

interface EditProductFormProps {
  product: Produto;
  onSave: (editedProduct: Produto) => void;
  onClose: () => void;
}

const EditProductForm: React.FC<EditProductFormProps> = ({ product, onSave, onClose }) => {
  const [editedProduct, setEditedProduct] = useState<Produto>({ ...product }); // Estado para armazenar o produto editado

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedProduct(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(editedProduct); // Chame a função onSave com o produto editado
    onClose(); // Feche o formulário após salvar
  };

  return (
    <div className="edit-form-container">
      <div className="form-group">
        <label htmlFor="nome">Nome:</label>
        <input type="text" id="nome" name="nome" value={editedProduct.nome} onChange={handleInputChange} />
      </div>
      <div className="form-group">
        <label htmlFor="descricao">Descrição:</label>
        <textarea id="descricao" name="descricao" value={editedProduct.descricao} onChange={handleInputChange} />
      </div>
      <div className="form-group">
        <label htmlFor="categoria">Categoria:</label>
        <input type="text" id="categoria" name="categoria" value={editedProduct.categoria} onChange={handleInputChange} />
      </div>
      <div className="form-group">
        <label htmlFor="valor">Valor:</label>
        <input type="number" id="valor" name="valor" value={editedProduct.valor} onChange={handleInputChange} />
      </div>
      <div className="form-group">
        <label htmlFor="enderecoImagem">Endereço da Imagem:</label>
        <input type="text" id="enderecoImagem" name="enderecoImagem" value={editedProduct.enderecoImagem} onChange={handleInputChange} />
      </div>
      <button onClick={handleSave}>Salvar</button>
      <button onClick={onClose}>Cancelar</button>
    </div>
  );
};

export default EditProductForm;
