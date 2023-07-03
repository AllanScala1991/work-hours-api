import { UserModel } from "../../models/User";
import { UserService } from "../../services/user/UserService";

export async function findUserByEmail(email: string): Promise<UserModel> {
    try {
        const userEmail = await new UserService().findUserByEmail(email);

        return userEmail;
    } catch (error) {
        throw new Error("Informações inválidas, tente novamente.")
    }
}