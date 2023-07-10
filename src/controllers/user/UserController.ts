import { Request, Response, response } from "express";
import { CreateUserModel } from "../../models/User";
import { createNewUser } from "../../usecases/user/CreateNewUser";
import { EncrypterRepository } from "../../repositories/Encrypter";
import { Bcrypt } from "../../helpers/bcrypt/Bcrypt";
import { findUserByUsername } from "../../usecases/user/FindUserByUsername";
import { RecoveryPassword } from "../../usecases/user/RecoveryPassword";


export class UserController {
    private encrypterRepository: EncrypterRepository;

    constructor(){
        this.encrypterRepository = new Bcrypt();
    }
    
    async create(req: Request, res: Response) {
        const  user: CreateUserModel = req.body;
            
        const response = await createNewUser(user, this.encrypterRepository);

        return res.status(response.status).json(response);
    }

    async getQuestionAndAnswer(req: Request, res: Response) {
        const username  = req.params.username;

        const user = await findUserByUsername(username);

        const response = {
            secretQuestion: user.data.secretQuestion,
            secretAnswer: user.data.secretAnswer
        }

        return res.status(user.status).json(response);
    }

    async validateAnswer(req: Request, res: Response) {
        const { username, secretAnswer } = req.body;

        const response = await RecoveryPassword.validateAnswer(username, secretAnswer);

        return res.status(response.status).json(response)
    }

    async updatePassword(req: Request, res: Response) {
        const { username, password } = req.body;

        const response = await RecoveryPassword.updatePassword(username, password, this.encrypterRepository);

        res.status(response.status).json(response);
    }
}