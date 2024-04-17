using System;
using System.Collections.Generic;

namespace GanajoApi.Models;

public partial class Produto
{
    public int Id { get; set; }

    public string Nome { get; set; } = null!;

    public string Descricao { get; set; } = null!;

    public TimeSpan TempoPreparo { get; set; }

    public float Valor { get; set; }

    public string? EnderecoImagem { get; set; }

    public string? Categoria { get; set; }
    public bool Removido {get;set;}

    public int UsuarioId { get; set; }

    public int? EditadoPor { get; set; }

    public DateTime? EditadoData { get; set; }

    public virtual Usuario? EditadoPorNavigation { get; set; }

    public virtual ICollection<PedidoProduto> PedidoProdutos { get; set; } = new List<PedidoProduto>();

    public virtual Usuario Usuario { get; set; } = null!;
}
