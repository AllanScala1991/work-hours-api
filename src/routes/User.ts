import { Request, Response, Router } from "express";
import { UserController } from "../controllers/user/UserController";
import auth from "../middlewares/Authentication";
import apiToken from "../middlewares/CreateUserAuth";


const app: Router = Router();
const userController: UserController = new UserController();

app.post("/user/create", auth, apiToken, async (req: Request, res: Response) => await userController.create(req, res));

module.exports = app;