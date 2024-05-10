import { Bairro, BairroDTODefaultProps } from "./Bairro.ts";

export interface ClienteDTO {
    id: number;
    cpf: string;
    nome: string;
    endereco: string;
    numeroCasa: string;
    complemento: string | null;
    numeroTelefone: string;
    regiaoPostal: Bairro;
}

export const ClienteDTODefaultProps: ClienteDTO = {
    id: 0,
    complemento: '',
    cpf: '',
    nome: '',
    numeroCasa: '',
    numeroTelefone: '',
    endereco: '',
    regiaoPostal: BairroDTODefaultProps
}


