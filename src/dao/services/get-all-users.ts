import user from "../../entities/user"
import { promises as fs } from 'fs';
import { userDao } from "../dao-local";


export interface getAllUsersService{
    getAllUsers(): Promise<user[]>
}

export class getAllUsersServiceConstruction implements getAllUsersService{

    // make a new protected dao interface
    private protectedContract: userDao  

    //object constructor, which passes in a dao interface
    constructor(protectedContract: userDao){
        this.protectedContract = protectedContract
    }
    async getAllUsers(){
        console.log("starting CheckIfUser: ")
        
        const userListJSON: user[] = await this.protectedContract.readUsers()

        //  console.log("The user List retrieved from the dao is: ")
        //  console.log(userListJSON)
        //  console.log('looking for matching username and pw... ')

        //return the user so the properties can be accessed by other services
        return userListJSON
    }
}