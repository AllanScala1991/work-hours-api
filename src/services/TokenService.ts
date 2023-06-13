import { TokenRepository } from "../entities/TokenRepository";


export class TokenService implements TokenRepository {
    constructor(private tokenRepository: TokenRepository){}

    generate(id: string, name: string): string {
        if(!id || !name) throw new Error("Invalid id or name");

        const token = this.tokenRepository.generate(id, name);

        return token;
    }

    validate(token: string): string {
        if(!token) throw new Error("User not authenticated");

        const isTokenValid = this.tokenRepository.validate(token)

        if(!isTokenValid) throw new Error("Expired token");

        return isTokenValid;
    }
    
}