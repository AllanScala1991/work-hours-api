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
        try {
            const  user: CreateUserModel = req.body;
            
            const response = await createNewUser(user, this.encrypterRepository);

            return res.status(201).json(response);
            
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    }

    async getQuestionAndAnswer(req: Request, res: Response) {
        try {
            const username  = req.params.username;

            const user = await findUserByUsername(username);

            const response = {
                secretQuestion: user.secretQuestion,
                secretAnswer: user.secretAnswer
            }

            return res.status(200).json(response);
            
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    }

    async validateAnswer(req: Request, res: Response) {
        try {
            const { username, secretAnswer } = req.body;

            const response = await RecoveryPassword.validateAnswer(username, secretAnswer);

            return res.status(200).json(response)
            
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    }

    async updatePassword(req: Request, res: Response) {
        try {
            const { username, password } = req.body;

            const response = await RecoveryPassword.updatePassword(username, password, this.encrypterRepository);

            res.status(200).json(response);
            
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    }
}