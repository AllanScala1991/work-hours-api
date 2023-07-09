
describe("User API Tests", () => {
    let baseUrl = Cypress.env("baseUrl");

    it("Create new user", () => {
        let payload;

        cy.fixture("createUser.json").then(user => {
            payload = user;
        })

        cy.request({
            url: `${baseUrl}/user/create`,
            method: 'POST',
            headers: {
                "api_token": Cypress.env("create_user_api")
            },
            body: payload
        }).then(response => {
            console.log(response)
        })
    })
})