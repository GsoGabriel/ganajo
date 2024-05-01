import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Bairro } from '../../../../DTOs/Bairro.ts';

interface CardBairroProps {
  bairro: Bairro;
  onEdit: () => void;
  onDelete: () => void;
}

const CardBairro: React.FC<CardBairroProps> = ({ bairro, onEdit, onDelete }) => {
  var nomeLabel = `Nome: ${bairro.bairro}`;
  var precoLabel = `Taxa Entrega: R$ ${bairro.precoDelivery.toFixed(2)}`.replace('.',',');
  var cepLabel = `Cep: ${bairro.cep}`

  return (
    <ListItem key={bairro.id} component="div" disablePadding>
      <ListItemButton>
        <ListItemText primary={nomeLabel} />
        <ListItemText primary={precoLabel} />
        <ListItemText primary={cepLabel} />
        <IconButton aria-label="edit" onClick={onEdit}>
          <EditIcon />
        </IconButton>
        <IconButton aria-label="delete" onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      </ListItemButton>
    </ListItem>
  );
};

export default CardBairro;
