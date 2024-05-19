namespace GanajoApi.DTOs
{
    public class StatisticsDTO
    {
        public double Vendas { get; set; }

        public Statistic[] TopCategorias { get; set; }
        public Statistic[] TopStatusPedidos { get; set; }
        public Statistic[] TopProdutos { get; set; }

        public int QtdClientes { get; set; }
        public int QtdBairros { get; set; }
        public int QtdProdutos { get; set; }
        public float PrecoMedio { get; set; }
    }

    public class Statistic
    {
        public string Key { get; set; }
        public string Value { get; set; }
    }
}
