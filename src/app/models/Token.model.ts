export interface Token {
    exp: number
    firstName: string|null
    iat: number
    id: string
    lastName: string|null
    roles: Array<string>
    username: string
}
