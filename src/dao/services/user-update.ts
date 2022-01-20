import user, { expenseHistory } from "../../entities/user"
import { promises as fs } from 'fs';
import { userDaoDatatypes } from "../dao-local";


export interface userUpdateDatatypes{

    //update user based on their id, return true if the process completes successfully.
    updateUsers(userlist: user[]): Promise<boolean>

    //updateUsers(updatedList: user[]): Promise<void>
}

export class userUpdate implements userUpdateDatatypes{

    // make a new protected dao interface
    private daoFunctions: userDaoDatatypes  

    //object constructor, which passes in a dao interface
    constructor(daoFunctions: userDaoDatatypes){
        this.daoFunctions = daoFunctions
    }
    
    //!userlist is just the list of updated users, not the full list!
    async updateUsers(userlist: user[]): Promise<boolean>{

        //user id array
        const IDlist = userlist.map( (user: user)=> {return user.id})
        
        
        try{
            //get the database userlist
            const userListJSON: user[] = await this.daoFunctions.readUsers()

            //creata a new array with the same size as the original
            
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

            await this.daoFunctions.updateUsers(updatedList)
    
            return true
        }
        catch{
            return false
        }        
    }  
}


//updateUserlist
// try{
//     const userListJSON: user[] = await this.daoFunctions.readUsers()
//     const updatedList: user[] = userListJSON.map( (user: user)=> 
//         {
//             if (user.id === id){
//                 user.expenseHistory.length = 0
//                 user.expenseHistory.push(...updatedExpenses)
//             }
//             return user
//         }
//     )            

//     await this.daoFunctions.updateUsers(updatedList)
    
//     return true
// }
// catch{
//     return false
// }