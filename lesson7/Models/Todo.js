import { ObjectId } from "mongodb";
import { Collections } from "../database/index.js";

class Todo {
    constructor(todoName, estimateDay, user) {
        this.todoName = todoName;
        this.estimateDay = estimateDay;
        this.user = user;
    }
    async insertToDB() {
        const newTodo = {
            todoName: this.todoName,
            estimateDay: this.estimateDay,
            user: new ObjectId(this.user),
        }
        const createTodo = await Collections["TODOS"].insertOne(newTodo)
        return createTodo;
    }
    async getAllTodo(condition) {
        return await Collections["TODOS"].aggregate([
            {
                "$match": {
                    ...condition ? condition : {}
                }
            },
            {
                "$lookup": {
                    // collection nào là collection cần tham chiếu
                    "from": "users",
                    // trường mà cần tham chiếu trong document hiện tại
                    "localField": "user",
                    // trường tham chiếu tới
                    "foreignField": "_id",
                    "as": "user",
                }
            },
            {
                "$unwind": "$user"
            }
        ]).toArray();
    }
}
const TodoModel = (todoName, estimateDay, user) => {
    return new Todo(todoName, estimateDay, user)
}
export default TodoModel;