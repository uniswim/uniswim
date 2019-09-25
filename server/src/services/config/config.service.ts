import { Injectable, Logger } from '@nestjs/common';
import * as dotenv from "dotenv"
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

}
