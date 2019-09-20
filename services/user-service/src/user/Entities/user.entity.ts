import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm"
import { Personne } from "@shared/Entities/Personne/personne"

@Entity()
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