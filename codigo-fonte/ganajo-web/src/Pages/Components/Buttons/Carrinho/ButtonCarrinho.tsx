import React from 'react'; 
import IconButton from '@mui/material/IconButton'; 
import ShoppingCartCheckoutRoundedIcon from '@mui/icons-material/ShoppingCartCheckoutRounded';
import { styled } from '@mui/system';
import { Badge as BaseBadge, badgeClasses } from '@mui/base/Badge';
import { useCarrinhoContext } from '../../../../Context/CarrinhoContext.tsx';

function ButtonCarrinho({ onClick }) {  
    
    const {count} = useCarrinhoContext();
    
    return (    
        <Badge badgeContent={count} invisible={count <= 0}>
            <IconButton onClick={onClick} size="small" color='inherit' >       
                <ShoppingCartCheckoutRoundedIcon />     
            </IconButton>   
        </Badge> 
    ); 
}  

export default ButtonCarrinho;

  const Badge = styled(BaseBadge)(
    ({ theme }) => `
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-size: 14px;
    font-variant: tabular-nums;
    list-style: none;
    font-family: 'IBM Plex Sans', sans-serif;
    position: relative;
    display: inline-block;
    line-height: 1;
  
    & .${badgeClasses.badge} {
      z-index: auto;
      position: absolute;
      top: 0;
      right: 0;
      min-width: 22px;
      height: 22px;
      padding: 0 6px;
      color: black;
      font-weight: 600;
      font-size: 12px;
      line-height: 22px;
      white-space: nowrap;
      text-align: center;
      border-radius: 12px;
      background: white;
      transform: translate(50%, -50%);
      transform-origin: 100% 0;
    }

    & .${badgeClasses.invisible} {
      opacity: 0;
      pointer-events: none;
    }
    `,
);