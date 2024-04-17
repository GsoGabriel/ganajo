using GanajoAuthApi.Models;
using Microsoft.EntityFrameworkCore;

public partial class GanajoMiniDbContext : DbContext
{
    public GanajoMiniDbContext()
    {
    }

    public GanajoMiniDbContext(DbContextOptions<GanajoMiniDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Usuario> Usuarios { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) => optionsBuilder.UseMySQL("Server=mysql-ag-br1-20.conteige.cloud;Database=gwpvgo_database;user=gwpvgo_user;password=o8xAnRtWIW;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
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
