using System;
using System.Collections.Generic;

namespace GanajoApi.Models;

public partial class Usuario
{
    public int Id { get; set; }

    public string Nome { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Senha { get; set; } = null!;

    public DateTime? EditadoData { get; set; }

    public virtual ICollection<PedidoProduto> PedidoProdutos { get; set; } = new List<PedidoProduto>();

    public virtual ICollection<Pedido> Pedidos { get; set; } = new List<Pedido>();

    public virtual ICollection<Produto> ProdutoEditadoPorNavigations { get; set; } = new List<Produto>();

    public virtual ICollection<Produto> ProdutoUsuarios { get; set; } = new List<Produto>();

    public virtual ICollection<RegiaoPostal> RegiaoPostals { get; set; } = new List<RegiaoPostal>();
}
