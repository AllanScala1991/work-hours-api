import { CompanyModel, CreateCompanyModel } from "../../models/Company";
import { EncrypterRepository } from "../../repositories/Encrypter";
import { CompanyService } from "../../services/company/CompanyService";


export async function updateCompanyById(companyId: string, companyData: CreateCompanyModel, encrypter: EncrypterRepository): Promise<CompanyModel> {
    try {
        if(!companyId) throw new Error("ID da compania inválido.");

        let isCompanyDataEmpty = false;

        for(let index in companyData) {
            if(!companyData[index]) {
                isCompanyDataEmpty = true;
                break;
            }
        }

        if(isCompanyDataEmpty) throw new Error("Todos os campos devem ser preenchidos.")

        const passwordEncrypted = await encrypter.encrypt({value: companyData.password, salt: 8});

        companyData.password = passwordEncrypted;

        const company = await new CompanyService().updateCompanyById(companyId, companyData);

        return company;
        
    } catch (error) {
        throw new Error(error.message)
    }
}