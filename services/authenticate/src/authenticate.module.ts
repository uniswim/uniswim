import { Module } from '@nestjs/common';
import { AuthenticateService } from './authenticate.service';
import { ConfigModule, Joi } from "@uniswim/shared/dist/Modules/config/config.module"
import { ConfigService } from '@uniswim/shared/dist/Modules/config/config.service';
import { AuthenticateController } from './authenticate.controller';


@Module({
  imports: [ConfigModule.forRoot(Joi.object({
    "JWT_PUBLIC_KEY_FILE": Joi.string().required(),
    "JWT_PRIVATE_KEY_FILE": Joi.string().required(),
    "JWT_ALGORITHM": Joi.string().required(),
    "JWT_AUDIENCE": Joi.string().required(),
    "JWT_ISSUER": Joi.string().required(),
  }).unknown())],
  providers: [AuthenticateService],
  controllers: [AuthenticateController]
})
export class AuthenticateModule { }
