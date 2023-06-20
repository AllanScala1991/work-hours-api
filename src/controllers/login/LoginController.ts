import { Request, Response } from "express";
import { Bcrypt } from "../../helpers/bcrypt/Bcrypt";
import { JsonWebToken } from "../../helpers/jsonwebtoken/JsonWebToken";
import { EncrypterRepository } from "../../repositories/Encrypter";
import { TokenRepository } from "../../repositories/Token";
import { UserLogin } from "../../usecases/user/Login";


export class LoginController {
    private encrypterRepository: EncrypterRepository;
    private tokenRepository: TokenRepository;
    private userLogin: UserLogin;

    constructor(){
        this.encrypterRepository = new Bcrypt();
        this.tokenRepository = new JsonWebToken();
        this.userLogin = new UserLogin(this.encrypterRepository, this.tokenRepository);
    }

    async login(req: Request, res: Response) {
        try {
            const {username, password} = req.body;

            const response = await this.userLogin.handle({username, password})

            return res.status(200).json(response);
            
        } catch (error) {
            
            return res.status(500).json({error: error.message})
        }

    }
}