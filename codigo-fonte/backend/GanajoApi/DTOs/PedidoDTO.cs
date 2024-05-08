using GanajoApi.Enums;

namespace GanajoApi.DTOs
{
    public class PedidoDTO
    {
        public int Id { get; set; }

        public string? Descricao { get; set; }

        public float ValorTotal { get; set; }

        public StatusPedido StatusPedido { get; set; }

        public TipoPagamento TipoPagamento { get; set; }
        public bool Removido { get; set; }
        public DateTime EditadoData { get; set; }

        public CustomerDTO Cliente { get; set; }

        public List<PedidoProdutoDTO> Produtos { get; set; } = new List<PedidoProdutoDTO>();
    }
}
