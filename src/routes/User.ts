import { Request, Response, Router } from "express";
import { UserController } from "../controllers/user/UserController";


const app: Router = Router();
const userController: UserController = new UserController();

app.post("/user/create", async (req: Request, res: Response) => await userController.create(req, res));

module.exports = app;