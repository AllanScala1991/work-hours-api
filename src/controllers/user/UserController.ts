import { Request, Response } from "express";
import { CreateUserModel } from "../../models/User";
import { createNewUser } from "../../usecases/user/CreateNewUser";
import { EncrypterRepository } from "../../repositories/Encrypter";
import { Bcrypt } from "../../helpers/bcrypt/Bcrypt";


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
}