import { promises as fs } from 'fs';
import user from "../entities/user"

export interface userAccessContract{
    checkIfUser(username: string, pw: string): Promise<user>
    getAllUsers(): Promise<user[]>
}

export class userAccessContractInstance implements userAccessContract{
    async checkIfUser(username: string, pw: string): Promise<user> {
        console.log("starting CheckIfUser: ")
        const userListBinary: Buffer = await fs.readFile(`C:\\Users\\dasdu\\Documents\\Work\\Project\\reimburser9000\\src\\backend\\assets\\user-list.json`)
        const userListText: string = await userListBinary.toString()
        const userListJSON: user[] = await JSON.parse(userListText)

        console.log("Looking for index. the userlist is: ")
        console.log(userListJSON[0])

        
        const userIndex = userListJSON.find
            (
                thisUsers => (thisUsers.username === username && thisUsers.pw === pw)
            )

        if (!userIndex){throw new Error}

        console.log("checkIfUser returned: ")
        console.log(userIndex)

        return userIndex
        // if
        // (
        //     isUser > -1
        // )
        // {
        //     return userListJSON[isUser]         
        // }
        // else
        // {
        //     return 
        // }
        // console.log(userListJSON)
        //const thisUser:user[] = await JSON.parse(userList).toString()
        //return userListJSON //thisUser.find(m => m.username === username)
    }

    async getAllUsers(): Promise<user[]> {
        const userListBinary: Buffer = await fs.readFile(`C:\\Users\\dasdu\\Documents\\Work\\Project\\reimburser9000\\src\\backend\\assets\\user-list.json`)
        const userListText: string = await userListBinary.toString()
        const userListJSON: user[] = JSON.parse(userListText)
        //console.log(userListJSON)
        //const thisUser:user[] = await JSON.parse(userList).toString()
        return userListJSON //thisUser.find(m => m.username === username)

    }
}