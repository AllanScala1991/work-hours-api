export interface CreateCompanyModel {
    name: string
    cnpj: string
    email: string
    phone: string
    address: string
    username: string
    password: string
}

export interface CompanyModel extends CreateCompanyModel{
    id: string
}