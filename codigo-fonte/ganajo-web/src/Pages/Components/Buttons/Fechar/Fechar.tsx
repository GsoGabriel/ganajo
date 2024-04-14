import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import React from 'react'; 
import IconButton from '@mui/material/IconButton'; 
import CloseIcon from '@mui/icons-material/Close';  

function FecharBotao({ onClick }) {   return (     
    <IconButton onClick={onClick} size="small">       
        <CloseIcon />     
    </IconButton>   
    ); }  
export default FecharBotao;