import { CompanyService } from "./CompanyService"
import prisma from "../../helpers/ormPrisma/Prisma";

describe("Company Service Tests", () => {
    const companyService = new CompanyService();

    test("Create new company", async () => {
        jest.spyOn(prisma.company, "create").mockImplementationOnce((): any => {
            return {
                id: "123",
                name: "Company Test",
                cnpj: "00000000/000000",
                email: "test@mail.com",
                phone: "41999999999",
                address: "test",
                username: "test",
                password: "123",
                createdAt: new Date(),
                updatedAt: new Date()
            }
        })

        const company = await companyService.createCompany({
            name: "Company Test",
            cnpj: "00000000/000000",
            email: "test@mail.com",
            phone: "41999999999",
            address: "test",
            username: "test",
            password: "123"
        })

        expect(company.id).not.toBeNull;
        expect(company.name).toEqual("Company Test");
    })

    test("Find company from id", async () => {
        jest.spyOn(prisma.company, "findUnique").mockImplementationOnce((): any => {
            return {
                id: "123",
                name: "Company Test",
                cnpj: "00000000/000000",
                email: "test@mail.com",
                phone: "41999999999",
                address: "test",
                username: "test",
                password: "123",
                createdAt: new Date(),
                updatedAt: new Date()
            }
        })

        const company = await companyService.findCompanyById("123");

        expect(company.id).toEqual("123");
        expect(company.name).toEqual("Company Test");
    })

    test("Validate company exists", async () => {
        jest.spyOn(prisma.company, "findMany").mockImplementationOnce((): any => {
            return [{
                id: "123",
                name: "Company Test",
                cnpj: "00000000/000000",
                email: "test@mail.com",
                phone: "41999999999",
                address: "test",
                username: "test",
                password: "123",
                createdAt: new Date(),
                updatedAt: new Date()
            }]
        })

        const company = await companyService.validateCompanyExists("00000000/000000", "test", "test@mail.com");

        expect(company[0].cnpj).toEqual("00000000/000000");
        expect(company[0].name).toEqual("Company Test");
    })

    test("Update company by id", async () => {
        jest.spyOn(prisma.company, "update").mockImplementationOnce((): any => {
            return {
                id: "123",
                name: "Update Company Name",
                cnpj: "00000000/000000",
                email: "test@mail.com",
                phone: "41999999999",
                address: "test",
                username: "test",
                password: "123",
                createdAt: new Date(),
                updatedAt: new Date()
            }
        })

        const company = await companyService.updateCompanyById("123", {
            name: "Update Company Name",
            cnpj: "00000000/000000",
            email: "test@mail.com",
            phone: "41999999999",
            address: "test",
            username: "test",
            password: "123"
        })

        expect(company.name).toEqual("Update Company Name");
    })
})