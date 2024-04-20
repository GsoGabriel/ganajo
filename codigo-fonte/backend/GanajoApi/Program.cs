using GanajoApi.DTOs;
using GanajoApi.Enums;
using GanajoApi.FromModels;
using GanajoApi.Hubs;
using GanajoApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Linq.Expressions;

var builder = WebApplication.CreateBuilder(args);

const string GANAJO_ORIGIN = "ganajoOrigin";

// REAL TIME HUBS
const string PEDIDO_REALTIME = "PEDIDO_REALTIME";

// ENDERECO DA APLICAÇÃO REACT (WEB)
const string address = "http://localhost:3000";

builder.Services.AddSignalR();

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: GANAJO_ORIGIN,
                      policy =>
                      {
                          policy.WithOrigins(address)
                            .AllowAnyHeader()
                            .AllowAnyMethod()
                            .AllowCredentials();
                      });
});

var app = builder.Build();

app.UseRouting()
   .UseCors(GANAJO_ORIGIN);

app.MapHub<RealTimeHub>("/realtime");

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
        return Results.NoContent();

    var product = await context.Produtos.FirstOrDefaultAsync(f => f.Id == id);

    if (product != null)
        return Results.Ok(DtoFromModels.ProductDtoFromModel(product));

    return Results.NotFound("Produto não encontrado...");
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
        return Results.NoContent();

    var product = await context.Produtos.FirstOrDefaultAsync(p => p.Id == id);

    if(product == null)
        return Results.NotFound("Produto não encontrado...");

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
        return Results.NotFound("Cliente não encontrado..."); 

    return Results.Ok(customers);
});

app.MapGet("/customer/{id}", async ([FromRoute] int id) => {
    if(id == 0)
        return Results.NoContent();

    var cliente = await context.Clientes.FirstOrDefaultAsync(f => f.Id == id);

    if(cliente == null)
        return Results.NotFound("Cliente não encontrado...");

    return Results.Ok(DtoFromModels.CustomerDtoFromModel(cliente));
});

app.MapPost("/customer", async ([FromBody] CustomerDTO customer) => {
    if(customer == null)
        return Results.NoContent();

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
    customerDb.RegiaoPostalId = customer.RegiaoPostal.Id;

    context.SavedChanges += (s, e) => {
        customer.Id = customerDb.Id;
    };

    await context.SaveChangesAsync();

    return Results.Ok(customer);
});

#endregion
#region Regiao Postal

app.MapGet("/postalcodes", async () => {

    var regioes = await context.RegiaoPostals
                                .Where(w => !w.Removido)
                                .OrderByDescending(o => o.Bairro)
                                .Select(s => DtoFromModels.RegiaoDtoFromModel(s))
                                .ToListAsync();

    if(!regioes.Any())
        return Results.NotFound("Região Postal não encontrada..."); 

    return Results.Ok(regioes);
});

app.MapGet("/postalcode/{id}", async ([FromRoute] int id) => {
    if(id == 0)
        return Results.NoContent();

    var regiaoPostal = await context.RegiaoPostals.FirstOrDefaultAsync(f => f.Id == id);

    if(regiaoPostal == null)
        return Results.NotFound("Região Postal não encontrada...");

    return Results.Ok(DtoFromModels.RegiaoDtoFromModel(regiaoPostal));
});

app.MapPost("/postalcode", async ([FromBody] RegiaoPostalDTO regiaoPostal) => {
    if(regiaoPostal == null)
        return Results.NoContent();

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

    return Results.Ok(regiaoPostal);
});

app.MapDelete("/postalcode/{id}", async ([FromRoute] int id, [FromQuery] bool removido) => {

    if(id == 0)
        return Results.NoContent();

    var regiaoPostalDb = await context.RegiaoPostals.FirstOrDefaultAsync(f => f.Id == id);

    if(regiaoPostalDb == null)
        return Results.NotFound("Região Postal não encontrada...");

    regiaoPostalDb.Removido = removido;
    context.Entry(regiaoPostalDb).State = EntityState.Modified;

    return Results.Ok(await context.SaveChangesAsync() > 0);

});

#endregion
#region Pedidos

app.MapGet("/orders", async () => {

    var pedidos = await (from pedido in context.Pedidos
                         where !pedido.Removido
                         select new PedidoDTO
                         {
                             Id = pedido.Id,
                             Cliente = DtoFromModels.CustomerDtoFromModel(pedido.Cliente),
                             Descricao = pedido.Descricao,
                             StatusPedido = (StatusPedido)pedido.StatusPedido,
                             TipoPagamento = (TipoPagamento)pedido.TipoPagamento,
                             ValorTotal = pedido.ValorTotal,
                             Produtos = pedido.PedidoProdutos.Select(s => new PedidoProdutoDTO()
                             {
                                 Id = s.Id,
                                 PedidoId = pedido.Id,
                                 Descricao = s.Descricao,
                                 Quantidade = s.Quantidade,
                                 ValorTotal = s.ValorTotal,
                                 Produto = DtoFromModels.ProductDtoFromModel(s.Produto)
                             }).ToList()
                         })
                         .OrderByDescending(o => o.StatusPedido)
                         .ToListAsync();

    if (pedidos == null || !pedidos.Any())
        return Results.NotFound("Não há pedidos na base de dados...");

    return Results.Ok(pedidos);
});

app.MapGet("/order/{id}", async ([FromRoute] int id) => {

    if (id == 0)
        return Results.NoContent();

    var pedidoDto = await GetPedidoByIdAsync(id);

    if (pedidoDto == null)
        return Results.NotFound("Pedido não encontrado...");

    return Results.Ok(pedidoDto);
});

app.MapPost("/order", async ([FromBody] PedidoDTO pedido, IHubContext<RealTimeHub> realTimeHub) => {

    if (pedido == null || !pedido.Produtos.Any())
        return Results.NoContent();

    var pedidoDb = await context
                            .Pedidos
                            .FirstOrDefaultAsync(f => f.Id == pedido.Id);

    if (pedidoDb == null)
    {
        pedidoDb = new Pedido();
        context.Entry(pedidoDb).State = EntityState.Added;
    }

    pedidoDb.Descricao = pedido.Descricao;

    pedidoDb.ValorTotal = pedido.Produtos.Sum(s => {
        s.ValorTotal = s.Produto.Valor * (s.Quantidade ?? 1);
        return s.ValorTotal;
    });

    pedidoDb.ClienteId = pedido.Cliente.Id;
    pedidoDb.StatusPedido = (int)pedido.StatusPedido;
    pedidoDb.TipoPagamento = (int)pedido.TipoPagamento;
    pedidoDb.Removido = pedido.Removido;
    pedidoDb.EditadoPor = 1;
    pedidoDb.EditadoData = DateTime.Now;

    context.SavedChanges += (s, e) => {
        pedido.Id = pedidoDb.Id;
    };

    await context.SaveChangesAsync();

    foreach (var pedidoProduto in pedido.Produtos)
    {
        pedidoProduto.PedidoId = pedido.Id;
        var pedidoProdutoDto = await SaveOrderProductAsync(pedidoProduto);

        if (pedidoProdutoDto == null)
            continue;

        pedidoProduto.Id = pedidoProdutoDto.Id;
    }

    var pedidoToReturn = await GetPedidoByIdAsync(pedidoDb.Id);

    if (pedidoToReturn == null)
        return Results.NotFound();

    var adminIds = await GetUsersIdsByPredicate(isAdmin: true);

    foreach (var adminId in adminIds)
        await SendToSignalRHub(realTimeHub, PEDIDO_REALTIME, adminId.ToString(), pedidoToReturn, new CancellationToken());

    return Results.Ok(pedidoToReturn);
});

app.MapDelete("/order/{id}", async ([FromRoute] int id, [FromQuery] bool removido) => {

    if (id == 0)
        return Results.NoContent();

    var pedidoDb = await context.Pedidos.FirstOrDefaultAsync(f => f.Id == id);

    if (pedidoDb == null)
        return Results.NotFound();

    pedidoDb.Removido = removido;
    context.Entry(pedidoDb).State = EntityState.Modified;

    await context.SaveChangesAsync();

    return Results.Ok(await context.SaveChangesAsync() > 0);

});

app.MapPut("/order/{id}/status/{index}", async ([FromRoute] int id, [FromRoute] int index, IHubContext<RealTimeHub> realTimeHub) => {
    var pedido = await context.Pedidos.FirstOrDefaultAsync(f => f.Id == id);

    if (pedido == null)
        return Results.NotFound("Não conseguimos achar o pedido...");

    pedido.StatusPedido = index;

    context.Entry(pedido).State = EntityState.Modified;

    await context.SaveChangesAsync();

    var pedidoToReturn = await GetPedidoByIdAsync(id);

    if (pedidoToReturn == null)
        return Results.Ok(true);

    var customerIds = await GetUsersIdsByPredicate(isAdmin: false, c => c.Id == pedidoToReturn.Cliente.Id);

    foreach (var adminId in customerIds)
        await SendToSignalRHub(realTimeHub, PEDIDO_REALTIME, adminId.ToString(), pedidoToReturn, new CancellationToken());


    return Results.Ok(true);
});

#endregion
#region Pedido Produto

app.MapPost("/orderProduct", async ([FromBody] PedidoProdutoDTO pedidoProduto) =>
{
    if (pedidoProduto == null || pedidoProduto.Produto == null)
        return Results.NoContent();

    var pp = await SaveOrderProductAsync(pedidoProduto);

    return Results.Ok(pp);
});

#endregion
#region Utils
async Task<PedidoProdutoDTO> SaveOrderProductAsync(PedidoProdutoDTO pedidoProduto)
{
    var pedidoProdutoDb = await context.PedidoProdutos.FirstOrDefaultAsync(pp => pp.Id == pedidoProduto.Id);

    if (pedidoProdutoDb == null)
    {
        pedidoProdutoDb = new PedidoProduto();
        context.Entry(pedidoProdutoDb).State = EntityState.Added;
    }

    pedidoProdutoDb.PedidoId = pedidoProduto.PedidoId;
    pedidoProdutoDb.ProdutoId = pedidoProduto.Produto.Id;
    pedidoProdutoDb.Descricao = pedidoProduto.Descricao;
    pedidoProdutoDb.Quantidade = pedidoProduto.Quantidade;
    pedidoProdutoDb.ValorTotal = pedidoProduto.ValorTotal;
    pedidoProdutoDb.EditadoPor = 1;
    pedidoProdutoDb.EditadoData = DateTime.Now;

    context.SavedChanges += (s, e) =>
    {
        pedidoProduto.Id = pedidoProdutoDb.Id;
    };

    await context.SaveChangesAsync();

    return pedidoProduto;
}
async Task<PedidoDTO?> GetPedidoByIdAsync(int id)
{
    return await (from pedido in context.Pedidos
           where pedido.Id == id
           select new PedidoDTO
           {
               Id = pedido.Id,
               Cliente = DtoFromModels.CustomerDtoFromModel(pedido.Cliente),
               Descricao = pedido.Descricao,
               StatusPedido = (StatusPedido)pedido.StatusPedido,
               TipoPagamento = (TipoPagamento)pedido.TipoPagamento,
               ValorTotal = pedido.ValorTotal,
               Produtos = pedido.PedidoProdutos.Select(s => new PedidoProdutoDTO()
               {
                   Id = s.Id,
                   PedidoId = pedido.Id,
                   Descricao = s.Descricao,
                   Quantidade = s.Quantidade,
                   ValorTotal = s.ValorTotal,
                   Produto = DtoFromModels.ProductDtoFromModel(s.Produto)
               })
                .ToList()
           }).FirstOrDefaultAsync();
}
async Task SendToSignalRHub(IHubContext<RealTimeHub> realTimeHub, string method, string idSubscription, object arg1, CancellationToken cancellationToken)
{
    if (RealTimeSubscriptionManager.SubscriptionAlreadyExists(idSubscription))
    {
        await realTimeHub.Clients.Group(idSubscription).SendAsync(method, arg1, cancellationToken);
        await Console.Out.WriteLineAsync("Objeto enviado realtime para o usuário:" + idSubscription);
    }    
}
async Task<int[]> GetUsersIdsByPredicate(bool isAdmin = false, Expression<Func<Cliente, bool>> where = null)
{

    if (isAdmin)
    {
        return await context.Usuarios
                        .Select(s => s.Id)
                        .ToArrayAsync();
    }

    return await context.Clientes
                        .Where(where ?? (o => true))
                        .Select(s => s.Id)
                        .ToArrayAsync();
}

#endregion

app.Run();
