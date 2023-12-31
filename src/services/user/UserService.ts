import { CreateUserModel, UserModel } from "../../models/User";
import { UserRepository } from "../../repositories/User";
import prisma from "../../helpers/ormPrisma/Prisma";

export class UserService implements UserRepository {

    async findUserByUsername(username: string): Promise<UserModel> {
        return await prisma.users.findUnique({
            where: {
                username: username
            }
        })
    }

    async createUser(user: CreateUserModel): Promise<UserModel> {
        return await prisma.users.create({
            data: user
        });
    }

    async findUserByEmail(email: string): Promise<UserModel> {
        return await prisma.users.findUnique({
            where: {
                email: email
            }
        });
    }

    async updateUserPassword(username: string, password: string): Promise<UserModel> {
        return await prisma.users.update({
            where: {
                username: username
            }, data: {
                password: password
            }
        })
    }
    
}