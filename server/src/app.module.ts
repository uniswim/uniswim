import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticateModule } from './services/authenticate/authenticate.module';
import { UtilisateurModule } from './services/utilisateur/utilisateur.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from './services/config/config.module';
import { ConfigService } from './services/config/config.service';
import * as entities from "./Entities"

let _entities = [];
for(let key in entities){
  _entities.push(entities[key])
}

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forRootDatabase()],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: "mysql",
        host: config.get("DATABASE_HOST"),
        port: parseInt(config.get("DATABASE_PORT")),
        username: config.get("DATABASE_USER"),
        password: config.get("DATABASE_PASSWORD"),
        database: config.get("DATABASE_NAME"),
        entities: [ entities.Personne, entities.Utilisateur ]
      })
    }),
    AuthenticateModule,
    UtilisateurModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
