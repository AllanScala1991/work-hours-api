import { CreateCompanyModel } from "../../models/Company";
import { ResponseModel } from "../../models/Response";
import { EncrypterRepository } from "../../repositories/Encrypter";
import { CompanyService } from "../../services/company/CompanyService";
import { validateCompanyExists } from "./validateCompanyExists";


export async function createNewCompany(company: CreateCompanyModel, encrypter: EncrypterRepository): Promise<ResponseModel> {
    try {
        let emptyCompanyData = false;
        
        for(let index in company) {
            if(!company[index]) {
                emptyCompanyData = true;
                break;
            }
        }

        if(emptyCompanyData) return {status: 400, message: "Todos os campos devem ser preenchidos."};

        const isCompanyExists = await validateCompanyExists(company.cnpj, company.email, company.username);

        if(isCompanyExists.length > 0) return {status: 400, message: "Erro, verifique se já existe uma compania cadastrada."}

        const passwordEncrypted = await encrypter.encrypt({value: company.password, salt: 8});

        company.password = passwordEncrypted;

        const createCompany = await new CompanyService().createCompany(company);

        return {status: 201, data: createCompany};

    } catch (error) {
        return {status: 500, message: error}
    }
}