import { GenerateTokenModel, ValidateTokenModel } from "../models/Token";
import { TokenRepository } from "../repositories/Token";


export class TokenService implements TokenRepository {
    constructor(private tokenRepository: TokenRepository){}

    generate(data: GenerateTokenModel): string {
        if(!data.id || !data.name) throw new Error("Invalid id or name");

        const token = this.tokenRepository.generate(data);

        return token;
    }

    validate(data: ValidateTokenModel): string {
        if(!data.token) throw new Error("User not authenticated");

        const isTokenValid = this.tokenRepository.validate(data)

        if(!isTokenValid) throw new Error("Expired token");

        return isTokenValid;
    }
    
}