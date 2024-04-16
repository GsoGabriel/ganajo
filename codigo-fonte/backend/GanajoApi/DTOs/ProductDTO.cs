//using GanajoApi.Models;

namespace GanajoApi.DTOs
{
    public class ProductDTO
    {
        public int Id { get; set; }

        public string? Nome { get; set; }

        public string Descricao { get; set; }

        public TimeSpan TempoPreparo { get; set; }

        public float Valor { get; set; }

        public string? EnderecoImagem { get; set; }

        public string? Categoria { get; set; }

        public int UsuarioId { get; set; }

        public string EditadoPorNome { get; set; }

        public DateTime? EditadoData { get; set; }
    }
}
