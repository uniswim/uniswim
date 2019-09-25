import { Module } from '@nestjs/common';
import { AuthenticateService } from './authenticate.service';
import { ConfigModule, Joi } from '../config/config.module';

@Module({
  imports: [ConfigModule.forRoot(Joi.object({
    "JWT_PUBLIC_KEY_FILE": Joi.string().required(),
    "JWT_PRIVATE_KEY_FILE": Joi.string().required(),
    "JWT_ALGORITHM": Joi.string().required(),
    "JWT_AUDIENCE": Joi.string().required(),
    "JWT_ISSUER": Joi.string().required(),
  }).unknown())],
  providers: [AuthenticateService],
  exports: [AuthenticateService]
})
export class AuthenticateModule {}
