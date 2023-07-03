import { Request, Response } from "express";
import { CreateUserModel } from "../../models/User";
import { createNewUser } from "../../usecases/user/CreateNewUser";


export class UserController {
    
    async create(req: Request, res: Response) {
        try {
            const  user: CreateUserModel = req.body;
            
            const response = await createNewUser(user);

            return res.status(201).json(response);
            
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    }
}