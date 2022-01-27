//backend index

import express from "express";
import cors from 'cors'
import user, { expenseHistory } from "./entities/user"
import { userDao, userDaoConstruction} from "./dao/dao-azure"
import { userCheckService, userCheckServiceConstruction } from "./dao/services/check-if-user";
import { userUpdateServiceConstruction, userUpdateService } from "./dao/services/user-update";
import { getAllUsersService, getAllUsersServiceConstruction } from "./dao/services/get-all-users";
const pino = require('pino-http')()

const app = express();
app.use(express.json());
app.use(cors())
app.use(pino)

//dao
const thisUserDao: userDao = new userDaoConstruction()

//service
const userCheckService: userCheckService = new userCheckServiceConstruction(thisUserDao)
const userUpdateService: userUpdateService = new userUpdateServiceConstruction(thisUserDao)
const getUserlistService: getAllUsersService = new getAllUsersServiceConstruction(thisUserDao)


app.get("/", async (req,res) => {
    req.log.info('The front end was established')
    res.send('Derp').status(200)

})

//activate when frontend makes a fetch request to this server with the /users URI
app.patch("/check-if-user", async (req,res) => {


    try{
        //take the front end request username and pw entered and store them
        const request: {username: string, pw: string} = req.body
        // console.log(`request is:`)
        // console.log(request)

        //get the user, if one exists
        const user: user = await userCheckService.checkIfUser(request.username, request.pw)
        
        // console.log("A user exists, backend responsing with user. the user is:")
        // console.log(user)
        
        //send the user data to the front end
        console.log('\n')
        req.log.info(`A login was attempted and a user exists with username ${request.username}`)
        console.log('\n')
        // console.log(logger.msg)
        res.send(user)

    }
    catch{
        console.log('\n')
        req.log.info('A login was attempted and a user does NOT exist')
        console.log('\n')
        // console.log("Not A User, sending response...")
        res.json("Not a user")
    }

})

app.get("/userlist", async (req,res) => {


    try{
        //get the users
        const users: user[] = await getUserlistService.getAllUsers()
        
        // console.log("A userlist exists, backend responsing with userlist: ", users)
    
        console.log('\n')
        req.log.info('A userlist was queried and retrieved from the DB')
        console.log('\n')
        
        //send the user data to the front end
        res.send(users)

    }
    catch(error){
        console.log('\n')
        req.log.debug(error)
        console.log('\n')
        // console.log("Not A User, sending response...")
        res.json("No userlist exists")
    }

})

app.patch("/update-users", async (req,res) => {

    try{
        //take the front end request username and pw entered and store them
        const usersToUpdate: user[] = await req.body
        // console.log(`Beginning update-users,front end request body is:`)
        // console.log(usersToUpdate)

        await userUpdateService.updateUsers(usersToUpdate)
        
        //console.log(`user with id:" ${updatedUser.id} updated`)
        // console.log("update successful, sending response to front end")
        //send the user data to the front end
        console.log('\n')
        req.log.info("Successfully updated DB userlist")
        console.log('\n')
        res.send("update successful").status(200)

    }
    catch(error){
        // console.log("update failed, sending response...")
        req.log.debug(error)
        res.send("update failed").status(404)
    }

})

app.listen(process.env.PORT ?? 5000,() => console.log("Application Started"));
