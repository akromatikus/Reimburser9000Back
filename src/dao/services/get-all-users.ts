import user from "../../entities/user"
import { promises as fs } from 'fs';
import { userDaoDatatypes } from "../dao-local";


export interface getAllUsersDatatypes{
    getAllUsers(): Promise<user[]>
}

export class getAllUsersFunctions implements getAllUsersDatatypes{

    // make a new protected dao interface
    private protectedContract: userDaoDatatypes  

    //object constructor, which passes in a dao interface
    constructor(protectedContract: userDaoDatatypes){
        this.protectedContract = protectedContract
    }
    async getAllUsers(){
        console.log("starting CheckIfUser: ")
        
        const userListJSON: user[] = await this.protectedContract.readUsers()
        
        // const userListBinary: Buffer = await fs.readFile(`C:\\Users\\dasdu\\Documents\\Work\\Project\\reimburser9000\\src\\backend\\assets\\user-list.json`)
        // const userListText: string = await userListBinary.toString()
        // const userListJSON: user[] = await JSON.parse(userListText)

         console.log("The user List retrieved from the dao is: ")
         console.log(userListJSON)
         console.log('looking for matching username and pw... ')

        //return the user so the properties can be accessed by other services
        return userListJSON
    }
}