import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity({ name: "personnes" })
export class Personne {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    genre?: number

    @Column()
    titre?: string

    @Column()
    nom?: string

    @Column()
    nom_phonetic?: string

    @Column()
    prenom?: string

    @Column()
    prenom_phonetic?: string

    @Column()
    date_naissance?: Date

    @Column({ type: "text" })
    maladies?: string
}