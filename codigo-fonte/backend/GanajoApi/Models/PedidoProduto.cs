using System;
using System.Collections.Generic;

namespace GanajoApi.Models;

public partial class PedidoProduto
{
    public int Id { get; set; }

    public int PedidoId { get; set; }

    public int ProdutoId { get; set; }

    public string? Descricao { get; set; }

    public int? Quantidade { get; set; }

    public float ValorTotal { get; set; }

    public int? EditadoPor { get; set; }

    public DateTime? EditadoData { get; set; }

    public virtual Usuario? EditadoPorNavigation { get; set; }

    public virtual Pedido Pedido { get; set; } = null!;

    public virtual Produto Produto { get; set; } = null!;
}
