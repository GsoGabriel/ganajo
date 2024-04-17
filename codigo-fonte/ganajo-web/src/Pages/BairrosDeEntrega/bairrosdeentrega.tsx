import React, { useCallback, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FixedSizeList } from 'react-window';
import SearchAppBar from '../Components/Inputs/InputSearch.tsx';
import CardBairro from '../Components/Cliente/CardBairro/CardBairro.tsx';
import generateBairros from './data.ts';
import { FaMotorcycle } from 'react-icons/fa6';
import { Bairro } from '../../DTOs/Bairro.ts';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';

const Bairros = () => {
  const [bairros, setBairros] = useState<Bairro[]>([]);
  const [screenBairros, setScreenBairros] = useState<Bairro[]>([]);
  const [selectedBairro, setSelectedBairro] = useState<Bairro | null>(null);
  const [editedBairroName, setEditedBairroName] = useState<string>('');
  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    const mockBairros = generateBairros();
    setBairros(mockBairros);
    setScreenBairros(mockBairros);
  }, []);

  const searchingHandleCallBack = useCallback((value: string) => {
    setScreenBairros(bairros.filter(bairro => bairro.Nome.toLowerCase().includes(value.toLowerCase())));
  }, [bairros]);

  const handleEditBairro = () => {
    if (selectedBairro) {
      const updatedBairros = bairros.map(bairro =>
        bairro.Id === selectedBairro.Id ? { ...bairro, Nome: editedBairroName } : bairro
      );
      setBairros(updatedBairros);
      setScreenBairros(updatedBairros);
      setEditDialogOpen(false);
    }
  };

  const handleDeleteBairro = () => {
    if (selectedBairro) {
      const updatedBairros = bairros.filter(bairro => bairro.Id !== selectedBairro.Id);
      setBairros(updatedBairros);
      setScreenBairros(updatedBairros);
      setDeleteDialogOpen(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
      <Grid container spacing={1} alignItems="center">
        <Grid item xs={1}></Grid>
        <Grid item xs={1}>
          <FaMotorcycle className="iconTheme" />
        </Grid>
        <Grid item xs={8}>
          <h1 className="deliveryTime">Tempo médio de preparo: 40 min</h1>
        </Grid>
        <Grid item xs={2}>
          <SearchAppBar onSearch={searchingHandleCallBack} />
        </Grid>
      </Grid>

      <Card sx={{ p: 2, width: '80%', overflow: 'auto', mb: 2}}>
        <Grid container spacing={2} alignItems="center" sx={{ width: '100%' }}>
          <Grid item xs={12}>
            <TextField
              label="Nome do Bairro"
              fullWidth
              value={editedBairroName}
              onChange={(e) => setEditedBairroName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sx={{ textAlign: 'right' }}>
            <Button onClick={handleEditBairro}>Adicionar</Button>
          </Grid>
        </Grid>
      </Card>
      <Card sx={{ p: 2, width: '80%', overflow: 'auto', mb: 2 }}>
        <FixedSizeList
          width={'100%'}
          height={700}
          itemSize={100}
          itemCount={screenBairros.length}
          overscanCount={5}
        >
          {({ index, style }) => (
            <div style={style}>
              <CardBairro
                bairro={screenBairros[index]}
                onEdit={() => {
                  setSelectedBairro(screenBairros[index]);
                  setEditedBairroName(screenBairros[index].Nome);
                  setEditDialogOpen(true);
                }}
                onDelete={() => {
                  setSelectedBairro(screenBairros[index]);
                  setDeleteDialogOpen(true);
                }}
              />
            </div>
          )}
        </FixedSizeList>
      </Card>

      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Editar Bairro</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nome do Bairro"
            fullWidth
            value={editedBairroName}
            onChange={(e) => setEditedBairroName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancelar</Button>
          <Button onClick={handleEditBairro}>Confirmar</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Excluir Bairro</DialogTitle>
        <DialogContent>
          <p>Deseja excluir o bairro selecionado?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancelar</Button>
          <Button onClick={handleDeleteBairro}>Confirmar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Bairros;
