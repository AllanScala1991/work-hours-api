import { ResponseModel } from "../../models/Response";
import { UserModel } from "../../models/User";
import { EncrypterRepository } from "../../repositories/Encrypter";
import { UserService } from "../../services/user/UserService";
import { findUserByUsername } from "./FindUserByUsername";

export class RecoveryPassword {

    static async validateAnswer(username: string, answer: string): Promise<ResponseModel> {
        try {
            if(!answer) return {status: 400, message: "Resposta inválida."};

            const savedAnswer = (await findUserByUsername(username)).data.secretAnswer;

            if(answer != savedAnswer) return {status: 400, message: "Resposta inválida."};

            return {status: 200, data: true};

        } catch (error) {
            return {status: 500, message: error}
        }
    }

    static async updatePassword(username: string, password: string, encrypter: EncrypterRepository): Promise<ResponseModel> {
        try {
            if(!username || !password) return {status: 400, message: "Informações inválidas, tente novamente."}

            const hashPassword = await encrypter.encrypt({value: password, salt: 8});

            const saveNewPassword = await new UserService().updateUserPassword(username, hashPassword);

            return {status: 200, data: saveNewPassword};
            
        } catch (error) {
            return {status: 500, message: error}
        }
    }
}