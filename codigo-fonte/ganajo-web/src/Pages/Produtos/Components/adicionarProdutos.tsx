import * as React from "react";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import { NumericFormat, NumericFormatProps } from 'react-number-format';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { postProductAxiosConfig } from "../../../Api/ganajoClient.ts";
import { Produto } from "../../../DTOs/Produto.ts";

interface CustomProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
  }  

const NumericFormatCustom = React.forwardRef<NumericFormatProps, CustomProps>(
    function NumericFormatCustom(props, ref) {
      const { onChange, ...other } = props;
  
      return (
        <NumericFormat
          {...other}
          getInputRef={ref}
          onValueChange={(values) => {
            onChange({
              target: {
                name: props.name,
                value: values.value,
              },
            });
          }}
          valueIsNumericString={true}
          decimalSeparator=","
          decimalScale={2}
          datatype="number"
          prefix="R$"
        />
      );
    },
  );

export default function ProductForm() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nome: '',
        descricao: '',
        valor: 0,
        enderecoImagem: '',
        usuarioId: 1,
        categoria: ''
    });

    const productData: Produto = {
      nome: formData.nome,
      descricao: formData.descricao,
      valor: formData.valor,
      enderecoImagem: formData.enderecoImagem,
      usuarioId: formData.usuarioId,
      categoria: formData.categoria
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let numericValue;
        if (name === "valor") {
            numericValue = parseFloat(value);
            setFormData({
                ...formData,
                [name]: numericValue
            });
        } else {
            setFormData({
              ...formData,
              [name]: value
            });
        }
      };

    // const handleSubmit = () => {
    //     console.log(formData)
    // }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
          const response = postProductAxiosConfig(productData);
          if (await response) {
            toast.success("Produto adicionado com sucesso!")
            setFormData({
                nome: '',
                descricao: '',
                valor: 0,
                enderecoImagem: '',
                usuarioId: 1,
                categoria: ''
            });
            navigate('/produtos');
          } else {
            toast.error("Erro ao salvar o produto.");
          }
        } catch (error) {
          toast.error(error);
        }
      };
    
  return (
    <React.Fragment>
      <Paper elevation={3} sx={{ marginTop: "5%", marginRight: "15%", marginLeft: "15%" }}>
        <Box sx={{ padding: 5 }}>
          <Typography variant="h6" gutterBottom sx={{ paddingBottom: 5 }}>
            Adicionar produto
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={2}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  fontWeight: 700
                }}
              >
                Nome
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={10}>
              <TextField
                required
                id="nome"
                name="nome"
                label="Nome"
                fullWidth
                size="small"
                autoComplete="off"
                variant="outlined"
                defaultValue={formData.nome}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  fontWeight: 700
                }}
              >
                Descrição
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={10}>
              <TextField
                required
                id="descricao"
                name="descricao"
                label="Descrição"
                multiline
                fullWidth
                rows={4}
                defaultValue={formData.descricao}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  fontWeight: 700
                }}
              >
                Categoria
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={10}>
              <TextField
                required
                id="categoria"
                name="categoria"
                label="Categoria"
                multiline
                fullWidth
                rows={4}
                defaultValue={formData.categoria}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  fontWeight: 700
                }}
              >
                URL Imagem
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={10}>
              <TextField
                required
                id="enderecoImagem"
                name="enderecoImagem"
                label="URL Imagem"
                fullWidth
                size="small"
                autoComplete="off"
                variant="outlined"
                defaultValue={formData.enderecoImagem}
                onChange={handleInputChange}
              />
            </Grid>
            {/* <Grid item xs={12} sm={2}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  fontWeight: 700
                }}
              >
                Category
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  label="Age"
                  onChange={handleChange}
                >
                  {categories.map((item) => (
                    <MenuItem value={item}>{item}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid> */}
            <Grid item xs={12} sm={2}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  fontWeight: 700
                }}
              >
                Valor
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Valor"
                defaultValue={formData.valor}
                onChange={handleInputChange}
                name="valor"
                id="formatted-numberformat-input"
                InputProps={{
                inputComponent: NumericFormatCustom as any,
                }}
              />
            </Grid>
            {/* <Grid item xs={12} sm={2}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  fontWeight: 700
                }}
              >
                Img Upload
              </InputLabel>
            </Grid> */}
            <Grid item xs={12} sm={4} />
              {/* <Button>
                <UploadFileIcon />
              </Button>
            </Grid> */}
            <Grid item xs={12} sm={6} />
            <Grid item xs={12} sm={5} />
            <Grid item xs={12} sm={4}>
              <Button variant="contained" onClick={handleSubmit} >
                Save
              </Button>
            </Grid>
            <Grid item xs={12} sm={5} />
          </Grid>
        </Box>
      </Paper>
    </React.Fragment>
  );
}
