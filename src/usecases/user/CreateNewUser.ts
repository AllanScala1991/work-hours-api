import { CreateUserModel, UserModel } from "../../models/User";
import { EncrypterRepository } from "../../repositories/Encrypter";
import { UserService } from "../../services/user/UserService";
import { findUserByEmail } from "./FindUserByEmail";
import { findUserByUsername } from "./FindUserByUsername";


export async function createNewUser(user: CreateUserModel, encrypter: EncrypterRepository): Promise<UserModel> {
    try {
        let emptyUser = false;
        for(let index in user) {
            if(!user[index]) {
                emptyUser = true
                break;
            }
        }
        
        if(emptyUser) throw new Error("Todos os campos devem ser preenchidos.");

        const userExists = await findUserByUsername(user.username);
        
        if(userExists != null) throw new Error("Já existe um usuário com essas informações, tente novamente.")

        const isUserEmailDuplicated = await findUserByEmail(user.email);

        if(isUserEmailDuplicated) throw new Error("Já existe um usuário com essas informações, tente novamente.")

        const passwordEncrypted = await encrypter.encrypt({value: user.password, salt: 8});

        user.password = passwordEncrypted;

        const createdUser = await new UserService().createUser(user);

        return createdUser;

    } catch (error) {
        throw new Error(error.message)
    }
}