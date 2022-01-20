import {userDao, userDaoDatatypes } from "../src/dao/dao-local";
import user from "../src/entities/user";

describe("User DAO Tests", ()=>{

    const userDaoTest: userDaoDatatypes = new userDao();
    let userTest: user = {
        id:'789', 
        username:"Scott Pilgrim", 
        pw:"password", isManager: false, 
        expenseHistory:[{
            name:"derp", amount:400, reason:"meh", isApproved: 'n'
        }]
    }

    // it("Should Create a user", async () =>{
    //     const returneduser: user = await userDao.createuser(testuser);
    //     expect(returneduser.id).toBeTruthy()
    //     testuser = returneduser;
    // })

    // it("Should get a user by ID", async ()=>{
    //     const user:user = await userDao.getuserById(testuser.id);
    //     expect(user.id).toBe(testuser.id);
    // })

    it("Should get all users and the pw for user 1", async ()=>{
        
        const userlist: user[] = await userDaoTest.readUsers();
        expect(userlist.length).toBe(2);
        expect(userlist[0].pw).toBe('b')
    })

    it("Should update the local userlist file (user-list.json), and only update the first user ", async ()=>{
        
        const userlist: user[] = await userDaoTest.readUsers();
        expect(userlist.length).toBe(2);
        expect(userlist[0].pw).toBe('b')

        userlist[0] = userTest
        await userDaoTest.updateUsers(userlist)
        
        const updatedUserlist: user[] = await userDaoTest.readUsers();
       
        expect(updatedUserlist.length).toBe(2);
        expect(updatedUserlist[0].id).toBe('789')
        expect(updatedUserlist[0].pw).toBe('password')

        expect(updatedUserlist[1].id).toBe('456')


    })

})