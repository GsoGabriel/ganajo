namespace GanajoApi.DTOs
{
    public class PedidoProdutoDTO
    {
        public int Id { get; set; }

        public int PedidoId { get; set; }

        public ProductDTO Produto { get; set; }

        public string? Descricao { get; set; }

        public int? Quantidade { get; set; }

        public float ValorTotal { get; set; }
    }
}
