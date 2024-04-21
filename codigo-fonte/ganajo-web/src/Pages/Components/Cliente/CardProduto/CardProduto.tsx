import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import ButtonBase from '@mui/material/ButtonBase'; 
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import ReactDOM from 'react-dom';
import { DetalheProdutoComponent } from '../CardMontaPrato/DetalheProduto.tsx'
import { Produto } from '../../../../DTOs/Produto.ts';

interface ProductCardProps {
  product: Produto
}

export default function ProductCard({ product }: ProductCardProps) {
  const [showDescription, setShowDescription] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState<Produto | null>(product);

  const openDescription = () => {
    setSelectedProduct(product);
    setShowDescription(true);
  };

  const closeDescription = () => {
    setShowDescription(false);
  };

  return (
    <div>
      <ButtonBase component="div" onClick={openDescription}>
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            data-id={selectedProduct?.id}
            component="img"
            alt={selectedProduct?.nome}
            height="140"
            image={selectedProduct?.enderecoImagem}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {selectedProduct?.nome}
            </Typography>
            <Typography variant="body2" color="text.secondary" style={{ marginBottom: '8px' }}>
              {selectedProduct?.descricao}
            </Typography>
            <div>
              <Chip label={`R$${selectedProduct?.valor.toFixed(2)}`} variant="outlined" color="secondary" /> 
            </div>
          </CardContent>
        </Card>
      </ButtonBase>
      {showDescription && selectedProduct &&
          <DetalheProdutoComponent Produto={selectedProduct} onClose={closeDescription}/>
        }
    </div>
  );
}
