import { UserService } from "./UserService"

describe("User Service Tests", () => {
    const userService: UserService = new UserService();

    test("Find user by username", async () => {
        jest.spyOn(prisma.users, 'findUnique').mockImplementationOnce((): any => {
            return {
                id: "123",
                name: "Test",
                email: "test@mail.com",
                phone: "41999999999",
                address: "test",
                username: "test",
                password: "123",
                position: "test",
                sector: "test",
                authorization: "test",
                createdAt: new Date(),
                updatedAt: new Date()
            }
        })

        const user = await userService.findUserByUsername("Test");

        expect(user).not.toBeNull;
        expect(user.name).toEqual("Test");
    })

    test("Create new user", async () => {
        jest.spyOn(prisma.users, 'create').mockImplementationOnce((): any => {
            return {
                id: "123",
                name: "Test",
                email: "test@mail.com",
                phone: "41999999999",
                address: "test",
                username: "test",
                password: "123",
                position: "test",
                sector: "test",
                authorization: "test",
                secretQuestion: "nome da mae?", 
                secretAnswer: "test",
                createdAt: new Date(),
                updatedAt: new Date()
            }
        })

        const user = await userService.createUser({
            name: "Test",
            email: "test@mail.com",
            phone: "41999999999",
            address: "test",
            username: "test",
            password: "123",
            position: "test",
            sector: "test",
            authorization: "test",
            secretQuestion: "nome da mae?", 
            secretAnswer: "test"
        });

        expect(user.name).toEqual("Test");
    })

    test("Find user by email", async () => {
        jest.spyOn(prisma.users, 'findUnique').mockImplementationOnce((): any => {
            return {
                id: "123",
                name: "Test",
                email: "test@mail.com",
                phone: "41999999999",
                address: "test",
                username: "test",
                password: "123",
                position: "test",
                sector: "test",
                authorization: "test",
                createdAt: new Date(),
                updatedAt: new Date()
            }
        })

        const user = await userService.findUserByEmail("test@mail.com");

        expect(user).not.toBeNull;
        expect(user.name).toEqual("Test");
    })
})