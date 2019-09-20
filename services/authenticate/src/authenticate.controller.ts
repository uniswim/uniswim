import { Controller } from '@nestjs/common';
import { AuthenticateService } from './authenticate.service';
import { authSignDto, authVerifyDto } from './authenticate.dto';
import { MessagePattern } from "@nestjs/microservices"

@Controller('authenticate')
export class AuthenticateController {
    constructor(
        private readonly AuthService: AuthenticateService
    ){}

    @MessagePattern({ service: "auth", cmd: "sign" })
    public async sign(dto: authSignDto): Promise<string> {
        return await this.AuthService.sign(dto);
    }

    @MessagePattern({ service: "auth", cmd: "verify" })
    public async verify(dto: authVerifyDto) {
        return await this.AuthService.verify(dto);
    }
}
