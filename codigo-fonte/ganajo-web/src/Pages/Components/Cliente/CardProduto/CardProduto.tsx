import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import ButtonBase from '@mui/material/ButtonBase'; 
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import ReactDOM from 'react-dom';
import { DetalheProdutoComponent } from '../../../Home/Components/DetalheProduto.tsx'
import { Produto } from '../../../../DTOs/Produto.ts';

export default function ProductCard({ Id, Nome, Descricao, Imagem, Valor }: Produto) {
  const [showDescription, setShowDescription] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState<Produto | null>(null);



  const openDescription = () => {
    setSelectedProduct({ Id, Nome, Descricao, Imagem, Valor });
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
            data-id={Id}
            component="img"
            alt={Nome}
            height="140"
            image={Imagem}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {Nome}
            </Typography>
            <Typography variant="body2" color="text.secondary" style={{ marginBottom: '8px' }}>
              {Descricao}
            </Typography>
            <div style={{ marginBottom: '8px' }}>
              <Chip label="Zero Lactose" variant="outlined" color="primary" size="small" style={{ marginRight: '4px' }} />
              <Chip label="Zero Glúten" variant="outlined" color="primary" size="small" style={{ marginRight: '4px' }} />
              <Chip label="Zero Açúcar" variant="outlined" color="primary" size="small" style={{ marginRight: '4px' }} />
            </div>
            <div>
              <Chip label={`R$${Valor.toFixed(2)}`} variant="outlined" color="secondary" /> 
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
