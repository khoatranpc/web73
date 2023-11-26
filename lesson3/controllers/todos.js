import { todos } from "../database/index.js";
import crypto from 'crypto';

const todosController = {
    createTodo: (req, res) => {
        // nhận về định dạng json
        /**
         * Một todo: id, todoName, author
         */
        const { todoName, author } = req.body;
        const newTodo = {
            todoName,
            author,
            id: crypto.randomUUID()
        };
        todos.push(newTodo);
        res.status(201).send({
            messasge: 'Thành công!',
            data: todos
        });
        return;
    },
    getAll: (req, res) => {
        const { todoName, authorId } = req.query;
        if (todoName) {
            const listData = todos.filter((item) => {
                return String(item.todoName).toLowerCase().includes(todoName.toLowerCase());
            });
            res.send({
                message: 'Thành công!',
                data: listData
            });
        } else {
            res.send({
                message: 'Thành công!',
                data: todos
            });
        }
    },
    getOnTodoByIdParam: (req, res) => {
        const { id } = req.params;
        const currentTodo = todos.find((item) => item.id === id);
        if (!currentTodo) {
            res.send({
                message: 'Thất bại! Không tồn tại bản ghi dữ liệu!',
                data: null
            });
        } else {
            res.send({
                message: 'Thành công!',
                data: currentTodo
            });
        }
    },
    updateTodoByIdParam: (req, res) => {
        try {
            const { id } = req.params;
            const payload = req.body;
            const foundTodo = todos.find((item) => {
                return item.id === id;
            });
            if (!foundTodo) throw new Error('Không tìm thấy todo hợp lệ!');
            // kiểm tra số lượng key được gửi lên từ body
            if (Object.keys(payload).length) {
                // lặp key từ body
                for (const key in payload) {
                    // để lấy được giá trị của todo đã tìm, 
                    // sau đó cập nhật bằng giá trị value của key được gửi lên
                    foundTodo[key] = payload[key];
                }
            }
            res.status(201).send({
                message: 'Thành công!',
                data: foundTodo
            });
        } catch (error) {
            res.status(403).send({
                message: error.message,
                data: null
            });
        }
    }
}
export default todosController;