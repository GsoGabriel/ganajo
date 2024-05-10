using GanajoApi.DTOs;
using GanajoApi.Models;

namespace GanajoApi.FromModels;

public static class DtoFromModels {
    public static RegiaoPostalDTO RegiaoDtoFromModel(RegiaoPostal regiaoPostal){

        if (regiaoPostal == null)
            return new RegiaoPostalDTO();

        return new RegiaoPostalDTO(){
            Id = regiaoPostal.Id,
            Bairro = regiaoPostal.Bairro,
            Cep = regiaoPostal.Cep,
            PrecoDelivery = regiaoPostal.PrecoDelivery,
            EditadoPor = regiaoPostal.EditadoPor,
            EditadoData =regiaoPostal.EditadoData
        };
    }

    public static ProductDTO ProductDtoFromModel(Produto produto){
        return new ProductDTO()
        {
            Id = produto.Id,
            Categoria = produto.Categoria,
            Descricao = produto.Descricao,
            EditadoData = produto.EditadoData,
            EditadoPorNome = produto.EditadoPorNavigation?.Nome ?? "",
            EnderecoImagem = produto.EnderecoImagem,
            Nome = produto.Nome,
            TempoPreparo = produto.TempoPreparo,
            UsuarioId = produto.UsuarioId,
            Valor = produto.Valor
        };
    }

    public static CustomerDTO CustomerDtoFromModel(Cliente cliente){
        return new CustomerDTO()
        {
            Id = cliente.Id,
            Cpf = cliente.Cpf,
            Nome = cliente.Nome,
            NumeroCasa = cliente.NumeroCasa,
            Complemento = cliente.Complemento,
            NumeroTelefone = cliente.NumeroTelefone,
            RegiaoPostal = RegiaoDtoFromModel(cliente.RegiaoPostal),
            Endereco = cliente.Endereco,
        };
    }
}