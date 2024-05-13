import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import ButtonBase from '@mui/material/ButtonBase'; 
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import EditProductForm from '../CardProduto/EditProductForm.tsx'; 
import { Produto } from '../../../../DTOs/Produto.ts';
import styles from './CardProduto.module.scss'
import truncateString from './../../../../Utils/truncateString.ts';

interface ProductCardProps {
  product: Produto
}

export default function ProductCard({ product }: ProductCardProps) {
  const [showEditForm, setShowEditForm] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState<Produto | null>(product);
  const maxLengthToTruncate = 60;

  const openDescription = () => {
    setShowEditForm(true);
    setSelectedProduct(product);
  };

  const closeEditForm = () => {
    setShowEditForm(false);
  };

  return (
    <div className={styles.container}>
      {showEditForm && selectedProduct ? (
        <EditProductForm
          product={selectedProduct}
          onSave={(editedProduct: Produto) => console.log('Produto editado:', editedProduct)} // Adicione a função onSave aqui
          onClose={closeEditForm}
        />
      ) : (
        <ButtonBase className={styles.container} sx={{width: '100%'}} component="div" onClick={openDescription}>
          <Card sx={{width: '100%'}}>
            <CardMedia
              data-id={selectedProduct?.id}
              component="img"
              alt={selectedProduct?.nome}
              height="140"
              image={selectedProduct?.enderecoImagem}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {truncateString(selectedProduct?.nome ?? '', maxLengthToTruncate)}
              </Typography>
              <Typography variant="body2" color="text.secondary" style={{ marginBottom: '8px' }}>
                {truncateString(selectedProduct?.descricao ?? '', maxLengthToTruncate)}
              </Typography>
              <div style={{display: 'flex', flexDirection: 'row', justifyContent:'space-between', gap: '5px'}}>
                <Chip style={{fontSize: '1rem'}} label={`R$ ${selectedProduct?.valor.toFixed(2)}`} color="warning" /> 
                <Chip style={{fontSize: '1rem'}} label={selectedProduct?.categoria} color="info" /> 
              </div>
            </CardContent>
          </Card>
        </ButtonBase>
      )}
    </div>
  );
}
