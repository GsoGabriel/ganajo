import React from 'react';
import IconButton from '@mui/material/IconButton';
import ShoppingCartCheckoutRoundedIcon from '@mui/icons-material/ShoppingCartCheckoutRounded';
import Badge from '@mui/material/Badge';
import { useCarrinhoContext } from '../../../../Context/CarrinhoContext.tsx';

function ButtonCarrinho({ onClick }) {
    const { count } = useCarrinhoContext();

    return (
        <Badge badgeContent={count} invisible={count <= 0} color="primary">
            <IconButton onClick={onClick} size="small" style={{ color: 'orange' }}>
                <ShoppingCartCheckoutRoundedIcon />
            </IconButton>
        </Badge>
    );
}

export default ButtonCarrinho;
