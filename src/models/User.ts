export interface CreateUserModel {
    name: string
    email: string
    phone: string
    address: string
    username: string
    password: string
    position: string
    sector: string
    status: string
    secretQuestion: string
    secretAnswer: string
    companyId: string
}

export interface UserModel extends CreateUserModel {
    id: string
}