import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm"
import { Personne } from "../Personne/personne"

@Entity({ name: "utilisateurs" })
export class Utilisateur {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    personne_id: number

    @Column({ length: 256 })
    password: string

    @OneToOne(type => Personne)
    @JoinColumn({ name: "personne_id" })
    personne: Personne
}