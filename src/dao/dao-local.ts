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
        const userListBinary: Buffer = await fs.readFile(`src/assets/user-list.json`)
        const userListText: string = await userListBinary.toString()
        const userListJSON: user[] = JSON.parse(userListText)
        
        return userListJSON

    }

    //UPDATE. updated list is a list of users with their expenseHistory updated on the front end
    async updateUsers(updatedList: user[]): Promise<void> {
        await fs.writeFile(`src/assets/user-list.json`, JSON.stringify(updatedList));
    }

    
}



// const userlistBinary: Buffer = await fs.readFile(`C:\\Users\\dasdu\\Documents\\Work\\Project\\Reimburser9000Back\\src\\assets\\user-list.json`)
// const userListText: string = await userlistBinary.toString()
// const userlist:user[] = JSON.parse(userListText);
// const index = userlist.findIndex(user => user.id === requestedIDs[0])
// userlist[index].expenseHistory.length=0
// userlist[index].expenseHistory.push(...updatedExpenses)