import {userDao, userDaoConstruction } from "../src/dao/dao-local";
import user from "../src/entities/user";

describe("User DAO Tests for reading and updating", ()=>{

    const userDaoTest: userDao = new userDaoConstruction();
    let userTest: user = {
        id:'789', 
        username:"Scott Pilgrim", 
        pw:"password", isManager: false, 
        expenseHistory:[{
            name:"derp", amount:400, reason:"meh", isApproved: 'n', comment: ""
        }]
    }

    it("Should READ all users and the pw for user 1", async ()=>{
        
        const userlist: user[] = await userDaoTest.readUsers();
        expect(userlist.length).toBe(3);
        expect(userlist[0].pw).toBe('b')
    })

    it("Should UPDATE the local userlist file (user-list.json), and only update the first user ", async ()=>{
        
        const userlist: user[] = await userDaoTest.readUsers();
        expect(userlist.length).toBe(3);
        expect(userlist[0].pw).toBe('b')

        userlist[0] = userTest
        await userDaoTest.updateUsers(userlist)
        
        const updatedUserlist: user[] = await userDaoTest.readUsers();
       
        expect(updatedUserlist.length).toBe(3);
        expect(updatedUserlist[0].id).toBe('789')
        expect(updatedUserlist[0].pw).toBe('password')

        expect(updatedUserlist[1].id).toBe('456')


    })

})