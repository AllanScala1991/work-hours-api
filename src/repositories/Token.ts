import { GenerateTokenEntity, ValidateTokenEntity } from "../entities/Token"

export interface TokenRepository {
    generate(data: GenerateTokenEntity): string
    validate(data: ValidateTokenEntity): string
}