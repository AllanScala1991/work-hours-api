import { HashModel, CompareModel } from "../../models/Encrypter";
import { EncrypterRepository } from "../../repositories/Encrypter";


export class EncrypterService implements EncrypterRepository {
    constructor(private encryptRepository: EncrypterRepository){}

    async encrypt(data: HashModel): Promise<string> {
        try {
            if(!data.value || !data.salt) throw new Error("Value ou Salt inválidos.")

            const valueEncrypted = await this.encryptRepository.encrypt(data);

            return valueEncrypted;
            
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async compare(data: CompareModel): Promise<boolean> {
        try {
            if(!data.current || !data.hash) throw new Error("Current ou Hash inválidos.")

            const compareValue = await this.encryptRepository.compare(data);

            return compareValue;
            
        } catch (error) {
            throw new Error(error.message)
        }
    }
    
}