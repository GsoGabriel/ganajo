using System;
using System.Collections.Generic;

namespace GanajoApi.Models;

public partial class RegiaoPostal
{
    public int Id { get; set; }

    public string Bairro { get; set; } = null!;

    public string Cep { get; set; } = null!;

    public float PrecoDelivery { get; set; }

    public int? EditadoPor { get; set; }

    public DateTime? EditadoData { get; set; }

    public virtual ICollection<Cliente> Clientes { get; set; } = new List<Cliente>();

    public virtual Usuario? EditadoPorNavigation { get; set; }
}
