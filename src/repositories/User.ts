import { UserModel } from "../models/User";

export interface UserRepository {
    findUserByUsername(username: string): Promise<UserModel[]>
    createUser(user: UserModel): Promise<UserModel>
}