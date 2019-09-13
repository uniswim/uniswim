import { Injectable } from '@nestjs/common';
import * as dotenv from "dotenv"
import * as fs from "fs"
import { ConfigJwt } from './config.dto';

@Injectable()
export class ConfigService {
    private readonly envConfig: { [key:string]:string };
    constructor(filepath?: string){
        if(filepath){
            this.envConfig = dotenv.parse(fs.readFileSync(filepath));
        } else {
            this.envConfig = dotenv.config().parsed
        }
    }

    get(key:string, defaultValue?: string): string{
        return this.envConfig[key] || defaultValue
    }

    getJwtConfig(): ConfigJwt {
        return {
            private_key: fs.readFileSync(this.get("JWT_PRIVATE_KEY_FILE")).toString(),
            public_key: fs.readFileSync(this.get("JWT_PUBLIC_KEY_FILE")).toString(),
            algorithm: this.get("JWT_ALGORITHM"),
            audience: this.get("JWT_AUDIENCE"),
            issuer: this.get("JWT_ISSUER")
        }
    }
}
