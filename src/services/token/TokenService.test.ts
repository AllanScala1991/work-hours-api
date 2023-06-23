import { JsonWebToken } from "../../helpers/jsonwebtoken/JsonWebToken"
import { TokenRepository } from "../../repositories/Token"
import { TokenService } from "./TokenService";


describe("Token Service Tests", () => {
    const tokenRepository: TokenRepository = new JsonWebToken();
    const tokenService: TokenService = new TokenService(tokenRepository);

    test("Generate Token", () => {
        const data = {
            id: "123",
            name: "Test"
        }

        jest.spyOn(tokenRepository, 'generate').mockImplementationOnce((): any => {
            return "token";
        })

        const token = tokenService.generate(data);

        expect(token).not.toBeNull;
        expect(typeof token).toEqual('string');
        expect(token).toEqual("token");
    })

    test("Try generate token with send empty name", () => {
        const errorToken = tokenService.generate({id: "123", name: ""});

        expect(errorToken).toEqual("ID ou Nome inválidos");
    })

    test("Validate Token", () => {
        jest.spyOn(tokenRepository, 'generate').mockImplementationOnce((): any => {
            return "token";
        })

        const token = tokenService.generate({id: "123", name: "test"});

        jest.spyOn(tokenRepository, 'validate').mockImplementationOnce((): any => {
            return "valid"
        })

        const validateToken = tokenService.validate({token});

        expect(validateToken).toEqual("valid");
    })

    test("Try validate token with send empty token", () => {
        const validateToken = tokenService.validate({token: ""});

        expect(validateToken).toEqual("Usuário não autenticado");
    })

    test("Try validate token with send invalid token", () => {
        jest.spyOn(tokenRepository, 'validate').mockImplementationOnce((): any => {
            return false
        })

        const validateToken = tokenService.validate({token: "invalid"});

        expect(validateToken).toEqual("Token expirado");
    })
})