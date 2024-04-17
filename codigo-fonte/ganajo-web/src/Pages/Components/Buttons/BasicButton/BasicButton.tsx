import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function BasicButton({ value, onClick }) {
  return (
    <Box sx={{ '& button': { m: 1 } }}>
        <Button variant="contained" size="medium" onClick={onClick}>
            {value}
        </Button>
    </Box>
  );
}


/*  Exemplo de como chamar alterando o valor:
    <BasicButton value="Buscar"/>
*/