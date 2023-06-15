import { UserModel } from "../../models/User";
import { UserService } from "../../services/UserService"

export async function findUserByUsername(username: string): Promise<UserModel[]> {
    try {
        if(!username) throw new Error("Usuário inválido, tente novamente.")
    
        const user = await new UserService().findUserByUsername(username);
        
        return user;
    } catch (error) {
        throw new Error(error.message)
    }
}