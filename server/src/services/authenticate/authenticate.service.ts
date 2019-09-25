import { Injectable } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { ConfigJwt, authSignDto, authVerifyDto } from './authenticate.dto';
import * as fs from "fs"
import * as jwt from "jsonwebtoken"

@Injectable()
export class AuthenticateService {
    private private_key: string
  private public_key: string

  constructor(
    private readonly ConfigService: ConfigService
  ){}

  private getJwtConfig(): ConfigJwt {
    this.private_key = this.private_key || fs.readFileSync(this.ConfigService.get("JWT_PRIVATE_KEY_FILE")).toString();
    this.public_key = this.public_key || fs.readFileSync(this.ConfigService.get("JWT_PUBLIC_KEY_FILE")).toString();
    return {
        private_key: this.private_key,
        public_key: this.public_key,
        algorithm: this.ConfigService.get("JWT_ALGORITHM"),
        audience: this.ConfigService.get("JWT_AUDIENCE"),
        issuer: this.ConfigService.get("JWT_ISSUER")
    }
  }

  /**
     * Vérifie l'existence d'un utilisateur et génère un token
     * @param dto 
     */
  public async sign(dto: authSignDto): Promise<string> {

    // get config
    let _config = this.getJwtConfig();

    // check payload
    if (!dto.payload) throw new Error("[Auth-Service] - payload est indéfini");

    // create token
    const token = jwt.sign(dto.payload, _config.private_key, {
      expiresIn: dto.expiresIn || (60 * 60 * 24),
      algorithm: _config.algorithm,
      audience: _config.audience,
      issuer: dto.issuer || _config.issuer
    });

    // save token (optional)

    // return token
    return token;
  }


  public async verify(dto: authVerifyDto) {
    // get config
    let _config = this.getJwtConfig();
    let _payload: any = undefined;
    try {
      _payload = jwt.verify(dto.token, _config.public_key, {
        algorithms: [_config.algorithm],
        audience: _config.audience,
        issuer: dto.issuer || _config.issuer
      })
    } catch (err) {
      //throw new AuthenticationError("Token de connexion invalide");
    }

    return _payload;
  }
}
