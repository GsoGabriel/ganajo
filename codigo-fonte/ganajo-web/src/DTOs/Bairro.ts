export interface Bairro {
    id : number,
    bairro : string,
    cep : string, 
    precoDelivery: number,
    editadoPor: number,
    editadoData: string,
}

export const BairroDTODefaultProps : Bairro = {
    bairro: '',
    cep: '',
    editadoData: '',
    editadoPor: 0, 
    id: 0,
    precoDelivery: 0
}