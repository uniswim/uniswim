import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { UtilisateurService } from './services/utilisateur/utilisateur.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UtilisateurService
  ) {}

  @Get()
  async getHello() {
    return await this.userService.findById(1);
  }
}
