## Arquitetura da Solução
![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e5-proj-empext-t4-pmv-ads-2024-1-e5-projganajo/assets/16859514/6051fdd1-9c5a-4a64-845e-15ff9f3a47e4)


## Diagrama de Classes
![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e5-proj-empext-t4-pmv-ads-2024-1-e5-projganajo/assets/16859514/2c01d257-4fde-45a0-91cb-5ee2432040dc)


## Modelo ER

![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e5-proj-empext-t4-pmv-ads-2024-1-e5-projganajo/assets/16859514/3b7e12b4-ea25-4f54-ac82-e95145dacb1f)


## Esquema Relacional
![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e5-proj-empext-t4-pmv-ads-2024-1-e5-projganajo/assets/16859514/ca221702-707a-42b6-8b16-bcbca4902dd6)



## Modelo Fisico
``` SQL
-- Criando a tabela RegiaoPostal
CREATE TABLE RegiaoPostal (
    Id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    Bairro VARCHAR(100) NOT NULL,
    Cep VARCHAR(20) NOT NULL,
    PrecoDelivery FLOAT NOT NULL,
    Removido bit NOT NULL DEFAULT 0,
    EditadoPor INT NULL,
    EditadoData DATETIME NULL,
    FOREIGN KEY (EditadoPor) REFERENCES Usuario(Id)
);

-- Criando a tabela Cliente
CREATE TABLE Cliente (
    Id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    CPF VARCHAR(20) NOT NULL,
    Nome VARCHAR(100) NOT NULL,
    NumeroCasa VARCHAR(20) NOT NULL,
    Complemento VARCHAR(100) NULL,
    NumeroTelefone VARCHAR(20) NOT NULL,
    RegiaoPostalId INT NOT NULL,
    FOREIGN KEY (RegiaoPostalId) REFERENCES RegiaoPostal(Id)
);

-- Criando a tabela Pedido
CREATE TABLE Pedido (
    Id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    Descricao VARCHAR(255) NULL,
    ValorTotal FLOAT NOT NULL,
    StatusPedido INT NULL DEFAULT 0,
    TipoPagamento INT NULL DEFAULT 0,
    ClienteId INT NOT NULL,
    Removido bit NOT NULL DEFAULT 0,
    EditadoPor INT NULL,
    EditadoData DATETIME NULL,
    FOREIGN KEY (ClienteId) REFERENCES Cliente(Id),
    FOREIGN KEY (EditadoPor) REFERENCES Usuario(Id)
);

-- Criando a tabela PedidoProduto
CREATE TABLE PedidoProduto (
    Id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    PedidoId INT NOT NULL,
    ProdutoId INT NOT NULL,
    Descricao VARCHAR(255) NULL,
    Quantidade INT NULL DEFAULT 1,
    ValorTotal FLOAT NOT NULL,
    EditadoPor INT NULL,
    EditadoData DATETIME NULL,
    FOREIGN KEY (PedidoId) REFERENCES Pedido(Id),
    FOREIGN KEY (ProdutoId) REFERENCES Produto(Id),
    FOREIGN KEY (EditadoPor) REFERENCES Usuario(Id)
);

-- Criando a tabela Produto
CREATE TABLE Produto (
    Id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    Nome VARCHAR(100) NOT NULL,
    Descricao VARCHAR(255) NOT NULL,
    TempoPreparo TIME NOT NULL DEFAULT 20,
    Valor FLOAT NOT NULL,
    EnderecoImagem VARCHAR(255) NULL,
    Categoria VARCHAR(100) NULL DEFAULT 'Geral',
    Removido bit NOT NULL DEFAULT 0,
    UsuarioId INT NOT NULL,
    EditadoPor INT NULL,
    EditadoData DATETIME NULL,
    FOREIGN KEY (UsuarioId) REFERENCES Usuario(Id),
    FOREIGN KEY (EditadoPor) REFERENCES Usuario(Id)
);

-- Criando a tabela Usuario
CREATE TABLE Usuario (
    Id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    Nome VARCHAR(100) NOT NULL,
    Email VARCHAR(100) NOT NULL,
    Senha VARCHAR(100) NOT NULL,
    EditadoData DATETIME
);
```

Ref: Cliente.RegiaoPostalId > RegiaoPostal.Id
Ref: Pedido.ClienteId > Cliente.Id
Ref: PedidoProduto.PedidoId > Pedido.Id
Ref: PedidoProduto.ProdutoId > Produto.Id
Ref: Produto.UsuarioId > Usuario.Id

## Tecnologias Utilizadas

Tecnologias Usadas:
React.js
React Native
React Native Paper
JSON
VS Code
Visual Studio
SQL Server
SignalR
EF Core
.NET 8
Minimal API
## Hospedagem

A aplicação usará uma MINIMAL API em .NET e podendo, a depender da evolução do projeto, ser migrado para uma estrutura de back-end mais moderna (Creational and Structutal Patterns) e o uso de injeções de dependência em todo o escopo. O planejamento é hospedar o back-end na infraestrutura local de um participante do grupo.

## Qualidade de Software

De acordo com a norma ISO/IEC 25010:2011, as características de qualidade do software são:
Funcionalidade - Atende às necessidades do usuário
Confiabilidade - Executa suas funções de forma correta e consistente
Usabilidade - Fácil de usar e aprender
Eficiência - Desempenho adequado em relação aos recursos utilizados
Manutenibilidade - Capacidade de ser modificado e corrigido facilmente
Portabilidade - Pode ser utilizado em diferentes ambientes
Segurança - Protege informações e funcionalidades contra acesso não autorizado.

Diante disso, nossa aplicação tem como meta de desenvolvimento ser capaz de cumprir todos esses requisitos de qualidade de software para que seus stakeholders sejam corretamente satisfeitos.

# Template Padrão da Aplicação
# Programação de Funcionalidades
## Login do Usuario (Dono do restaurante)
O usuário poderá realizar o login e fazer o CRUD de seus produtos, podendo editar campos como preço, podendo remover e arquivar esses produtos.	
## Acompanhar pedido (Dono do restaurante e cliente)
Tanto o usuário quando o cliente terá acesso a tela para acompanhar seu pedido, podendo ver o status desse pedido como: ANALISE, EM PREPARO, SAIU PARA ENTREGA, ENTREGUE.
A única diferença do usuário para o cliente, é que o usuário (dono do restaurante) poderá atualizar esse status do pedido.
## Criar um pedido (cliente)
Após escolher seus produtos na tela inicial, o cliente poderá ir para o carrinho e prosseguir com o pedido, que irá consultar no serviço pelo telefone se ele já é cadastrado, caso não, irá informar seus dados sobre sua localização. Após isso ele irá escolher o método de pagamento para acertar com o motoboy quando o pedido chegar.


<!--
