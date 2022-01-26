import user, { expenseHistory } from "../../entities/user"
import { promises as fs } from 'fs';
import { userDao } from "../dao-azure";


export interface userUpdateService{

    //update user based on their id, return true if the process completes successfully.
    updateUsers(userlist: user[]): Promise<boolean>

    //updateUsers(updatedList: user[]): Promise<void>
}

export class userUpdateServiceConstruction implements userUpdateService{

    // make a new protected dao interface
    private daoFunctions: userDao  

    //object constructor, which passes in a dao interface
    constructor(daoFunctions: userDao){
        this.daoFunctions = daoFunctions
    }
    
    //!userlist is just the list of updated users, not the full list!
    async updateUsers(userlist: user[]): Promise<boolean>{

        //user id array
        const IDlist = userlist.map( (user: user)=> {return user.id})
        
        
        try{
            //get the database userlist
            const userListJSON: user[] = await this.daoFunctions.readUsers()

            // console.log("The dao userlist to be updated is ", userListJSON)
            
            //for each user in the database
            const updatedList: user[] = userListJSON.map( (user: user)=> 
                {
                    //get the index of the ID input list that matcges this user
                    const IDindex = IDlist.indexOf(user.id)
                    //if the IDlist input contains an id matching this database user, return the user from the userlist input
                    if (IDindex != -1) {return userlist[IDindex]}
                    else {return user} //otherwise return the unchanged database user       
                }
            )            

            // console.log("The updated list that the dao will update with is  ", updatedList)
            // console.log("The first expense is now  ", updatedList[0].expenseHistory)
            
            await this.daoFunctions.updateUsers(updatedList)
    
            // console.log("will return true now")
            return true
        }
        catch{
            return false
        }        
    }  
}
