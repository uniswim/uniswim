import { Injectable } from '@nestjs/common';
import { UtilisateursService } from '../utilisateurs/utilisateurs.service';
import { authSignDto } from './auth.dto';
import { ConfigService } from 'src/config/config.service';
import * as jwt from "jsonwebtoken"

@Injectable()
export class AuthService {
    constructor(
        private readonly UtilisateursService: UtilisateursService,
        private readonly ConfigService: ConfigService
    ){}
    async validateUser(username:string, password: string): Promise<any>{
        const user  = await this.UtilisateursService.findOne(username);
        if(user && user.password === password){
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    /**
     * Vérifie l'existence d'un utilisateur et génère un token
     * @param dto 
     */
    public async sign(dto: authSignDto): Promise<string>{

        // get config
        let _config = this.ConfigService.getJwtConfig();

        // check args
        let _expiresIn = dto.expiresIn || (60 * 60 * 24);

        // check user

        // create payload
        const payload = { id: 1 }

        // create token
        const token = jwt.sign(payload, _config.private_key, {
            expiresIn: _expiresIn,
            algorithm: _config.algorithm,
            audience: _config.audience,
            issuer: _config.issuer
        });

        // save token (optional)

        // return token
        return token;
    }


    public async verify(token: string){
        // get config
        let _config = this.ConfigService.getJwtConfig();
        let _payload: any = undefined;
        try {
            _payload = jwt.verify(token, _config.public_key, {
                algorithms: [_config.algorithm],
                audience: _config.audience,
                issuer: _config.issuer
            })
        } catch(err){
            //throw new AuthenticationError("Token de connexion invalide");
        }
        
        return _payload;
    }


    private toPublicUser(){}


    public async getAuthUser(id: number){}
    public async createAuthUser(){}
    public async verifyAuthUserByEmail(){}
}
