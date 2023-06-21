import { JsonWebToken } from "./JsonWebToken"


describe("Json Web Token tests", () => {
    const jsonwebtoken: JsonWebToken = new JsonWebToken();

    test("Generate token", () => {
        const token = jsonwebtoken.generate({id: "123", name: "Test"});

        expect(token).not.toBeNull;
        expect(typeof token).toEqual("string");
    })

    test("Validate token", () => {
        const token = jsonwebtoken.generate({id: "123", name: "Test"});

        const isTokenValid = jsonwebtoken.validate({token: token});

        expect(isTokenValid).not.toBeNull;
        expect(typeof isTokenValid).toEqual("string");
    })
})