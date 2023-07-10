import { ResponseModel } from "../../models/Response";
import { UserService } from "../../services/user/UserService"

export async function findUserByUsername(username: string): Promise<ResponseModel> {
    try {
        if(!username) return null
    
        const user = await new UserService().findUserByUsername(username);
        
        return {status: 200, data: user};
    } catch (error) {
        return {status: 500, message: error}
    }
}