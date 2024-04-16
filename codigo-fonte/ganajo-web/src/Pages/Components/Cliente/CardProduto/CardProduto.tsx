import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import ButtonBase from '@mui/material/ButtonBase'; 
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import ReactDOM from 'react-dom';

export default function ProductCard({ nome, descricao, imagem, preco }) {
  const [showDescription, setShowDescription] = React.useState(false);

  const openDescription = () => {
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
            component="img"
            alt={nome}
            height="140"
            image={imagem}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {nome}
            </Typography>
            <Typography variant="body2" color="text.secondary" style={{ marginBottom: '8px' }}>
              {descricao}
            </Typography>
            <div style={{ marginBottom: '8px' }}>
              <Chip label="Zero Lactose" variant="outlined" color="primary" size="small" style={{ marginRight: '4px' }} />
              <Chip label="Zero Glúten" variant="outlined" color="primary" size="small" style={{ marginRight: '4px' }} />
              <Chip label="Zero Açúcar" variant="outlined" color="primary" size="small" style={{ marginRight: '4px' }} />
            </div>
            <div>
              <Chip label={`R$${preco.toFixed(2)}`} variant="outlined" color="secondary" /> 
            </div>
          </CardContent>
        </Card>
      </ButtonBase>
      {showDescription &&
        ReactDOM.createPortal(
          <div>
            <div>Descrição: {descricao}</div>
            <button onClick={closeDescription}>Fechar</button>
          </div>,
          document.body
        )}
    </div>
  );
}
