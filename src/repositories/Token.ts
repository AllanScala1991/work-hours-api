import { GenerateTokenModel, ValidateTokenModel } from "../models/Token"

export interface TokenRepository {
    generate(data: GenerateTokenModel): string
    validate(data: ValidateTokenModel): string
}