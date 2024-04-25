import { Bairro } from "./Bairro";

export interface ClienteDTO {
    id: number;
    cpf: string;
    nome: string;
    numeroCasa: string;
    complemento: string | null;
    numeroTelefone: string;
    regiaoPostal: Bairro;
}