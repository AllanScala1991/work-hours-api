import { CreateCompanyModel } from "../../models/Company";
import { ResponseModel } from "../../models/Response";
import { EncrypterRepository } from "../../repositories/Encrypter";
import { CompanyService } from "../../services/company/CompanyService";
import { findCompanyById } from "./findCompanyById";


export async function updateCompanyById(companyId: string, companyData: CreateCompanyModel, encrypter: EncrypterRepository): Promise<ResponseModel> {
    try {
        if(!companyId) return {status: 400, message: "ID da compania inválido."};

        let isCompanyDataEmpty = false;

        for(let index in companyData) {
            if(!companyData[index]) {
                isCompanyDataEmpty = true;
                break;
            }
        }

        if(isCompanyDataEmpty) return {status: 400, message: "Todos os campos devem ser preenchidos."}

        const companyExists = await findCompanyById(companyId);
        
        if(companyExists.data == null) return {status: 400, message: "Nenhuma compania localizada com o ID informado, tente novamente."}

        const passwordEncrypted = await encrypter.encrypt({value: companyData.password, salt: 8});

        companyData.password = passwordEncrypted;

        const company = await new CompanyService().updateCompanyById(companyId, companyData);

        return {status: 200, data: company};
        
    } catch (error) {
        return {status: 500, message: error}
    }
}