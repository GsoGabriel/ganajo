export interface Bairro {
    id : number,
    bairro : string,
    cep : string, 
    precoDelivery: number,
    editadoPor: number,
    editadoData: string,
}

export const BairroDTODefaultProps : Bairro = {
    id: 0,
    bairro: '',
    cep: '',
    precoDelivery: 0,
    editadoPor: 0, 
    editadoData: '',
}