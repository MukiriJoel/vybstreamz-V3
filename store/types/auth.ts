export interface IRegister{
    phone: string,
    email?: string,
    password: string,
    phone_code: string,
    country_code?: string,
    country?: string,
}


export interface ILogin {
    username: string,
    password: string,
}