import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import React from 'react'; 
import IconButton from '@mui/material/IconButton'; 

function ButtonClose({ onClick }) {   return (     
    <IconButton onClick={onClick} size="small">       
        <CloseRoundedIcon />     
    </IconButton>   
    ); }  
export default ButtonClose;