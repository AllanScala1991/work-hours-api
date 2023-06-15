import { CompareModel, HashModel } from "../models/Encrypter";

export interface EncrypterRepository {
    encrypt(data: HashModel): Promise<string>
    compare(data: CompareModel): Promise<boolean>
}