import * as dotenv from "dotenv"
import { config_dto_database_keys, config_dto_jwt_keys } from "./config.dto";

export class ConfigEnv
{
    protected envConfig: { [key:string]:string };
    constructor(){
        this.envConfig = dotenv.config().parsed
    }

    get(key:string, defaultValue?: string): string{
        return this.envConfig[key] || defaultValue
    }

    protected getDatabaseKey(): config_dto_database_keys {
        return {
            host: this.get("DATABASE_HOST"),
            port: parseInt(this.get("DATABASE_PORT")),
            user: this.get("DATABASE_USER"),
            password: this.get("DATABASE_PASSWORD"),
            dbname: this.get("DATABASE_NAME")
        }
    }

    protected getJwtKey(): config_dto_jwt_keys {
        return {
            privateKeyFile: this.get("JWT_PRIVATE_KEY_FILE"),
            publicKeyFile: this.get("JWT_PUBLIC_KEY_FILE"),
            algorithm: this.get("JWT_ALGORITHM"),
            audience: this.get("JWT_AUDIENCE"),
            issuer: this.get("JWT_ISSUER")
        }
    }

}
