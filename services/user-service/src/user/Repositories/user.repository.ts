import { Repository, EntityRepository } from "typeorm"
import { Utilisateur } from "../Entities/user.entity"

@EntityRepository(Utilisateur)
export class UserRepository extends Repository<Utilisateur> {

}