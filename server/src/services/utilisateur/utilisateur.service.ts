import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Utilisateur } from '../../Entities';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UtilisateurService {
    constructor(
        @InjectRepository(Utilisateur)
        private readonly utilisateurRepo: Repository<Utilisateur>
    ){}

    async findById(id: number){
        return await this.utilisateurRepo.findOne(id, { relations: ["personne"] });
    }

    async findByEmail(email: string){

    }

    async findAll(){
        return await this.utilisateurRepo.find();
    }

    async create(){

    }

    async update(){
        
    }
}
