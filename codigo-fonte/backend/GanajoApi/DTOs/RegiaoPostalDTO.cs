
using GanajoApi.Models;

namespace GanajoApi.DTOs
{
    public class RegiaoPostalDTO
    {
        public int Id { get; set; }

        public string Bairro { get; set; } = null!;

        public string Cep { get; set; } = null!;

        public float PrecoDelivery { get; set; }

        public int? EditadoPor { get; set; }

        public DateTime? EditadoData { get; set; }
    }
}
