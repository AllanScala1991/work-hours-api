export interface TokenRepository {
    generate(id: string, name: string): string
    validate(token: string): string
}