import { CompanyModel, CreateCompanyModel } from "../../models/Company";
import { EncrypterRepository } from "../../repositories/Encrypter";
import { CompanyService } from "../../services/company/CompanyService";
import { validateCompanyExists } from "./validateCompanyExists";


export async function createNewCompany(company: CreateCompanyModel, encrypter: EncrypterRepository): Promise<CompanyModel> {
    try {
        let emptyCompanyData = false;
        
        for(let index in company) {
            if(!company[index]) {
                emptyCompanyData = true;
                break;
            }
        }

        if(emptyCompanyData) throw new Error("Todos os campos devem ser preenchidos.");

        const isCompanyExists = await validateCompanyExists(company.cnpj, company.email, company.username);

        if(isCompanyExists.length > 0) throw new Error("Erro, verifique se já existe uma compania cadastrada.");

        const passwordEncrypted = await encrypter.encrypt({value: company.password, salt: 8});

        company.password = passwordEncrypted;

        const createCompany = new CompanyService().createCompany(company);

        return createCompany;

    } catch (error) {
        throw new Error(error.message)
    }
}