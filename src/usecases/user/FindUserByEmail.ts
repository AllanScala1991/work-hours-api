import { ResponseModel } from "../../models/Response";
import { UserService } from "../../services/user/UserService";

export async function findUserByEmail(email: string): Promise<ResponseModel> {
    try {
        const userEmail = await new UserService().findUserByEmail(email);

        return {status: 200, data: userEmail};
    } catch (error) {
        return {status: 500, message: error}
    }
}