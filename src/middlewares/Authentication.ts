import { NextFunction, Router, Request, Response } from "express";
import { TokenRepository } from "../repositories/Token";
import { JsonWebToken } from "../helpers/JsonWebToken";
import { TokenService } from "../services/TokenService";


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