import { Injectable } from '@nestjs/common';
import { UserRepository } from './Repositories/user.repository';

@Injectable()
export class UserService {
    constructor(
        private readonly utilisateurRepo: UserRepository
    ){}
}
