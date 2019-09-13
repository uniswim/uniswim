import { Injectable } from '@nestjs/common';

export type User = {
    id: number
    username: string
    password: string
}

@Injectable()
export class UtilisateursService {
    private readonly users: User[];
    constructor(){
        this.users=[
            {id:1, username: "dviolet", password: "dviolet"}
        ]
    }

    async findOne(username: string): Promise<User | undefined>{
        return this.users.find(user => user.username === username);
    }
}
