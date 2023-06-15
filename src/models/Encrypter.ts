export interface HashModel {
    value: string
    salt: number
}

export interface CompareModel {
    current: string
    hash: string
}