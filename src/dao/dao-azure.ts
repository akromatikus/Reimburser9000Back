import { promises as fs } from 'fs';
import { CosmosClient } from "@azure/cosmos";

import user, { expenseHistory } from "../entities/user";

//Azure container
const client = new CosmosClient(process.env.AzureConnectionKey)
const database = client.database('reimbursement-management-website');
const container = database.container('userlist');

export interface userDao{
    readUsers(): Promise<user[]>
    updateUsers(updatedList: user[]): Promise<void>
}

export class userDaoConstruction implements userDao{
    
    //READ
    async readUsers(): Promise<user[]> {
        //const userListBinary: Buffer = await fs.readFile(`src/assets/user-list.json`)
        const response = await container.items.readAll<user>().fetchAll();
        return response.resources
        
        //const userListText: string = await userListBinary.toString()
        //const userListJSON: user[] = JSON.parse(userListText)
        
        //return userListJSON

    }

    //UPDATE. updated list is a list of users with their expenseHistory updated on the front end
    async updateUsers(updatedList: user[]): Promise<void> {
        const response = await container.items.upsert<user[]>(updatedList);
        console.log(response)
    }   
}
