import { LoginModel } from "../../models/Login";
import { ResponseModel } from "../../models/Response";
import { EncrypterRepository } from "../../repositories/Encrypter";
import { TokenRepository } from "../../repositories/Token";
import { EncrypterService } from "../../services/encrypter/EncrypterService";
import { TokenService } from "../../services/token/TokenService";
import { findUserByUsername } from "./FindUserByUsername";

export class UserLogin {
    constructor(
        private encrypterRepository: EncrypterRepository,
        private tokenRepository: TokenRepository
    ){}

    async handle(user: LoginModel): Promise<ResponseModel> {
        try {
            if(!user.username || !user.password) return {status: 400, message: "Usuário ou Senha inválidos, tente novamente."}
    
            const isUserExists = await findUserByUsername(user.username);
    
            if(isUserExists == null) return {status: 404, message: "Usuário ou Senha inválidos, tente novamente."}
    
            const isPasswordValid = await new EncrypterService(this.encrypterRepository).compare({current: user.password, hash: isUserExists[0].password})
    
            if(!isPasswordValid) return {status: 404, message: "Usuário ou Senha inválidos, tente novamente."}
    
            const token = await new TokenService(this.tokenRepository).generate({id: isUserExists[0].id, name: isUserExists[0].name})
    
            return {status: 200, token: token}
        } catch (error) {
            return {status: 500, message: error}
        }
    }
}
