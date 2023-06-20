import { LoginModel } from "../../models/Login";
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

    async handle(user: LoginModel): Promise<string> {
        try {
            if(!user.username || !user.password) throw new Error("Usuário ou Senha inválidos, tente novamente.")
    
            const isUserExists = await findUserByUsername(user.username);
    
            if(!isUserExists) throw new Error("Usuário ou Senha inválidos, tente novamente.")
    
            const isPasswordValid = await new EncrypterService(this.encrypterRepository).compare({current: user.password, hash: isUserExists[0].password})
    
            if(!isPasswordValid) throw new Error("Usuário ou Senha inválidos, tente novamente.")
    
            const token = await new TokenService(this.tokenRepository).generate({id: isUserExists[0].id, name: isUserExists[0].name})
    
            return token
        } catch (error) {
            throw new Error(error.message)
        }
    }
}

// testar
// criar uma rota para criar usuário