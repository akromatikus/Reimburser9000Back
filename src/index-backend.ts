//backend index

import express from "express";
import cors from 'cors'
import user from "./entities/user"
import { userAccessContract, userAccessContractInstance} from "./dao/access-contract"

const app = express();
app.use(express.json());
app.use(cors())

const userAccess: userAccessContract = new userAccessContractInstance()


app.get("/", async (req,res) => {
    res.send('Derp')

})

//activate when frontend makes a fetch request to this server with the /users URI
app.patch("/users", async (req,res) => {


    try{
        //take the front end request username and pw entered and store them
        const request: {username: string, pw: string} = req.body
        console.log(`request is:`)
        console.log(request)

        const user: user = await userAccess.checkIfUser(request.username, request.pw)
        
        console.log("A user exists, responsing with user. the user is:")
        console.log(user)
        res.send(user)

    }
    catch{
        console.log("Not A User, sending rresponse...")
        res.json("Not a user")
    }

})

app.listen(5000,()=>console.log("Application Started"));
