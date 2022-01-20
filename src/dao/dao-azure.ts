import { promises as fs } from 'fs';
import { CosmosClient } from '../../node_modules/@azure/cosmos/dist/types/latest/cosmos';
import user, { expenseHistory } from "../entities/user"

//Azure container
const client = new CosmosClient(process.env.DB_password ?? process.env.AzureCosmosConnection )
const database = client.database('myFirstDB');
const container = database.container('myFirstContainer');

export interface azureDaoFunctions{
    readUsers(): Promise<user[]>
    updateUserlist(updatedList: user[]): Promise<void>
    updateUser(user: user): Promise<void>
}
//updatedList: user[]
export class azureDao implements azureDaoFunctions{
    

    //READ
    async readUsers(): Promise<user[]> {
        const userlist = await container.items.readAll<user>().fetchAll();
        return userlist.resources

    }

    //UPDATE. updated list is a list of users with their expenseHistory updated on the front end
    async updateUserlist(updatedList: user[]): Promise<void> {
        await container.items.upsert<user[]>(updatedList); 
    }

    async updateUser(user: user){
        await container.items.upsert<user>(user)
    }
}



// const userlistBinary: Buffer = await fs.readFile(`C:\\Users\\dasdu\\Documents\\Work\\Project\\Reimburser9000Back\\src\\assets\\user-list.json`)
// const userListText: string = await userlistBinary.toString()
// const userlist:user[] = JSON.parse(userListText);
// const index = userlist.findIndex(user => user.id === requestedIDs[0])
// userlist[index].expenseHistory.length=0
// userlist[index].expenseHistory.push(...updatedExpenses)