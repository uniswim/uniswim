import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UtilisateursModule } from './utilisateurs/utilisateurs.module';
import { ConfigService } from './config/config.service';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [AuthModule, UtilisateursModule, ConfigModule],
  providers: [ConfigService],
})
export class AppModule {}
