import { UserService } from "./UserService"

describe("User Service Tests", () => {
    const userService: UserService = new UserService();

    test("Find user by username", async () => {
        jest.spyOn(prisma.users, 'findMany').mockImplementationOnce((): any => {
            return [{
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
            }]
        })

        const user = await userService.findUserByUsername("Test");

        expect(user.length).toBeGreaterThan(0);
        expect(user[0].name).toEqual("Test");
    })
})