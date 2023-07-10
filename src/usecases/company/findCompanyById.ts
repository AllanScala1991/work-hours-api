import { ResponseModel } from "../../models/Response";
import { CompanyService } from "../../services/company/CompanyService";


export async function findCompanyById(companyId: string): Promise<ResponseModel> {
    try {
        if(!companyId) return null;

        const company = await new CompanyService().findCompanyById(companyId);

        return {status: 200, data: company};
        
    } catch (error) {
        return {status: 500, message: error}
    }
}