export class config_dto_database_keys {
    host: string
    port: number
    user: string
    password: string
    dbname: string
}

export class config_dto_jwt_keys {
    publicKeyFile: string
    privateKeyFile: string
    algorithm: string
    audience: string
    issuer: string
}