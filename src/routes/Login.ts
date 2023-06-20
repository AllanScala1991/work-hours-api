import { Response, Request, Router } from "express";
import { LoginController } from "../controllers/login/LoginController";

const app: Router = Router();
const loginController: LoginController = new LoginController();

app.post("/login", async (req: Request, res: Response) => await loginController.login(req, res));

module.exports = app;