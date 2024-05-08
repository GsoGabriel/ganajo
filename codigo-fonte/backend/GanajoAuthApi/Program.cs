using GanajoAuthApi.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

const string GANAJO_ORIGIN_AUTH = "ganajoOriginAuth";

// ENDERECO DA APLICAÇÃO REACT (WEB)
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
    usuarioDb.Senha = string.IsNullOrEmpty(usuario.Senha) ? string.Empty : usuario.Senha;
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

    var usuario = await ganajoMiniContext.Usuarios.FirstOrDefaultAsync(u => email.Equals(u.Email) && senha.Equals(u.Senha));

    if(usuario == null)
    {
        return Results.NotFound("Usuario/senha inválidos...");
    }

    return Results.Ok(usuario);
});

app.Run();
