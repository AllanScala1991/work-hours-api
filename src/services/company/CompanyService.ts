import { CreateCompanyModel, CompanyModel } from "../../models/Company";
import { CompanyRepository } from "../../repositories/Company";


export class CompanyService implements CompanyRepository {

    async createCompany(company: CreateCompanyModel): Promise<CompanyModel> {
        return await prisma.company.create({
            data: company
        })
    }

    async findCompanyById(companyId: string): Promise<CompanyModel> {
        return await prisma.company.findUnique({
            where: {
                id: companyId
            }
        })
    }

    async validateCompanyExists(companyCnpj: string, companyEmail: string, companyUsername: string): Promise<CompanyModel[]> {
        return await prisma.company.findMany({
            where: {
                OR : [
                    {
                        cnpj: companyCnpj
                    }, {
                        email: companyEmail
                    }, {
                        username: companyUsername  
                    }
                    
                ]
            }
        })
    }

    async updateCompanyById(companyId: string, companyData: CreateCompanyModel): Promise<CompanyModel> {
        return await prisma.company.update({
            where: {
                id: companyId
            }, data: companyData
        })
    }
}