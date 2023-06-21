export interface CreateUserModel {
    name: string
    email: string
    phone: string
    address: string
    username: string
    password: string
    position: string
    sector: string
    authorization: string
}

export interface UserModel extends CreateUserModel {
    id: string
}