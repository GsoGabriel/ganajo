import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import ButtonBase from '@mui/material/ButtonBase'; 
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import EditProductForm from '../CardProduto/EditProductForm.tsx';
import { Produto } from '../../../../DTOs/Produto';
import styles from './CardProduto.module.scss'
import truncateString from './../../../../Utils/truncateString.ts';

interface ProductCardProps {
  product: Produto;
  onEdit: (id: number) => void;
  onSave: (editedProduct: Produto) => void;
  isEditing: boolean;
  editedProduct: Produto | null;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ProductCard({ 
  product, 
  onEdit, 
  onSave, 
  isEditing, 
  editedProduct, 
  onImageChange 
}: ProductCardProps) {
  const [showEditForm, setShowEditForm] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState<Produto | null>(product);
  const maxLengthToTruncate = 60;

  const openDescription = () => {
    setShowEditForm(true);
    setSelectedProduct(product);
    onEdit(product.id);
  };

  const closeEditForm = () => {
    setShowEditForm(false);
    onEdit(null);
  };

  return (
    <div className={styles.container}>
      {isEditing && editedProduct && editedProduct.id === product.id ? (
        <EditProductForm
          product={editedProduct}
          onSave={onSave}
          onClose={closeEditForm}
          onImageChange={onImageChange}
        />
      ) : (
        <ButtonBase className={styles.container} sx={{width: '100%'}} component="div" onClick={openDescription}>
          <Card sx={{width: '100%'}}>
            <CardMedia
              data-id={product.id}
              component="img"
              alt={product.nome}
              height="140"
              image={product.enderecoImagem}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {truncateString(product.nome, maxLengthToTruncate)}
              </Typography>
              <div style={{display: 'flex', flexDirection: 'row', justifyContent:'space-between', gap: '5px'}}>
                <Chip style={{fontSize: '1rem'}} label={`R$ ${product.valor.toFixed(2)}`} color="warning" /> 
                <Chip style={{fontSize: '1rem'}} label={product.categoria} color="info" /> 
              </div>
            </CardContent>
          </Card>
        </ButtonBase>
      )}
    </div>
  );
}
