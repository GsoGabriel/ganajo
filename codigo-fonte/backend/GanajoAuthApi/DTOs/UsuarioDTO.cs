namespace GanajoAuthApi.DTOs
{
    public class UsuarioDTO
    {
        public int Id { get; set; }

        public string Nome { get; set; } = null!;

        public string Email { get; set; } = null!;
        public string Senha { get; set; } = null!;

        public DateTime? EditadoData { get; set; }
    }
}
