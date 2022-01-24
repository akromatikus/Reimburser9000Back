//backend index

import express from "express";
import cors from 'cors'
import user, { expenseHistory } from "./entities/user"
import { userDao, userDaoConstruction} from "./dao/dao-local"
import { userCheckService, userCheckServiceConstruction } from "./dao/services/check-if-user";
import { userUpdateServiceConstruction, userUpdateService } from "./dao/services/user-update";
import { getAllUsersService, getAllUsersServiceConstruction } from "./dao/services/get-all-users";

const app = express();
app.use(express.json());
app.use(cors())

//dao
const thisUserDao: userDao = new userDaoConstruction()

//service
const userCheckService: userCheckService = new userCheckServiceConstruction(thisUserDao)
const userUpdateService: userUpdateService = new userUpdateServiceConstruction(thisUserDao)
const getUserlistService: getAllUsersService = new getAllUsersServiceConstruction(thisUserDao)


app.get("/", async (req,res) => {
    res.send('Derp')

})

//activate when frontend makes a fetch request to this server with the /users URI
app.patch("/check-if-user", async (req,res) => {


    try{
        //take the front end request username and pw entered and store them
        const request: {username: string, pw: string} = req.body
        console.log(`request is:`)
        console.log(request)

        //get the user, if one exists
        const user: user = await userCheckService.checkIfUser(request.username, request.pw)
        
        console.log("A user exists, backend responsing with user. the user is:")
        console.log(user)
        //send the user data to the front end
        res.send(user)

    }
    catch{
        console.log("Not A User, sending response...")
        res.json("Not a user")
    }

})

app.get("/userlist", async (req,res) => {


    try{
        //get the users
        const users: user[] = await getUserlistService.getAllUsers()
        
        console.log("A userlist exists, backend responsing with userlist: ", users)
    
        
        //send the user data to the front end
        res.send(users)

    }
    catch{
        console.log("Not A User, sending response...")
        res.json("Not a user")
    }

})

app.patch("/update-users", async (req,res) => {

    try{
        //take the front end request username and pw entered and store them
        const usersToUpdate: user[] = req.body
        console.log(`Beginning update-users,front end request body is:`)
        console.log(usersToUpdate)

        await userUpdateService.updateUsers(usersToUpdate)
        
        //console.log(`user with id:" ${updatedUser.id} updated`)
        console.log("update successful, sending response to front end")
        //send the user data to the front end
        res.send("update successful").status(200)

    }
    catch{
        console.log("update failed, sending response...")
        //res.json("Not a user")
        res.send("update failed").status(404)
    }

})

app.listen(5000,() => console.log("Application Started"));
