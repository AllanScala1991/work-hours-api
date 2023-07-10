import { ResponseModel } from "../../models/Response";
import { CreateUserModel } from "../../models/User";
import { EncrypterRepository } from "../../repositories/Encrypter";
import { UserService } from "../../services/user/UserService";
import { findUserByEmail } from "./FindUserByEmail";
import { findUserByUsername } from "./FindUserByUsername";


export async function createNewUser(user: CreateUserModel, encrypter: EncrypterRepository): Promise<ResponseModel> {
    try {
        let emptyUser = false;
        for(let index in user) {
            if(!user[index]) {
                emptyUser = true
                break;
            }
        }
        
        if(emptyUser) return {status: 400, message: "Todos os campos devem ser preenchidos."}

        const userExists = await findUserByUsername(user.username);
        
        if(userExists.data != null) return {status: 400, message: "Já existe um usuário com essas informações, tente novamente."}
        
        const isUserEmailDuplicated = await findUserByEmail(user.email);
        
        if(isUserEmailDuplicated.data != null) return {status: 400, message: "Já existe um usuário com essas informações, tente novamente."}

        const passwordEncrypted = await encrypter.encrypt({value: user.password, salt: 8});

        user.password = passwordEncrypted;

        const createdUser = await new UserService().createUser(user);

        return {status: 201, data: createdUser};

    } catch (error) {
        return {status: 500, message: error}
    }
}