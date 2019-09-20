import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ConfigModule, Joi } from "@uniswim/shared/dist/Modules/config/config.module"
import { ConfigService } from "@uniswim/shared/dist/Modules/config/config.service"
import { TypeOrmModule } from "@nestjs/typeorm"
import { UserRepository } from './Repositories/user.repository';



@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule.forRoot(Joi.object({
        "DATABASE_HOST": Joi.string().required(),
        "DATABASE_PORT": Joi.string().required(),
        "DATABASE_USER": Joi.string().required(),
        "DATABASE_PASSWORD": Joi.string().required(),
        "DATABASE_NAME": Joi.string().required(),
      }).unknown())],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: "mysql",
        host: config.get("DATABASE_HOST"),
        port: parseInt(config.get("DATABASE_PORT")),
        username: config.get("DATABASE_USER"),
        password: config.get("DATABASE_PASSWORD"),
        database: config.get("DATABASE_NAME")
      })
    }),
    TypeOrmModule.forFeature([UserRepository])
  ],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
