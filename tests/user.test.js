const request=require("supertest")
const app=require("../src/app")
const User=require("../src/models/user")
const { response } = require("../src/app")
const { findById } = require("../src/models/user")
const {userOne,userOneid,setupDatabase}=require("./fixtures/db")

beforeEach(setupDatabase)

test('should signup a new user',async()=>{
 const response=await request(app).post('/users').send({
     name:"lokesh",
     email:"mayankgouravcool1@gmail.com",
     password:"mypass123"
 }).expect(201)

 //assert that database was changed successfully
 const user= await User.findById(response.body.user._id)
 expect(user).not.toBeNull()

 //assertions are about the response
 expect(response.body).toMatchObject({
     user:{
         name:"lokesh",
         email:"mayankgouravcool1@gmail.com"
     },
     token:user.tokens[0].token
 })

 //stored password is hashed 

 expect(response.body.user.password).not.toBe("mypass123")
})


test('should login existing user',async()=>{
  const response=  await request(app).post("/users/login").send({
        email:userOne.email,
        password:userOne.password
    }).expect(200)
    const user= await User.findById(userOneid)
    expect(response.body.token).toBe(user.tokens[1].token)
})

test('should not login nonexistent user',async()=>{
    await request(app).post("/users/login").send({
        email:userOne,
        password:"this is not my pass"
    }).expect(400)
})
test('should delete account for user',async()=>{
    await request(app).
    delete("/users/me")
    .set('authorization',`Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
    const user=await User.findById(userOneid)
    expect(user).toBeNull()
})
test('should not delete acc for unauthorized user',async()=>{
    await request(app)
    .delete("/users/me")
    .send()
    .expect(401)
    
})

test("should upload avatar image",async()=>{
 await request(app)
 .post("/users/me/avatar")
 .set("Authorization",`Bearer ${userOne.tokens[0].token}`)
 .attach('avatar','tests/fixtures/profile-pic.jpg')
 .expect(200)

 const user=await User.findById(userOneid)
 expect(user.avatar).toEqual(expect.any(Buffer))
})
test('should update valid user fields',async()=>{
    const response=await request(app)
    .patch("/users/me")
    .set("Authorization",`Bearer ${userOne.tokens[0].token}`)
    .send({
        name:"loki"
    })
    .expect(200)
    const user= await User.findById(userOneid)
    expect(user.name).toEqual('loki')
})

test('should not  update invalid user fields',async()=>{
    await request(app)
    .patch("/users/me")
    .set("Authorization",`Bearer ${userOne.tokens[0].token}`)
    .send({
        location:"kuch b"
    })
    .expect(400)
   
})
