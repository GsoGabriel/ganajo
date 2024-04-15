using GanajoApi.DTOs;
using GanajoApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

var context = new GanajoDbContext();

app.MapGet("/", () => "Hello World!");

app.MapGet("/products", async () =>
{
    return await context.Produtos.Select(s => new ProductDTO()
    {
        Id = s.Id,
        Categoria = s.Categoria,
        Descricao = s.Descricao,
        EditadoData = s.EditadoData,
        EditadoPorNome = s.EditadoPorNavigation != null ? s.EditadoPorNavigation.Nome : "",
        EnderecoImagem = s.EnderecoImagem,
        Nome = s.Nome,
        TempoPreparo = s.TempoPreparo,
        UsuarioId = s.UsuarioId,
        Valor = s.Valor
    }).ToListAsync();
});

app.MapGet("/product/{id}", async ([FromRoute] int id) =>
{
    var product = await context.Produtos.FirstOrDefaultAsync(f => f.Id == id);

    if (product != null)
        return new ProductDTO()
        {
            Id = product.Id,
            Categoria = product.Categoria,
            Descricao = product.Descricao,
            EditadoData = product.EditadoData,
            EditadoPorNome = product.EditadoPorNavigation?.Nome ?? "",
            EnderecoImagem = product.EnderecoImagem,
            Nome = product.Nome,
            TempoPreparo = product.TempoPreparo,
            UsuarioId = product.UsuarioId,
            Valor = product.Valor
        };

    return default;
});

app.MapPost("/product", async ([FromBody] ProductDTO product) =>
{
    if (product == null)
        return default;

    var productDb = await context.Produtos.FirstOrDefaultAsync(f => f.Id == product.Id);

    if (productDb == null)
    {
        productDb = new GanajoApi.Models.Produto();
        context.Entry(productDb).State = EntityState.Added;
    }

    productDb.Categoria = product.Categoria;
    productDb.Descricao = product.Descricao;
    productDb.EnderecoImagem = product.EnderecoImagem;
    productDb.Nome = product.Nome;
    productDb.TempoPreparo = product.TempoPreparo;
    productDb.UsuarioId = product.UsuarioId;
    productDb.Valor = product.Valor;

    productDb.EditadoData = DateTime.Now;
    productDb.EditadoPor = 1;

    context.SavedChanges += (s, e) =>
    {
        product.Id = productDb.Id;
    };

    await context.SaveChangesAsync();

    return product;
});

app.Run();
