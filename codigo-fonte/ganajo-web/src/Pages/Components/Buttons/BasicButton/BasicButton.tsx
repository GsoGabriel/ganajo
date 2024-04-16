import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function BasicButton({value}) {
  return (
    <Box sx={{ '& button': { m: 1 } }}>
        <Button variant="contained" size="medium">
            {value}
        </Button>
    </Box>
  );
}

/*  Exemplo de como chamar alterando o valor:
    <BasicButton value="Buscar"/>
*/