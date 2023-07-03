import { UserModel } from "../../models/User";
import { UserService } from "../../services/user/UserService"

export async function findUserByUsername(username: string): Promise<UserModel[]> {
    try {
        if(!username) return []
    
        const user = await new UserService().findUserByUsername(username);
        
        return user;
    } catch (error) {
        throw new Error(error.message)
    }
}