import { NextFunction, Router, Request, Response } from "express";
import { TokenRepository } from "../../../domain/repositories/TokenRepository";
import { JsonWebToken } from "../../repositories/JsonWebToken";
import { TokenService } from "../../../application/services/TokenService";


const app = Router();
const jsonWebToken: TokenRepository = new JsonWebToken();
const tokenService: TokenRepository = new TokenService(jsonWebToken);

app.use((req: Request, res: Response, next: NextFunction) => {
    try {
        const bearer = req.headers.authorization;

        if(!bearer) return res.status(401).json("User not authenticated")

        const token = bearer.split(" ");

        tokenService.validate(token[1]);

        return next();
    } catch (error) {
        res.status(500).send({error: error.message});
    }
})

export default app;