import { ResponseModel } from "../../models/Response";
import { EncrypterRepository } from "../../repositories/Encrypter";
import { UserService } from "../../services/user/UserService";
import { findUserByUsername } from "./FindUserByUsername";

export class RecoveryPassword {
    private async updatePassword(username: string, password: string, encrypter: EncrypterRepository): Promise<ResponseModel> {
        try {
            if(!username || !password) return {status: 400, message: "Informações inválidas, tente novamente."}

            const hashPassword = await encrypter.encrypt({value: password, salt: 8});

            await new UserService().updateUserPassword(username, hashPassword);

            return {status: 200, data: true};
            
        } catch (error) {
            return {status: 500, message: error}
        }
    }

    async validateAnswer(username: string, answer: string, newPassword: string, encrypter: EncrypterRepository): Promise<ResponseModel> {
        try {
            if(!answer) return {status: 400, message: "Resposta inválida."};

            const savedAnswer = (await findUserByUsername(username)).data.secretAnswer;

            if(answer != savedAnswer) return {status: 400, message: "Resposta inválida."};

            return await this.updatePassword(username, newPassword, encrypter)

        } catch (error) {
            return {status: 500, message: error}
        }
    }

}