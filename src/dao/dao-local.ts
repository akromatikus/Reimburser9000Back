import { promises as fs } from 'fs';
import user, { expenseHistory } from "../entities/user"

export interface userDao{
    readUsers(): Promise<user[]>
    updateUsers(updatedList: user[]): Promise<void>
}
//updatedList: user[]
export class userDaoConstruction implements userDao{
    

    //READ
    async readUsers(): Promise<user[]> {
        const userListBinary: Buffer = await fs.readFile(`src/assets/user-list-2.json`)
        const userListText: string = await userListBinary.toString()
        const userListJSON: user[] = JSON.parse(userListText)
        
        return userListJSON

    }

    //UPDATE. updated list is a list of users with their expenseHistory updated on the front end
    async updateUsers(updatedList: user[]): Promise<void> {
        await fs.writeFile(`src/assets/user-list-2.json`, JSON.stringify(updatedList));
    }   
}
