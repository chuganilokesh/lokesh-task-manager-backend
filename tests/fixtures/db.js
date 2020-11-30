const jwt=require("jsonwebtoken")
const mongoose=require("mongoose")
const User=require("../../src/models/user")
const Task=require("../../src/models/task")

const userOneid=new mongoose.Types.ObjectId
const userOne={
    _id: userOneid,
    name:"mike",
    email:"mike@example.com",
    password:"mypass123",
    tokens:[{
        token: jwt.sign({_id:userOneid},process.env.JWT_SECRET)
    }]
}

const userTwoid=new mongoose.Types.ObjectId
const userTwo={
    _id: userTwoid,
    name:"bhag",
    email:"bhag@example.com",
    password:"mypass123",
    tokens:[{
        token: jwt.sign({_id:userTwoid},process.env.JWT_SECRET)
    }]
}

const taskOne={
    _id:new mongoose.Types.ObjectId(),
    description:"first task",
    completed:"false",
    owner:userOne._id
}
const taskTwo={
    _id:new mongoose.Types.ObjectId(),
    description:"second task",
    completed:"true",
    owner:userOne._id
}
const taskThree={
    _id:new mongoose.Types.ObjectId(),
    description:"third task",
    completed:"false",
    owner:userTwo._id
}

const setupDatabase=async()=>{
    await User.deleteMany()
    await Task.deleteMany()
 await new User(userOne).save()
 await new User(userTwo).save()
 await new Task(taskOne).save()
 await new Task(taskTwo).save()
 await new Task(taskThree).save()

}
module.exports={
    userOneid,
    userOne,
    setupDatabase,
    userTwo,
    userTwoid,taskOne,taskTwo,taskThree
}