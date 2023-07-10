import { CompanyModel, CreateCompanyModel } from "../models/Company";


export interface CompanyRepository {
    createCompany(company: CreateCompanyModel): Promise<CompanyModel>
    findCompanyById(companyId: string): Promise<CompanyModel>
    validateCompanyExists(companyCnpj: string, companyEmail: string, companyUsername: string): Promise<CompanyModel[]>
    updateCompanyById(companyId: string, companyData: CreateCompanyModel): Promise<CompanyModel>
}