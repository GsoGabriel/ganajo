using System;
using System.Collections.Generic;

namespace GanajoApi.Models;

public partial class Cliente
{
    public int Id { get; set; }

    public string Cpf { get; set; } = null!;

    public string Nome { get; set; } = null!;

    public string NumeroCasa { get; set; } = null!;

    public string? Complemento { get; set; }

    public string NumeroTelefone { get; set; } = null!;

    public int RegiaoPostalId { get; set; }

    public string Endereco { get; set; } = null!;

    public DateTime? EditadoData { get; set; }

    public virtual ICollection<Pedido> Pedidos { get; set; } = new List<Pedido>();

    public virtual RegiaoPostal RegiaoPostal { get; set; } = null!;
}
