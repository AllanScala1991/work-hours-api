import { sign, verify } from "jsonwebtoken";
import { TokenRepository } from "../repositories/Token";

export class JsonWebToken implements TokenRepository {

    generate(id: string, name: string): string {
        return sign({
            id: id,
            name: name
        }, `${process.env.SECRET_KEY}`, {
            expiresIn: '1d'
        });
    }

    validate(token: string): string {
        return verify(token, `${process.env.SECRET_KEY}`).toString();
    }
    
}