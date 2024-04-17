using GanajoApi.DTOs;
using GanajoApi.FromModels;
using GanajoApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

var context = new GanajoDbContext();

app.MapGet("/", () => "Hello World!");

#region Produtos 

app.MapGet("/products", async () =>
{
    return await context.Produtos.Where(w => !w.Removido)
                                .OrderByDescending(o => o.Categoria)
                                .Select(s => DtoFromModels.ProductDtoFromModel(s))
                                .ToListAsync();
});

app.MapGet("/product/{id}", async ([FromRoute] int id) =>
{
    if(id == 0)
        Results.NoContent();

    var product = await context.Produtos.FirstOrDefaultAsync(f => f.Id == id);

    if (product != null)
        Results.Ok(DtoFromModels.ProductDtoFromModel(product));

    return Results.NotFound();
});

app.MapPost("/product", async ([FromBody] ProductDTO product) =>
{
    if (product == null)
        return default;

    var productDb = await context.Produtos.FirstOrDefaultAsync(f => f.Id == product.Id);

    if (productDb == null)
    {
        productDb = new Produto();
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

app.MapDelete("/product/{id}", async ([FromRoute] int id, [FromQuery] bool removido) => {
    if(id == 0)
        Results.NoContent();

    var product = await context.Produtos.FirstOrDefaultAsync(p => p.Id == id);

    if(product == null)
        return Results.NotFound();

    product.Removido = removido;

    context.Entry(product).State = EntityState.Modified;

    return Results.Ok(await context.SaveChangesAsync() > 0);
});

#endregion
#region Clientes

app.MapGet("/customers", async () => {

    var customers = await context.Clientes
                                .OrderByDescending(o => o.Nome)
                                .Select(s => DtoFromModels.CustomerDtoFromModel(s))
                                .ToListAsync();

    if(!customers.Any())
        return Results.NotFound(); 

    return Results.Ok(customers);
});

app.MapGet("/customer/{id}", async ([FromRoute] int id) => {
    if(id == 0)
        return Results.NoContent();

    var cliente = await context.Clientes.FirstOrDefaultAsync(f => f.Id == id);

    if(cliente == null)
        return Results.NotFound("Região Postal não encontrada...");

    return Results.Ok(DtoFromModels.CustomerDtoFromModel(cliente));
});

app.MapPost("/customer", async ([FromBody] CustomerDTO customer) => {
    if(customer == null)
        Results.NoContent();

    var customerDb = await context.Clientes.FirstOrDefaultAsync(f => f.Id == customer.Id);

    if(customerDb == null){
        customerDb = new Cliente();
        context.Entry(customerDb).State = EntityState.Added;    
    }

    customerDb.Nome = customer.Nome;
    customerDb.Cpf = customer.Cpf;
    customerDb.NumeroCasa = customer.NumeroCasa;
    customerDb.Complemento = customer.Complemento;
    customerDb.NumeroTelefone = customer.NumeroTelefone;
    customerDb.RegiaoPostalId = customer.RegiaoPostalId;

    context.SavedChanges += (s, e) => {
        customer.Id = customerDb.Id;
    };

    await context.SaveChangesAsync();

    Results.Ok(customer);
});

#endregion
#region Regiao Postal

app.MapGet("/regiaopostais", async () => {

    var regioes = await context.RegiaoPostals
                                .OrderByDescending(o => o.Bairro)
                                .Select(s => DtoFromModels.RegiaoDtoFromModel(s))
                                .ToListAsync();

    if(!regioes.Any())
        return Results.NotFound(); 

    return Results.Ok(regioes);
});

app.MapGet("/regiaopostal/{id}", async ([FromRoute] int id) => {
    if(id == 0)
        return Results.NoContent();

    var regiaoPostal = await context.RegiaoPostals.FirstOrDefaultAsync(f => f.Id == id);

    if(regiaoPostal == null)
        return Results.NotFound("Região Postal não encontrada...");

    return Results.Ok(DtoFromModels.RegiaoDtoFromModel(regiaoPostal));
});

app.MapPost("/regiaopostal", async ([FromBody] RegiaoPostalDTO regiaoPostal) => {
    if(regiaoPostal == null)
        Results.NoContent();

    var regiaoPostalDb = await context.RegiaoPostals.FirstOrDefaultAsync(f => f.Id == regiaoPostal.Id);

    if(regiaoPostalDb == null){
        regiaoPostalDb = new RegiaoPostal();
        context.Entry(regiaoPostalDb).State = EntityState.Added;    
    }

    regiaoPostalDb.Bairro = regiaoPostal.Bairro;
    regiaoPostalDb.Cep = regiaoPostal.Cep;
    regiaoPostalDb.PrecoDelivery = regiaoPostal.PrecoDelivery;
    regiaoPostalDb.EditadoData = DateTime.Now;
    regiaoPostalDb.EditadoPor = 1;

    context.SavedChanges += (s, e) => {
        regiaoPostal.Id = regiaoPostalDb.Id;
    };

    await context.SaveChangesAsync();

    Results.Ok(regiaoPostal);
});

app.MapDelete("/regiaopostal/{id}", async ([FromRoute] int id, [FromQuery] bool removido) => {

    if(id == 0)
        return Results.NoContent();

    var regiaoPostalDb = await context.RegiaoPostals.FirstOrDefaultAsync(f => f.Id == id);

    if(regiaoPostalDb == null)
        return Results.NotFound();

    regiaoPostalDb.Removido = removido;
    context.Entry(regiaoPostalDb).State = EntityState.Modified;

    return Results.Ok(await context.SaveChangesAsync() > 0);

});

#endregion

app.Run();
