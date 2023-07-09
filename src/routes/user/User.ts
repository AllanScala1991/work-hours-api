import { Request, Response, Router } from "express";
import { UserController } from "../../controllers/user/UserController";
import apiToken from "../../middlewares/CreateUserAuth";


const app: Router = Router();
const userController: UserController = new UserController();

app.post("/user/create", apiToken, async (req: Request, res: Response) => await userController.create(req, res));
app.get("/user/question/:username", async (req: Request, res: Response) => await userController.getQuestionAndAnswer(req, res));
app.post("/user/validate/question", async (req: Request, res: Response) => await userController.validateAnswer(req, res));
app.put("/user/password", async (req: Request, res: Response) => await userController.updatePassword(req, res));
module.exports = app;