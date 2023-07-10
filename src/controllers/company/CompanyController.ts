import { Request, Response } from "express";
import { Bcrypt } from "../../helpers/bcrypt/Bcrypt";
import { EncrypterRepository } from "../../repositories/Encrypter";
import { CompanyModel } from "../../models/Company";
import { createNewCompany } from "../../usecases/company/createCompany";
import { findCompanyById } from "../../usecases/company/findCompanyById";
import { updateCompanyById } from "../../usecases/company/updateCompanyById";


export class CompanyController {
    private encrypter: EncrypterRepository;

    constructor(){
        this.encrypter = new Bcrypt();
    }

    async create(req: Request, res: Response) {
        const company: CompanyModel = req.body;

        const response = await createNewCompany(company, this.encrypter);

        return res.status(response.status).json(response);
    }

    async findCompanyById(req: Request, res: Response) {
        const companyId = req.params.companyid;

        const response = await findCompanyById(companyId);

        return res.status(response.status).json(response);
    }

    async update(req: Request, res: Response) {
        const {companyid, name, cnpj, email, phone, address, username, password} = req.body;

        const response = await updateCompanyById(companyid, {name, cnpj, email, phone, address, username, password}, this.encrypter);

        return res.status(response.status).json(response);
    }
}