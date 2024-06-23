import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { toast } from 'react-toastify';
import { NumericFormat, NumericFormatProps } from 'react-number-format';
import { useNavigate } from 'react-router-dom';
import { Produto } from '../../../../DTOs/Produto';
import './edit.css';
import { updateProductAxiosConfig } from '../../../../Api/ganajoClient.ts';

const isLocalTest = false;

const getBaseUrl = () => {
  return isLocalTest ? 'https://localhost:7245/product' : 'https://ganajoapi-s3e6uywyma-rj.a.run.app/';
};

interface EditProductFormProps {
  product: Produto;
  onSave: (editedProduct: Produto) => void;
  onClose: () => void;
  onDelete: () => void;
}

const NumericFormatCustom = React.forwardRef<NumericFormatProps, CustomProps>(
    function NumericFormatCustom(props, ref) {
        const { onChange, ...other } = props;
    
        return (
            <NumericFormat
                {...other}
                getInputRef={ref}
                onValueChange={(values) => {
                    onChange({
                        target: {
                            name: props.name,
                            value: values.value,
                        },
                    });
                }}
                valueIsNumericString={true}
                decimalSeparator=","
                decimalScale={2}
                datatype="number"
                prefix="R$"
            />
        );
    },
);

const EditProductForm: React.FC<EditProductFormProps> = ({ product, onSave, onClose, onDelete }) => {
  const navigate = useNavigate();

  const [editedProduct, setEditedProduct] = useState<Produto>({ ...product });

  useEffect(() => {
    setEditedProduct({ ...product });
  }, [product]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedProduct(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const saveEditedProduct = async () => {
    try {
      const response = await axios(updateProductAxiosConfig(editedProduct));
      onSave(response.data);
      onClose();
      toast.success('Produto atualizado com sucesso!', { autoClose: 2000 });
    } catch (error) {
      console.error('Erro ao salvar alterações:', error);
      toast.error('Erro ao salvar alterações.');
    }
  };

  const handleDelete = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onDelete();
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    saveEditedProduct();
  };

  return (
    <div className="edit-form-container">
      <form onSubmit={handleSubmit}>
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
        <div className="button-container">
        <div className="button-group">
          <button type="submit">Salvar</button>
          <button onClick={handleDelete}>Excluir</button>
        </div>
        <button className="center-button" onClick={onClose}>Cancelar</button>
      </div>
      </form>
    </div>
  );
};

export default EditProductForm;
