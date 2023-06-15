import { UserModel } from "../models/User";
import { UserRepository } from "../repositories/User";
import prisma from "../helpers/Prisma";

export class UserService implements UserRepository {

    async findUserByUsername(username: string): Promise<UserModel[]> {
        return await prisma.users.findMany({
            where: {
                username: username
            }
        })
    }
    
}