import React from 'react'; 
import IconButton from '@mui/material/IconButton'; 
import ShoppingCartCheckoutRoundedIcon from '@mui/icons-material/ShoppingCartCheckoutRounded';

function ButtonClose({ onClick }) {   return (     
    <IconButton onClick={onClick} size="small">       
        <ShoppingCartCheckoutRoundedIcon />     
    </IconButton>   
    ); }  
export default ButtonClose;