import { CompanyModel } from "../../models/Company";
import { CompanyService } from "../../services/company/CompanyService";


export async function validateCompanyExists(companyCnpj: string, companyEmail: string, companyUsername: string): Promise<CompanyModel[]> {
    try {
        if(!companyCnpj) return null;

        const company = await new CompanyService().validateCompanyExists(companyCnpj, companyEmail, companyUsername);

        return company;
        
    } catch (error) {
        throw new Error(error.message);
    }
}