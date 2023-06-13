export interface CreateUser {
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

export interface User extends CreateUser {
    id: string
    createAt: Date
    updatedAt: Date
}