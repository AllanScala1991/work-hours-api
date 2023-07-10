import { CompanyModel } from "../../models/Company";
import { CompanyService } from "../../services/company/CompanyService";


export async function findCompanyById(companyId: string): Promise<CompanyModel> {
    try {
        if(!companyId) return null;

        const company = await new CompanyService().findCompanyById(companyId);

        return company;
        
    } catch (error) {
        throw new Error(error.message)
    }
}