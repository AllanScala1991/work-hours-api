import { UserModel } from "../../models/User";
import { EncrypterRepository } from "../../repositories/Encrypter";
import { UserService } from "../../services/user/UserService";
import { findUserByUsername } from "./FindUserByUsername";

export class RecoveryPassword {

    static async validateAnswer(username: string, answer: string): Promise<boolean> {
        try {
            if(!answer) throw new Error("Resposta inválida.");

            const savedAnswer = (await findUserByUsername(username)).secretAnswer;

            if(answer != savedAnswer) throw new Error("Resposta inválida.");

            return true;

        } catch (error) {
            throw new Error(error.message)
        }
    }

    static async updatePassword(username: string, password: string, encrypter: EncrypterRepository): Promise<UserModel> {
        try {
            if(!username || !password) throw new Error("Informações inválidas, tente novamente.");

            const hashPassword = await encrypter.encrypt({value: password, salt: 8});

            const saveNewPassword = await new UserService().updateUserPassword(username, hashPassword);

            return saveNewPassword;
            
        } catch (error) {
            throw new Error(error.message)
        }
    }
}