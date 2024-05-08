export interface Admin {
    Id: number,
    Email : string,
    Senha : string,
}

export const defaultAdminProp : Admin = {
    Email: 'ganajoadmin@gmail.com',
    Id: 1,
    Senha: ''
}