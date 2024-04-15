using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace GanajoApi.Models;

public partial class GanajoDbContext : DbContext
{
    public GanajoDbContext()
    {
    }

    public GanajoDbContext(DbContextOptions<GanajoDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Cliente> Clientes { get; set; }

    public virtual DbSet<Pedido> Pedidos { get; set; }

    public virtual DbSet<PedidoProduto> PedidoProdutos { get; set; }

    public virtual DbSet<Produto> Produtos { get; set; }

    public virtual DbSet<RegiaoPostal> RegiaoPostals { get; set; }

    public virtual DbSet<Usuario> Usuarios { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) => optionsBuilder.UseMySQL("Server=mysql-ag-br1-20.conteige.cloud;Database=gwpvgo_database;user=gwpvgo_user;password=o8xAnRtWIW;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Cliente>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("Cliente");

            entity.HasIndex(e => e.RegiaoPostalId, "RegiaoPostalId");

            entity.Property(e => e.Complemento).HasMaxLength(100);
            entity.Property(e => e.Cpf)
                .HasMaxLength(20)
                .HasColumnName("CPF");
            entity.Property(e => e.Nome).HasMaxLength(100);
            entity.Property(e => e.NumeroCasa).HasMaxLength(20);
            entity.Property(e => e.NumeroTelefone).HasMaxLength(20);

            entity.HasOne(d => d.RegiaoPostal).WithMany(p => p.Clientes)
                .HasForeignKey(d => d.RegiaoPostalId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Cliente_ibfk_1");
        });

        modelBuilder.Entity<Pedido>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("Pedido");

            entity.HasIndex(e => e.ClienteId, "ClienteId");

            entity.HasIndex(e => e.EditadoPor, "EditadoPor");

            entity.Property(e => e.Descricao).HasMaxLength(255);
            entity.Property(e => e.EditadoData).HasColumnType("datetime");
            entity.Property(e => e.StatusPedido).HasDefaultValueSql("'0'");
            entity.Property(e => e.TipoPagamento).HasDefaultValueSql("'0'");

            entity.HasOne(d => d.Cliente).WithMany(p => p.Pedidos)
                .HasForeignKey(d => d.ClienteId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Pedido_ibfk_1");

            entity.HasOne(d => d.EditadoPorNavigation).WithMany(p => p.Pedidos)
                .HasForeignKey(d => d.EditadoPor)
                .HasConstraintName("Pedido_ibfk_2");
        });

        modelBuilder.Entity<PedidoProduto>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("PedidoProduto");

            entity.HasIndex(e => e.EditadoPor, "EditadoPor");

            entity.HasIndex(e => e.PedidoId, "PedidoId");

            entity.HasIndex(e => e.ProdutoId, "ProdutoId");

            entity.Property(e => e.Descricao).HasMaxLength(255);
            entity.Property(e => e.EditadoData).HasColumnType("datetime");
            entity.Property(e => e.Quantidade).HasDefaultValueSql("'1'");

            entity.HasOne(d => d.EditadoPorNavigation).WithMany(p => p.PedidoProdutos)
                .HasForeignKey(d => d.EditadoPor)
                .HasConstraintName("PedidoProduto_ibfk_3");

            entity.HasOne(d => d.Pedido).WithMany(p => p.PedidoProdutos)
                .HasForeignKey(d => d.PedidoId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("PedidoProduto_ibfk_1");

            entity.HasOne(d => d.Produto).WithMany(p => p.PedidoProdutos)
                .HasForeignKey(d => d.ProdutoId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("PedidoProduto_ibfk_2");
        });

        modelBuilder.Entity<Produto>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("Produto");

            entity.HasIndex(e => e.EditadoPor, "EditadoPor");

            entity.HasIndex(e => e.UsuarioId, "UsuarioId");

            entity.Property(e => e.Categoria)
                .HasMaxLength(100)
                .HasDefaultValueSql("'Geral'");
            entity.Property(e => e.Descricao).HasMaxLength(255);
            entity.Property(e => e.EditadoData).HasColumnType("datetime");
            entity.Property(e => e.EnderecoImagem).HasMaxLength(255);
            entity.Property(e => e.Nome).HasMaxLength(100);
            entity.Property(e => e.TempoPreparo)
                .HasDefaultValueSql("'00:00:20'")
                .HasColumnType("time");

            entity.HasOne(d => d.EditadoPorNavigation).WithMany(p => p.ProdutoEditadoPorNavigations)
                .HasForeignKey(d => d.EditadoPor)
                .HasConstraintName("Produto_ibfk_2");

            entity.HasOne(d => d.Usuario).WithMany(p => p.ProdutoUsuarios)
                .HasForeignKey(d => d.UsuarioId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Produto_ibfk_1");
        });

        modelBuilder.Entity<RegiaoPostal>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("RegiaoPostal");

            entity.HasIndex(e => e.EditadoPor, "EditadoPor");

            entity.Property(e => e.Bairro).HasMaxLength(100);
            entity.Property(e => e.Cep).HasMaxLength(20);
            entity.Property(e => e.EditadoData).HasColumnType("datetime");

            entity.HasOne(d => d.EditadoPorNavigation).WithMany(p => p.RegiaoPostals)
                .HasForeignKey(d => d.EditadoPor)
                .HasConstraintName("RegiaoPostal_ibfk_1");
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("Usuario");

            entity.Property(e => e.EditadoData).HasColumnType("datetime");
            entity.Property(e => e.Email).HasMaxLength(100);
            entity.Property(e => e.Nome).HasMaxLength(100);
            entity.Property(e => e.Senha).HasMaxLength(100);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
