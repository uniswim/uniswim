import { Module } from '@nestjs/common';
import { UtilisateurService } from './utilisateur.service';
import { TypeOrmModule } from "@nestjs/typeorm"
import { Utilisateur } from '../../Entities/Utilisateur/utilisateur.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Utilisateur])
  ],
  providers: [UtilisateurService],
  exports: [UtilisateurService]
})
export class UtilisateurModule {}
