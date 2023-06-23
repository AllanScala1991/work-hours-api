import { GenerateTokenModel, ValidateTokenModel } from "../../models/Token";
import { TokenRepository } from "../../repositories/Token";


export class TokenService implements TokenRepository {
    constructor(private tokenRepository: TokenRepository){}

    generate(data: GenerateTokenModel): string {
        if(!data.id || !data.name) return "ID ou Nome inválidos";

        const token = this.tokenRepository.generate(data);

        return token;
    }

    validate(data: ValidateTokenModel): string {
        if(!data.token) return "Usuário não autenticado";

        const isTokenValid = this.tokenRepository.validate(data)

        if(!isTokenValid) return "Token expirado";

        return isTokenValid;
    }
    
}