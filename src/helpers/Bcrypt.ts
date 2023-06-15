import { compare, hash } from "bcryptjs";
import { HashModel, CompareModel } from "../models/Encrypter";
import { EncrypterRepository } from "../repositories/Encrypter";

export class Bcrypt implements EncrypterRepository {

    async encrypt(data: HashModel): Promise<string> {
        return hash(data.value, data.salt);
    }

    async compare(data: CompareModel): Promise<boolean> {
        return compare(data.current, data.hash);
    }
    
}