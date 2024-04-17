import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Arroz from '../../Buttons/RadioGroup/RadioGroup.tsx';
import { Produto } from '../../../../DTOs/Produto.ts';
import formatValue from '../../../../Utils/formatValue.ts';
import formatStringLimit from '../../../../Utils/formatStringLimit.ts';
import FullWidthTextField from '../TextFieldFull/TextFieldFull.tsx';
import ButtonClose from '../../Buttons/Fechar/Fechar.tsx';


interface DetalheProdutoComponentProps {
  Produto: Produto,
  onClose: () => void
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const ModalMontaPrato = ({ Produto, onClose }: DetalheProdutoComponentProps) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <ButtonClose onClick={onClose}/>
            <div>
                <img src={Produto.Imagem} alt={Produto.Nome} />
                <Typography id="transition-modal-title" variant="h6" component="h2">
                    {formatStringLimit(Produto.Nome, 0, 70, "...")}
                </Typography>
                <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                    {formatStringLimit(Produto.Descricao, 0, 999, "...")}
                </Typography>
            </div>
            
            <div>
            <FullWidthTextField label="Observações" id="observacoes"/>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                <Button>{formatValue(Produto.Valor, 2, "R$")}</Button>
            </Typography>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
