using GanajoApi.DTOs;
using GanajoApi.Enums;
using GanajoApi.FromModels;
using GanajoApi.Hubs;
using GanajoApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using MySqlX.XDevAPI;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

var builder = WebApplication.CreateBuilder(args);

// DEPLOY
var port = Environment.GetEnvironmentVariable("PORT") ?? "8080";
var url = $"http://0.0.0.0:{port}";
var target = Environment.GetEnvironmentVariable("TARGET") ?? "World";

const string GANAJO_ORIGIN = "ganajoOrigin";

// REAL TIME HUBS
const string PEDIDO_REALTIME = "PEDIDO_REALTIME";

// ENDERECO DA APLICAÇÃO REACT (WEB)
const string address = "http://localhost:3000";

builder.Services.AddSignalR();
builder.Services.AddScoped<GanajoDbContext>();

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

app.MapGet("/", () => "Hello World!");

#region Produtos 

app.MapGet("/products", async ([FromServices] GanajoDbContext _context) =>
{
    return await _context.Produtos.Where(w => !w.Removido)
                                .OrderByDescending(o => o.Nome)
                                .Select(s => DtoFromModels.ProductDtoFromModel(s))
                                .ToListAsync();
});

app.MapGet("/product/{id}", async ([FromRoute] int id, [FromServices] GanajoDbContext _context) =>
{
    if(id == 0)
        return Results.NoContent();

    var product = await _context.Produtos.FirstOrDefaultAsync(f => f.Id == id);

    if (product != null)
        return Results.Ok(DtoFromModels.ProductDtoFromModel(product));

    return Results.NotFound("Produto não encontrado...");
});

app.MapPost("/product", async ([FromBody] ProductDTO product, [FromServices] GanajoDbContext _context) =>
{
    if (product == null)
        return default;

    var productDb = await _context.Produtos.FirstOrDefaultAsync(f => f.Id == product.Id);

    if (productDb == null)
    {
        productDb = new Produto();
        _context.Entry(productDb).State = EntityState.Added;
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

    _context.SavedChanges += (s, e) =>
    {
        product.Id = productDb.Id;
    };

    await _context.SaveChangesAsync();

    return product;
});

app.MapDelete("/product/{id}", async ([FromRoute] int id, [FromQuery] bool removido, [FromServices] GanajoDbContext _context) => {
    if(id == 0)
        return Results.NoContent();

    var product = await _context.Produtos.FirstOrDefaultAsync(p => p.Id == id);

    if(product == null)
        return Results.NotFound("Produto não encontrado...");

    product.Removido = removido;

    _context.Entry(product).State = EntityState.Modified;

    return Results.Ok(await _context.SaveChangesAsync() > 0);
});

#endregion
#region Clientes

app.MapGet("/customers", async ([FromServices] GanajoDbContext _context) => {

    var customers = await _context.Clientes
                                .Include(i => i.RegiaoPostal)
                                .OrderByDescending(o => o.Nome)
                                .Select(s => DtoFromModels.CustomerDtoFromModel(s))
                                .ToListAsync();

    if(!customers.Any())
        return Results.NotFound("Cliente não encontrado..."); 

    return Results.Ok(customers);
});

app.MapGet("/customer/{telephone}", async ([FromRoute] string telephone, [FromServices] GanajoDbContext _context) => {
    if (string.IsNullOrEmpty(telephone))
        return Results.NoContent();

    var cliente = await _context.Clientes
                            .Include(i => i.RegiaoPostal)
                            .FirstOrDefaultAsync(f => f.NumeroTelefone.Equals(telephone));

    if (cliente == null)
        return Results.NotFound("Cliente não encontrado...");

    return Results.Ok(DtoFromModels.CustomerDtoFromModel(cliente));
});

app.MapPost("/customer", async ([FromBody] CustomerDTO customer, [FromServices] GanajoDbContext _context) => {

    if (customer == null)
        return Results.NotFound();

    var customerSaved = SaveCustomerAsync(customer, _context);

    return Results.Ok(customerSaved);
});

#endregion
#region Regiao Postal

app.MapGet("/postalcodes", async ([FromServices] GanajoDbContext _context) => {

    var regioes = await _context.RegiaoPostals
                                .Where(w => !w.Removido)
                                .OrderByDescending(o => o.Bairro)
                                .Select(s => DtoFromModels.RegiaoDtoFromModel(s))
                                .ToListAsync();

    if(!regioes.Any())
        return Results.NotFound("Região Postal não encontrada..."); 

    return Results.Ok(regioes);
});

app.MapGet("/postalcode/{id}", async ([FromRoute] int id, [FromServices] GanajoDbContext _context) => {
    if(id == 0)
        return Results.NoContent();

    var regiaoPostal = await _context.RegiaoPostals.FirstOrDefaultAsync(f => f.Id == id);

    if(regiaoPostal == null)
        return Results.NotFound("Região Postal não encontrada...");

    return Results.Ok(DtoFromModels.RegiaoDtoFromModel(regiaoPostal));
});

app.MapPost("/postalcode", async ([FromBody] RegiaoPostalDTO regiaoPostal, [FromServices] GanajoDbContext _context) => {
    if(regiaoPostal == null)
        return Results.NoContent();

    var regiaoPostalAfterSave = await SaveRegiaoPostalAsync(regiaoPostal, _context);

    return Results.Ok(regiaoPostal);
});

app.MapDelete("/postalcode/{id}", async ([FromRoute] int id, [FromQuery] bool removido, [FromServices] GanajoDbContext _context) => {

    if(id == 0)
        return Results.NoContent();

    var regiaoPostalDb = await _context.RegiaoPostals.FirstOrDefaultAsync(f => f.Id == id);

    if(regiaoPostalDb == null)
        return Results.NotFound("Região Postal não encontrada...");

    regiaoPostalDb.Removido = removido;
    _context.Entry(regiaoPostalDb).State = EntityState.Modified;

    return Results.Ok(await _context.SaveChangesAsync() > 0);

});

#endregion
#region Pedidos

app.MapGet("/orders/{admin}", async ([FromRoute] bool admin, [FromQuery] int idUser, [FromServices] GanajoDbContext _context) => {

    var pedidos = await (from pedido in _context.Pedidos
                         where !pedido.Removido && (admin) ? true : pedido.ClienteId == idUser
                         select new PedidoDTO
                         {
                             Id = pedido.Id,
                             Cliente = new CustomerDTO()
                             {
                                 Id = pedido.Cliente.Id,
                                 Cpf = pedido.Cliente.Cpf,
                                 Nome = pedido.Cliente.Nome,
                                 NumeroCasa = pedido.Cliente.NumeroCasa,
                                 Complemento = pedido.Cliente.Complemento,
                                 NumeroTelefone = pedido.Cliente.NumeroTelefone,
                                 Endereco = pedido.Cliente.Endereco,
                                 RegiaoPostal = new RegiaoPostalDTO()
                                 {
                                     Id = pedido.Cliente.RegiaoPostal.Id,
                                     Bairro = pedido.Cliente.RegiaoPostal.Bairro,
                                     Cep = pedido.Cliente.RegiaoPostal.Cep,
                                     PrecoDelivery = pedido.Cliente.RegiaoPostal.PrecoDelivery,
                                     EditadoPor = pedido.Cliente.RegiaoPostal.EditadoPor,
                                     EditadoData = pedido.Cliente.RegiaoPostal.EditadoData
                                 }
                             },
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
                             }).ToList(),
                             EditadoData = pedido.EditadoData ?? DateTime.Now
                         })
                         .OrderByDescending(o => o.EditadoData)
                         .ToListAsync();

    if (pedidos == null || !pedidos.Any())
        return Results.NotFound("Não há pedidos na base de dados...");

    return Results.Ok(pedidos);
});

app.MapGet("/order/{id}", async ([FromRoute] int id, [FromServices] GanajoDbContext _context) => {

    if (id == 0)
        return Results.NoContent();

    var pedidoDto = await GetPedidoByIdAsync(id, _context);

    if (pedidoDto == null)
        return Results.NotFound("Pedido não encontrado...");

    return Results.Ok(pedidoDto);
});

app.MapPost("/order", async ([FromBody] PedidoDTO pedido, IHubContext<RealTimeHub> realTimeHub, [FromServices] GanajoDbContext _context) => {

    if (pedido == null || !pedido.Produtos.Any())
        return Results.NoContent();

    var customerUpdated = await SaveCustomerAsync(pedido.Cliente, _context);
    pedido.Cliente = customerUpdated;

    var pedidoDb = await _context
                            .Pedidos
                            .FirstOrDefaultAsync(f => f.Id == pedido.Id);

    if (pedidoDb == null)
    {
        pedidoDb = new Pedido();
        _context.Entry(pedidoDb).State = EntityState.Added;
    }

    pedidoDb.Descricao = pedido.Descricao;

    pedidoDb.ValorTotal = pedido.Produtos.Sum(s => {
        s.ValorTotal = s.Produto.Valor * (s.Quantidade ?? 1);
        return s.ValorTotal;
    }) + pedido.Cliente.RegiaoPostal.PrecoDelivery;

    pedidoDb.StatusPedido = (int)pedido.StatusPedido;
    pedidoDb.TipoPagamento = (int)pedido.TipoPagamento;
    pedidoDb.Removido = pedido.Removido;
    pedidoDb.EditadoPor = 1;
    pedidoDb.EditadoData = DateTime.Now;
    pedidoDb.ClienteId = pedido.Cliente.Id;

    _context.SavedChanges += (s, e) => {
        pedido.Id = pedidoDb.Id;
    };

    await _context.SaveChangesAsync();

    foreach (var pedidoProduto in pedido.Produtos)
    {
        pedidoProduto.PedidoId = pedido.Id;
        var pedidoProdutoDto = await SaveOrderProductAsync(pedidoProduto, _context);

        if (pedidoProdutoDto == null)
            continue;

        pedidoProduto.Id = pedidoProdutoDto.Id;
    }

    var pedidoToReturn = await GetPedidoByIdAsync(pedidoDb.Id, _context);

    if (pedidoToReturn == null)
        return Results.NotFound();

    var adminIds = await GetUsersIdsByPredicate(_context, isAdmin: true);

    foreach (var adminId in adminIds)
        await SendToSignalRHub(realTimeHub, PEDIDO_REALTIME, adminId.ToString(), pedidoToReturn, new CancellationToken());

    return Results.Ok(pedidoToReturn);
});

app.MapDelete("/order/{id}", async ([FromRoute] int id, [FromQuery] bool removido, [FromServices] GanajoDbContext _context) => {

    if (id == 0)
        return Results.NoContent();

    var pedidoDb = await _context.Pedidos.FirstOrDefaultAsync(f => f.Id == id);

    if (pedidoDb == null)
        return Results.NotFound();

    pedidoDb.Removido = removido;
    _context.Entry(pedidoDb).State = EntityState.Modified;

    await _context.SaveChangesAsync();

    return Results.Ok(await _context.SaveChangesAsync() > 0);

});

app.MapPut("/order/{id}/status/{index}", async ([FromRoute] int id, [FromRoute] int index, IHubContext<RealTimeHub> realTimeHub, [FromServices] GanajoDbContext _context) => {
    var pedido = await _context.Pedidos.FirstOrDefaultAsync(f => f.Id == id);

    if (pedido == null)
        return Results.NotFound("Não conseguimos achar o pedido...");

    pedido.StatusPedido = index;

    _context.Entry(pedido).State = EntityState.Modified;

    await _context.SaveChangesAsync();

    var pedidoToReturn = await GetPedidoByIdAsync(id, _context);

    if (pedidoToReturn == null)
        return Results.Ok(true);

    var customerIds = await GetUsersIdsByPredicate(_context, isAdmin: false, c => c.Id == pedidoToReturn.Cliente.Id);

    foreach (var adminId in customerIds)
        await SendToSignalRHub(realTimeHub, PEDIDO_REALTIME, adminId.ToString(), pedidoToReturn, new CancellationToken());


    return Results.Ok(true);
});

#endregion
#region Pedido Produto

app.MapPost("/orderProduct", async ([FromBody] PedidoProdutoDTO pedidoProduto, [FromServices] GanajoDbContext _context) =>
{
    if (pedidoProduto == null || pedidoProduto.Produto == null)
        return Results.NoContent();

    var pp = await SaveOrderProductAsync(pedidoProduto, _context);

    return Results.Ok(pp);
});

#endregion
#region Overview Statistics
app.MapGet("/statistics", async ([FromServices] GanajoDbContext _context) =>
{
    StatisticsDTO statistics = new StatisticsDTO();

    var values = await _context.Pedidos
                            .Where(w => !w.Removido)
                            .Include(i => i.PedidoProdutos)
                            .ThenInclude(i => i.Produto)
                            .ToListAsync();

    statistics.Vendas = values.Sum(s => s.ValorTotal);

    List<PedidoProduto> pedidoProdutos = new List<PedidoProduto>();

    foreach (var value in values)
        pedidoProdutos.AddRange(value.PedidoProdutos);

    var categoriasGrouped = pedidoProdutos.GroupBy(g => g.Produto.Categoria);

    var topCategorias = new List<Statistic>();
    foreach (var grouped in categoriasGrouped)
    {
        topCategorias.Add(new Statistic()
        {
            Key = grouped.Key,
            Value = grouped.Sum(o => o.Quantidade).ToString()
        });
    }

    statistics.TopCategorias = topCategorias
                                .OrderBy(o => o.Value)
                                .Take(3)
                                .ToArray();

    var pedidosStatusGrouped = values.GroupBy(g => g.StatusPedido);

    var statusPedidos = new List<Statistic>();
    foreach (var grouped in pedidosStatusGrouped)
    {
        statusPedidos.Add(new Statistic()
        {
            Key = ((StatusPedido)grouped.Key).ToString(),
            Value = grouped.Count().ToString()
        });
    }

    statistics.TopPedidos = statusPedidos
                                .OrderBy(o => o.Value)
                                .ToArray();

    statistics.QtdBairros = _context.RegiaoPostals.Count();
    statistics.QtdClientes = _context.Clientes.Count();
    statistics.QtdProdutos = _context.Produtos.Count();
    statistics.PrecoMedio = _context.Produtos.Average(p => p.Valor);

    return statistics;

});
#endregion
#region Utils
async Task<PedidoProdutoDTO> SaveOrderProductAsync(PedidoProdutoDTO pedidoProduto, [FromServices] GanajoDbContext _context)
{
    var pedidoProdutoDb = await _context.PedidoProdutos.FirstOrDefaultAsync(pp => pp.Id == pedidoProduto.Id);

    if (pedidoProdutoDb == null)
    {
        pedidoProdutoDb = new PedidoProduto();
        _context.Entry(pedidoProdutoDb).State = EntityState.Added;
    }

    pedidoProdutoDb.PedidoId = pedidoProduto.PedidoId;
    pedidoProdutoDb.ProdutoId = pedidoProduto.Produto.Id;
    pedidoProdutoDb.Descricao = pedidoProduto.Descricao;
    pedidoProdutoDb.Quantidade = pedidoProduto.Quantidade;
    pedidoProdutoDb.ValorTotal = pedidoProduto.ValorTotal;
    pedidoProdutoDb.EditadoPor = 1;
    pedidoProdutoDb.EditadoData = DateTime.Now;

    _context.SavedChanges += (s, e) =>
    {
        pedidoProduto.Id = pedidoProdutoDb.Id;
    };

    await _context.SaveChangesAsync();

    return pedidoProduto;
}
async Task<PedidoDTO?> GetPedidoByIdAsync(int id, [FromServices] GanajoDbContext _context)
{
    return await (from pedido in _context.Pedidos
           where pedido.Id == id
           select new PedidoDTO
           {
               Id = pedido.Id,
               Cliente = new CustomerDTO()
               {
                   Id = pedido.Cliente.Id,
                   Cpf = pedido.Cliente.Cpf,
                   Nome = pedido.Cliente.Nome,
                   NumeroCasa = pedido.Cliente.NumeroCasa,
                   Complemento = pedido.Cliente.Complemento,
                   NumeroTelefone = pedido.Cliente.NumeroTelefone,
                   Endereco = pedido.Cliente.Endereco,
                   RegiaoPostal = new RegiaoPostalDTO()
                   {
                       Id = pedido.Cliente.RegiaoPostal.Id,
                       Bairro = pedido.Cliente.RegiaoPostal.Bairro,
                       Cep = pedido.Cliente.RegiaoPostal.Cep,
                       PrecoDelivery = pedido.Cliente.RegiaoPostal.PrecoDelivery,
                       EditadoPor = pedido.Cliente.RegiaoPostal.EditadoPor,
                       EditadoData = pedido.Cliente.RegiaoPostal.EditadoData
                   }
               },
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
async Task<int[]> GetUsersIdsByPredicate([FromServices] GanajoDbContext _context, bool isAdmin = false, Expression<Func<Cliente, bool>> where = null)
{

    if (isAdmin)
    {
        return await _context.Usuarios
                        .Select(s => s.Id)
                        .ToArrayAsync();
    }

    return await _context.Clientes
                        .Include(i => i.RegiaoPostal)
                        .Where(where ?? (o => true))
                        .Select(s => s.Id)
                        .ToArrayAsync();
}
async Task<CustomerDTO> SaveCustomerAsync(CustomerDTO customer, GanajoDbContext _context)
{

    var customerDb = await _context.Clientes
                                    .Include(i => i.RegiaoPostal)
                                    .FirstOrDefaultAsync(f => f.Id == customer.Id);

    if (customerDb == null)
    {
        customerDb = new Cliente();
        _context.Entry(customerDb).State = EntityState.Added;
    }

    customerDb.Nome = customer.Nome;
    customerDb.Cpf = customer.Cpf;
    customerDb.Endereco = customer.Endereco;
    customerDb.NumeroCasa = customer.NumeroCasa;
    customerDb.Complemento = customer.Complemento;
    customerDb.NumeroTelefone = customer.NumeroTelefone;
    customerDb.RegiaoPostalId = customer.RegiaoPostal.Id;
    customerDb.EditadoData = DateTime.Now;

    var rPostal = await _context.RegiaoPostals.FirstOrDefaultAsync(f => f.Id == customer.RegiaoPostal.Id);
    if(rPostal != null)
        customer.RegiaoPostal = DtoFromModels.RegiaoDtoFromModel(rPostal);

    _context.SavedChanges += (s, e) => {
        customer.Id = customerDb.Id;
    };

    await _context.SaveChangesAsync();

    return customer;
}
async Task<RegiaoPostalDTO> SaveRegiaoPostalAsync(RegiaoPostalDTO regiaoPostal, GanajoDbContext _context)
{
    var regiaoPostalDb = await _context.RegiaoPostals.FirstOrDefaultAsync(f => f.Id == regiaoPostal.Id);

    if (regiaoPostalDb == null)
    {
        regiaoPostalDb = new RegiaoPostal();
        _context.Entry(regiaoPostalDb).State = EntityState.Added;
    }

    regiaoPostalDb.Bairro = regiaoPostal.Bairro;
    regiaoPostalDb.Cep = regiaoPostal.Cep;
    regiaoPostalDb.PrecoDelivery = regiaoPostal.PrecoDelivery;
    regiaoPostalDb.EditadoData = DateTime.Now;
    regiaoPostalDb.EditadoPor = 1;

    _context.SavedChanges += (s, e) => {
        regiaoPostal.Id = regiaoPostalDb.Id;
    };

    await _context.SaveChangesAsync();

    return regiaoPostal;
}
#endregion

if (app.Environment.IsDevelopment())
{
    app.Run();
}
else
{
    app.Run(url);
}


