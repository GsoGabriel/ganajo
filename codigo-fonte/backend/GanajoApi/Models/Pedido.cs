using System;
using System.Collections.Generic;

namespace GanajoApi.Models;

public partial class Pedido
{
    public int Id { get; set; }

    public string? Descricao { get; set; }

    public float ValorTotal { get; set; }

    public int? StatusPedido { get; set; }

    public int? TipoPagamento { get; set; }

    public int ClienteId { get; set; }

    public int? EditadoPor { get; set; }

    public DateTime? EditadoData { get; set; }

    public virtual Cliente Cliente { get; set; } = null!;

    public virtual Usuario? EditadoPorNavigation { get; set; }

    public virtual ICollection<PedidoProduto> PedidoProdutos { get; set; } = new List<PedidoProduto>();
}
