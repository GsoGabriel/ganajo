using GanajoAuthApi.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BCrypt.Net;

var builder = WebApplication.CreateBuilder(args);

// DEPLOY
var port = Environment.GetEnvironmentVariable("PORT") ?? "8080";
var url = $"http://0.0.0.0:{port}";
var target = Environment.GetEnvironmentVariable("TARGET") ?? "World";

const string GANAJO_ORIGIN_AUTH = "ganajoOriginAuth";

// ENDERECO DA APLICA��O REACT (WEB)
const string address = "http://localhost:3000";

builder.Services.AddCors(options =>
{
	options.AddPolicy(name: GANAJO_ORIGIN_AUTH,
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
   .UseCors(GANAJO_ORIGIN_AUTH);

var ganajoMiniContext = new GanajoMiniDbContext();

app.MapGet("/", () => "Ganajo Auth is ONLINE!");

app.MapGet("/users", async () =>
{
    return await ganajoMiniContext.Usuarios.OrderByDescending(o => o.Nome).ToListAsync();
});

app.MapGet("/user/{id}", async ([FromRoute] int id) =>
{
    return await ganajoMiniContext.Usuarios.FirstOrDefaultAsync(f => f.Id == id);
});

app.MapPost("/user", async ([FromBody] UsuarioDTO usuario) =>
{
    if (usuario == null)
        return Results.NoContent();

    var usuarioDb = await ganajoMiniContext.Usuarios.FirstOrDefaultAsync(u => u.Id == usuario.Id);
    
    if(usuarioDb == null)
    {
        usuarioDb = new GanajoAuthApi.Models.Usuario();
        ganajoMiniContext.Entry(usuarioDb).State = EntityState.Added;
    }

    usuarioDb.Nome = usuario.Nome;
    usuarioDb.Email = usuario.Email;
    usuarioDb.Senha = BCrypt.Net.BCrypt.HashPassword(usuario.Senha);
    usuarioDb.EditadoData = DateTime.Now;

    ganajoMiniContext.SavedChanges += (s, e) =>
    {
        usuario.Id = usuarioDb.Id;
    };

    await ganajoMiniContext.SaveChangesAsync();

    return Results.Ok(usuario);
});

app.MapDelete("/user/{id}", async ([FromRoute] int id) =>
{
    if (id == 0)
        return Results.NoContent();

    var usuarioDb = await ganajoMiniContext.Usuarios.FirstOrDefaultAsync(u => u.Id == id);

    if (usuarioDb == null)
        return Results.NotFound();

    ganajoMiniContext.Entry(usuarioDb).State = EntityState.Deleted;

    return Results.Ok(await ganajoMiniContext.SaveChangesAsync() > 0);

});

app.MapGet("/login", async ([FromQuery] string email, [FromQuery] string senha) =>
{
    if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(senha))
        return Results.NoContent();

    var usuario = await ganajoMiniContext.Usuarios.FirstOrDefaultAsync(u => email.Equals(u.Email));

    if (usuario == null || !BCrypt.Net.BCrypt.Verify(senha, usuario.Senha))
    {
        return Results.NotFound("Usuario/senha inv�lidos...");
    }

    return Results.Ok(usuario);
});

if (app.Environment.IsDevelopment())
{
    app.Run();
}
else
{
    app.Run(url);
}
