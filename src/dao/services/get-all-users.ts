import user from "../../entities/user"
import { promises as fs } from 'fs';
import { userDao } from "../dao-azure";


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
        // console.log("starting CheckIfUser: ")
        
        const userListJSON: user[] = await this.protectedContract.readUsers()

        //return the user so the properties can be accessed by other services
        return userListJSON
    }
}