import { Request, Response, Router } from "express";
import { UserController } from "../controllers/user/UserController";
import apiToken from "../middlewares/CreateUserAuth";


const app: Router = Router();
const userController: UserController = new UserController();

app.post("/user/create", apiToken, async (req: Request, res: Response) => await userController.create(req, res));

module.exports = app;