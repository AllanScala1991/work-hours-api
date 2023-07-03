import { CreateUserModel, UserModel } from "../models/User";

export interface UserRepository {
    findUserByUsername(username: string): Promise<UserModel[]>
    createUser(user: CreateUserModel): Promise<UserModel>
    findUserByEmail(email: string): Promise<UserModel>
}