import express from 'express';
import { connectMongoDb } from './database/index.js';
import TodoModel from './Models/Todo.js';
import UserModel from './Models/User.js';
const app = express();
connectMongoDb();
app.use(express.json());

app.post('/users', async (req, res) => {
    const { userName, role } = req.body;
    const newUser = UserModel(userName, role);
    const createdUser = await newUser.insertToDB();
    res.send({
        message: 'Thành công!',
        user: createdUser
    })
})
app.post('/todos', async (req, res) => {
    const { todoName, estimateDay, user } = req.body;
    const findUser = await UserModel().findUserById(user);
    if (!findUser) {
        res.send({
            message: 'Thất bại! Không tìm thấy user',
        });
        return;
    }
    const newtodo = TodoModel(todoName, estimateDay, user);
    const createdTodo = await newtodo.insertToDB();
    res.send({
        message: 'Thành công!',
        todo: createdTodo
    })
})
app.get('/todos', async (req, res) => {
    const listTodo = await TodoModel().getAllTodo();
    res.send({
        message: 'Thành công!',
        listTodo
    })
})
app.listen(8000, () => {
    console.log('Server is running!');
})