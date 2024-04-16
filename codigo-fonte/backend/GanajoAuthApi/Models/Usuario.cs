using System;
using System.Collections.Generic;

namespace GanajoAuthApi.Models;

public partial class Usuario
{
    public int Id { get; set; }

    public string Nome { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Senha { get; set; } = null!;

    public DateTime? EditadoData { get; set; }
}
