export interface Produto {
    id : number,
    nome : string,
    descricao : string,
    valor : number,
    tempoPreparo: string;
    enderecoImagem : string,
    categoria: string,
    usuarioId: number,
    editadorPorNome: string,
    editadoData: string
}