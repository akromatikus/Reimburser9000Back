import user from "../../entities/user"
import { promises as fs } from 'fs';
import { userDaoDatatypes } from "../dao-local";


export interface userCheckDatatypes{
    checkIfUser(username: string, pw: string): Promise<user>
}

export class userCheck implements userCheckDatatypes{

    // make a new protected dao interface
    private protectedContract: userDaoDatatypes  

    //object constructor, which passes in a dao interface
    constructor(protectedContract: userDaoDatatypes){
        this.protectedContract = protectedContract
    }

    async checkIfUser(username: string, pw: string){
        console.log("starting CheckIfUser: ")
        
        const userListJSON: user[] = await this.protectedContract.readUsers()
        
        // const userListBinary: Buffer = await fs.readFile(`C:\\Users\\dasdu\\Documents\\Work\\Project\\reimburser9000\\src\\backend\\assets\\user-list.json`)
        // const userListText: string = await userListBinary.toString()
        // const userListJSON: user[] = await JSON.parse(userListText)

         console.log("The user List retrieved from the dao is: ")
         console.log(userListJSON)
         console.log('looking for matching username and pw... ')

        const userIndex = userListJSON.find
            (
                thisUsers => (thisUsers.username === username && thisUsers.pw === pw)
            )

        if (!userIndex){throw new Error}

        console.log("checkIfUser returned: ")
        console.log(userIndex)

        //return the user so the properties can be accessed by other services
        return userIndex
    }
}