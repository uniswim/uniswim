import { Injectable, Logger } from '@nestjs/common';
import * as dotenv from "dotenv"
import { config_dto_database_keys, config_dto_jwt_keys } from "./config.dto";
import * as Joi from "@hapi/joi"

type EnvConfig = { [key:string]:string }

@Injectable()
export class ConfigService {

    protected envConfig: EnvConfig
    constructor(schema?: Joi.ObjectSchema){
        let _env = dotenv.config().parsed;
        if(schema){
            this.envConfig = this.ValidateConfig(_env, schema);
        } else {
            this.envConfig = _env;
        }
    }

    private ValidateConfig(envConfig: EnvConfig, schema: Joi.ObjectSchema): EnvConfig {
        const { error, value } = schema.validate(envConfig);
        if(!envConfig) throw new Error(`No Config file found`);
        if(error) throw new Error(`Config validation error: ${error.message}`);
        Logger.log("Configuration is validated", "Configuration Module")
        return value;
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
