import { sign, verify } from "jsonwebtoken";
import { TokenRepository } from "../../repositories/Token";
import { GenerateTokenModel, ValidateTokenModel } from "../../models/Token";

export class JsonWebToken implements TokenRepository {

    generate(data: GenerateTokenModel): string {
        return sign({
            id: data.id,
            name: data.name
        }, `${process.env.SECRET_KEY}`, {
            expiresIn: '1d'
        });
    }

    validate(data: ValidateTokenModel): string {
        return verify(data.token, `${process.env.SECRET_KEY}`).toString();
    }
    
}