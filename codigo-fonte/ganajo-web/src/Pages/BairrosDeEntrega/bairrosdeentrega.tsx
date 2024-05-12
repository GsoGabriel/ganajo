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
import { Bairro } from '../../DTOs/Bairro.ts';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import { getBairrosAxiosConfig, postBairroAxiosConfig, deleteBairroByIdAxiosConfig } from '../../Api/ganajoClient.ts';
import { useApi } from '../../Api/useApi.tsx';


const Bairros = () => {

  const {data} = useApi<Bairro[]>(getBairrosAxiosConfig())
  const [bairros, setBairros] = useState<Bairro[]>(data ?? []);
  const [screenBairros, setScreenBairros] = useState<Bairro[]>([]);
  const [selectedBairro, setSelectedBairro] = useState<Bairro | null>(null);
  const [editedBairroName, setEditedBairroName] = useState<string>('');
  const [editedBairroCep, setEditedBairroCep] = useState<string>('');
  const [editedBairroTaxaEntrega, setEditedBairroTaxaEntrega] = useState<number>(0);
  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    setBairros(data ?? []);
    setScreenBairros(data ?? []);
  }, [data])

  const resetEditedItens = () => {
    setEditedBairroName('');
    setEditedBairroCep('');
    setEditedBairroTaxaEntrega(0);
  };

  const searchingHandleCallBack = useCallback((value: string) => {
    setScreenBairros(bairros.filter(bairro => bairro.bairro.toLowerCase().includes(value.toLowerCase())));
  }, [bairros]);

  const handleEditBairro = async () => {
    const currentDate = new Date();

    // fluxo de update
    if (selectedBairro) {
      const updatedBairros = bairros.map(bairro =>
        bairro.id === selectedBairro.id ? { ...bairro, bairro: editedBairroName, cep: editedBairroCep, precoDelivery: editedBairroTaxaEntrega } : bairro
      );
      setBairros(updatedBairros);
      setScreenBairros(updatedBairros);

      const bairroFormData: Bairro = {
        id: selectedBairro.id,
        bairro: editedBairroName,
        cep: editedBairroCep,
        precoDelivery: editedBairroTaxaEntrega,
        editadoPor: 1, // fixo no admin
        editadoData: currentDate.toISOString()
      }

      const updateBairroData = async() => {
        const _ = await postBairroAxiosConfig(bairroFormData);
      }
      updateBairroData();
    } 
    // fluxo de create
    else {
      const bairroFormData: Bairro = {
        id: 9999999, // id inexistente pra criar um novo registro
        bairro: editedBairroName,
        cep: editedBairroCep,
        precoDelivery: editedBairroTaxaEntrega,
        editadoPor: 1, // fixo no admin
        editadoData: currentDate.toISOString()
      }

      const updateBairroData = async() => {
        const _ = await postBairroAxiosConfig(bairroFormData);
      }
      updateBairroData();

      setBairros(bairros.concat(bairroFormData));
      setScreenBairros(bairros.concat(bairroFormData));
    }

    resetEditedItens();
    setEditDialogOpen(false);
  };

  const handleDeleteBairro = async () => {
    if (selectedBairro) {
      const deleteBairroData = async() => {
        const _ = await deleteBairroByIdAxiosConfig(selectedBairro.id);
      }
      deleteBairroData();

      const updatedBairros = bairros.filter(bairro => bairro.id !== selectedBairro.id);
      setBairros(updatedBairros);
      setScreenBairros(updatedBairros);
      resetEditedItens();
      setDeleteDialogOpen(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
      <Grid container spacing={1} alignItems="center">
        <Grid item xs={1}></Grid>
        <Grid item xs={2}>
        </Grid>
        <Grid item xs={3}>
          <SearchAppBar onSearch={searchingHandleCallBack} />
        </Grid>
      </Grid>

      <Card sx={{ p: 2, width: '80%', overflow: 'auto', mb: 2}}>
        <Grid container spacing={2} alignItems="center" sx={{ width: '100%' }}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <TextField
                  label="Nome do Bairro"
                  fullWidth
                  value={editedBairroName}
                  onChange={(e) => setEditedBairroName(e.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="CEP"
                  fullWidth
                  value={editedBairroCep}
                  onChange={(e) => setEditedBairroCep(e.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Taxa Entrega"
                  fullWidth
                  value={editedBairroTaxaEntrega === 0 ? '' : editedBairroTaxaEntrega}
                  onChange={(e) => setEditedBairroTaxaEntrega(parseFloat(e.target.value))}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} sx={{ textAlign: 'right' }}>
                <Button onClick={handleEditBairro}>Adicionar</Button>
            </Grid>
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
                  setEditedBairroName(screenBairros[index].bairro);
                  setEditedBairroCep(screenBairros[index].cep);
                  setEditedBairroTaxaEntrega(screenBairros[index].precoDelivery);
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
          <TextField
            autoFocus
            margin="dense"
            label="CEP"
            fullWidth
            value={editedBairroCep}
            onChange={(e) => setEditedBairroCep(e.target.value)}
          />
          <TextField
              autoFocus
              margin="dense"
              label="Taxa Entrega"
              fullWidth
              value={editedBairroTaxaEntrega}
              onChange={(e) => setEditedBairroTaxaEntrega(parseFloat(e.target.value))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {setEditDialogOpen(false); resetEditedItens()}}>Cancelar</Button>
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
