import { Module, DynamicModule } from '@nestjs/common';
import { ConfigService } from './config.service';
import * as JoiDef from "@hapi/joi"

export const Joi = JoiDef;

@Module({ })
export class ConfigModule {
  static forRoot(schema?: JoiDef.ObjectSchema): DynamicModule {
    let _providers = [
      {
        provide: ConfigService, useValue: new ConfigService(schema)
      }
    ]
    return {
      module: ConfigModule,
      providers: _providers,
      exports: _providers
    }
  }

  static forRootDatabase(): DynamicModule {
    return ConfigModule.forRoot(Joi.object({
      "DATABASE_HOST": Joi.string().required(),
      "DATABASE_PORT": Joi.string().required(),
      "DATABASE_USER": Joi.string().required(),
      "DATABASE_PASSWORD": Joi.string().allow(""),
      "DATABASE_NAME": Joi.string().required(),
    }).unknown());
  }
}
