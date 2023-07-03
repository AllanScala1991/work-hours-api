import { NextFunction, Request, Response, Router } from "express";
import "dotenv/config";

const app: Router = Router();

app.use((req: Request, res: Response, next: NextFunction) => {
    try {
        const api_token = req.headers.api_token;

        if(!api_token) return res.status(403).json("Usuário sem acesso, verifique com um administrador.")

        if(api_token != process.env.CREATE_USER_APY) return res.status(403).json("Usuário sem acesso, verifique com um administrador.")

        return next();
    } catch (error) {
        res.status(500).send({error: error.message});
    }
})

export default app;