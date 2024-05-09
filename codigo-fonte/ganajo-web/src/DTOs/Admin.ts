export interface Admin {
    id: number
    nome: string,
    email: string
    senha: string,
    editadoData: string
}

export const defaultAdminProp : Admin = {
    email: 'ganajoadmin@gmail.com',
    id: 1,
    senha: '',
    editadoData: '',
    nome: ''
}