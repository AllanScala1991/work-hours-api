import { CreateUserModel, UserModel } from "../../models/User";
import { UserService } from "../../services/user/UserService";


export async function createNewUser(user: CreateUserModel): Promise<UserModel> {
    try {
        let emptyUser = false;
        for(let index in user) {
            if(!user[index]) {
                emptyUser = true
                break;
            }

            if(emptyUser) return null;

            const createdUser = await new UserService().createUser(user);

            return createdUser;
        }

    } catch (error) {
        return error
    }
}