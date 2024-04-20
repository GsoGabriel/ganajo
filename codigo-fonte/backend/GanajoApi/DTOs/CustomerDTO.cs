namespace GanajoApi.DTOs;

public partial class CustomerDTO
{
    public int Id { get; set; }

    public string Cpf { get; set; } = null!;

    public string Nome { get; set; } = null!;

    public string NumeroCasa { get; set; } = null!;

    public string? Complemento { get; set; }

    public string NumeroTelefone { get; set; } = null!;

    public RegiaoPostalDTO RegiaoPostal { get; set; }
}