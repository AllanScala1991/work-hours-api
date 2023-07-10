import { Request, Response, Router } from "express";
import { CompanyController } from "../../controllers/company/CompanyController";
import apiToken from "../../middlewares/CreateUserAuth";

const app: Router = Router();
const companyController: CompanyController = new CompanyController();

app.post("/company", apiToken, async (req: Request, res: Response) => await companyController.create(req, res));
app.get("/company/:companyid", apiToken, async (req: Request, res: Response) => await companyController.findCompanyById(req, res));
app.put("/company", apiToken, async (req: Request, res: Response) => await companyController.update(req, res));

module.exports = app;