import user from "../../entities/user"
import { promises as fs } from 'fs';
import { userDao } from "../dao-local";


export interface userCheckService{
    checkIfUser(username: string, pw: string): Promise<user>
}

export class userCheckServiceConstruction implements userCheckService{

    // make a new protected dao interface
    private protectedContract: userDao  

    //object constructor, which passes in a dao interface
    constructor(protectedContract: userDao){
        this.protectedContract = protectedContract
    }

    async checkIfUser(username: string, pw: string){
        console.log("starting CheckIfUser: ")
        
        const userListJSON: user[] = await this.protectedContract.readUsers()
        
        // const userListBinary: Buffer = await fs.readFile(`C:\\Users\\dasdu\\Documents\\Work\\Project\\reimburser9000\\src\\backend\\assets\\user-list.json`)
        // const userListText: string = await userListBinary.toString()
        // const userListJSON: user[] = await JSON.parse(userListText)

        //  console.log("The user List retrieved from the dao is: ")
        //  console.log(userListJSON)
        //  console.log('looking for matching username and pw... ')

        const foundUser = userListJSON.find
            (
                thisUsers => (thisUsers.username === username && thisUsers.pw === pw)
            )

        // console.log("checkIfUser returned: ", foundUser)
        if (!foundUser){throw new Error("no user found")}

        

        //return the user so the properties can be accessed by other services
        return foundUser
    }
}