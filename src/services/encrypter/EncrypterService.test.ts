import { Bcrypt } from "../../helpers/bcrypt/Bcrypt";
import { EncrypterRepository } from "../../repositories/Encrypter"
import { EncrypterService } from "./EncrypterService";


describe("Encrypter Service Tests", () => {
    const  encryptRepository: EncrypterRepository = new Bcrypt();
    const encrypterService: EncrypterService = new EncrypterService(encryptRepository);

    test("Encrypt password sucessfully", async () => {
        jest.spyOn(encryptRepository, 'encrypt').mockImplementationOnce((): any => {
            return "encrypted"
        })

        const encryptPassword = await encrypterService.encrypt({value: "password", salt: 8});

        expect(encryptPassword).toEqual("encrypted");
    })

    test("Try encrypt password with send empty value", async () => {
        const emptyPasswordError = await encrypterService.encrypt({value: "", salt: 8});
        expect(emptyPasswordError).toEqual("Value ou Salt inválidos.");
    })

    test("Should validate encrypt function error", async () => {
        jest.spyOn(encryptRepository, 'encrypt').mockRejectedValueOnce((): any => {
            return new Error("Erro inesperado, tente novamente.")
        })

        const encryptPassword = await encrypterService.encrypt({value: "password", salt: 8});
        expect(encryptPassword).toThrowError;
    })

    test("Compare passwords successfully", async () => {
        jest.spyOn(encryptRepository, 'compare').mockImplementationOnce((): any => {
            return true;
        })

        const comparePasswords = await encrypterService.compare({current: "123", hash: "321"});

        expect(comparePasswords).toBeTruthy;
    })

    test("Send empty current password in compare", async () => {
        const emptyPasswordCompare = await encrypterService.compare({current: "", hash: "321"});

        expect(emptyPasswordCompare).toBeFalsy;
    })

    test("Send invalid current password in compare", async () => {
        jest.spyOn(encryptRepository, 'compare').mockImplementationOnce((): any => {
            return false;
        })

        const comparePasswords = await encrypterService.compare({current: "999", hash: "321"});

        expect(comparePasswords).toBeFalsy;
    })

    test("Should validate compare function error", async () => {
        jest.spyOn(encryptRepository, 'compare').mockRejectedValueOnce((): any => {
            return new Error("Erro inesperado, tente novamente.")
        })

        const comparePasswords = await encrypterService.compare({current: "123", hash: "321"});

        expect(comparePasswords).toThrowError;
    })
})