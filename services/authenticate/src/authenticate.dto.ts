export class authSignDto {
    payload: any
    issuer?: string
    expiresIn?: number
}

export class authVerifyDto {
    token: string
    issuer?: string
}

export class ConfigJwt {
    public private_key: string
    public public_key: string
    public algorithm: string
    public audience?: string
    public issuer?: string
}