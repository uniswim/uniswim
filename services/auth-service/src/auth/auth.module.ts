import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UtilisateursService } from '../utilisateurs/utilisateurs.service';
import { ConfigModule } from 'src/config/config.module';

@Module({
  imports: [ UtilisateursService, ConfigModule ],
  providers: [AuthService],
})
export class AuthModule {}
