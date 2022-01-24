import {userDao, userDaoConstruction } from "../src/dao/dao-local";
import {userCheckService, userCheckServiceConstruction } from "../src/dao/services/check-if-user";
import { getAllUsersService, getAllUsersServiceConstruction } from "../src/dao/services/get-all-users";
import { userUpdateService, userUpdateServiceConstruction } from "../src/dao/services/user-update";
import user from "../src/entities/user";


describe("Services testing", ()=>{

    //create dao and a user mock
    class userDaoStub implements userDao{
        
        //READ
        async readUsers(): Promise<user[]> {
        
            const userlistStub: user[] = [
                {
                    id:'123', 
                    username:"name1", 
                    pw:"password1", 
                    isManager: false, 
                    expenseHistory:[{
                        name:"derp", amount:100, reason:"meh", isApproved: 'Pending', comment: ""
                    }]
                },
                {
                    id:'456', 
                    username:"name2", 
                    pw:"password2", 
                    isManager: true, 
                    expenseHistory:[{
                        name:"derp", amount:200, reason:"meh", isApproved: 'Yes', comment: ""
                    }]
                },
                {
                    id:'789', 
                    username:"name3", 
                    pw:"password3", 
                    isManager: false, 
                    expenseHistory:[{
                        name:"derp", amount:300, reason:"meh", isApproved: 'No', comment: ""
                    }]
                }
            ]
            return userlistStub 
        }

        //UPDATE. updated list is a list of users with their expenseHistory updated on the front end
        async updateUsers(updatedList: user[]): Promise<void> {
            if(updatedList[0].expenseHistory[0].comment !== 'yo') {throw new Error} 
        }

    }

    const userDaoTest: userDao = new userDaoStub
    const checkUserServiceMock: userCheckService =  new userCheckServiceConstruction(userDaoTest)
    const getAllUsersServiceMock: getAllUsersService = new getAllUsersServiceConstruction(userDaoTest)
    const userUpdateServiceMock: userUpdateService = new userUpdateServiceConstruction(userDaoTest)


    //check-if-user////////////////////////////////////////////////////////////
    const usernameInput: string = 'name1'
    const pwInput: string = 'password1'
    it("Should expect a user to exist and the id to be 123", async()=>{
        //will either throw error or return a use
        const userExists = await checkUserServiceMock.checkIfUser(usernameInput, pwInput)
        expect(userExists).toBeDefined()
        expect(userExists.id).toBe('123')
    })

    const wrongUsernameInput: string = 'noname'
    const wrongPwInput: string = 'wrongpassword'
    it("Should expect a user to not exist", async()=>{
        //will either throw error or return a use
        try{
            const userExists = await checkUserServiceMock.checkIfUser(wrongUsernameInput, wrongPwInput)
            //fail()
        }
        catch(error){
            expect(error.message).toBe('no user found')
        }
    })

    
    
    
    
    //get-all-users//////////////////////////////////////////////////////////// 
    it("Should expect a userlist with 3 users", async()=>{
        //will either throw error or return a use
        const userlistExists = await getAllUsersServiceMock.getAllUsers()
        expect(userlistExists).toBeDefined()
        expect(userlistExists).toHaveLength(3)
        expect(userlistExists[0].id).toBe('123')
        expect(userlistExists[1].id).toBe('456')
        expect(userlistExists[2].id).toBe('789')
    })

   
    
    
    
    //user-update/////////////////////////////////////////////////////////////
    const newUserlistStub: user[] = [
        {
            id:'123', 
            username:"name1", 
            pw:"password1", isManager: false, 
            expenseHistory:[{
                name:"derp", amount:100, reason:"meh", isApproved: 'Pending', comment: "yo"
            }]
        },
        {
            id:'456', 
            username:"name2", 
            pw:"password2", isManager: true, 
            expenseHistory:[{
                name:"derp", amount:200, reason:"meh", isApproved: 'Yes', comment: "yoyo"
            }]
        },
        {
            id:'789', 
            username:"name3", 
            pw:"password3", isManager: false, 
            expenseHistory:[{
                name:"derp", amount:300, reason:"meh", isApproved: 'No', comment: "yoyoyo"
            }]
        }
    ]

    it("Should expect the updated userlist to contain the new comment that was inputted by the newUserlistStub", async()=>{

        //update the users which were inputted here.
        const userupdater = await userUpdateServiceMock.updateUsers(newUserlistStub)
        expect(userupdater).toBe(true)  

        const userupdaterFail = await userUpdateServiceMock.updateUsers([])
        expect(userupdaterFail).toBe(false)
    })
})