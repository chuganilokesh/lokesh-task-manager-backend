const request= require("supertest")
const Task= require("../src/models/task")
const {userOne,
    userOneid,
    setupDatabase,
userTwoid,
userTwo,
taskOne,
taskTwo,
taskThree}=require("./fixtures/db")
const app=require("../src/app")

beforeEach(setupDatabase)


test("should (create task for user",async()=>{
const response=await request(app)
.post("/tasks")
.set('Authorization',`Bearer ${userOne.tokens[0].token}`)
.send({
    description:"from test"
})
.expect(201)
const task=await Task.findById(response.body._id)
expect(task).not.toBeNull()
expect(task.completed).toBe(false)
})

test("should fetch user tasks ",async()=>{
    const response =await request(app)
    .get("/tasks")
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)

    expect(response.body.length).toBe(2)
})

test("should not delete others user~s tasks",async()=>{
  const response=await request(app)
  .delete(`/tasks/${taskOne._id}`)
  .set('Authorization',`Bearer ${userTwo.tokens[0].token}`)
  .send()
  .expect(404)
  const task=await Task.findById(taskOne._id)
  expect(task).not.toBeNull()
})
