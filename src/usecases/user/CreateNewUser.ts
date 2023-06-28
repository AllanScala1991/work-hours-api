import { CreateUserModel, UserModel } from "../../models/User";
import { UserService } from "../../services/user/UserService";
import { findUserByUsername } from "./FindUserByUsername";


export async function createNewUser(user: CreateUserModel): Promise<UserModel> {
    try {
        let emptyUser = false;
        for(let index in user) {
            if(!user[index]) {
                emptyUser = true
                break;
            }

            if(emptyUser) throw new Error("Todos os campos devem ser preenchidos.");

            const userExists = await findUserByUsername(user.username);

            if(userExists.length > 0) throw new Error("Já existe um usuário com essas informações, tente novamente.")

            const createdUser = await new UserService().createUser(user);

            return createdUser;
        }

    } catch (error) {
        return error
    }
}