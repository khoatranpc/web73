import { authors, todos } from "../database/index.js";
const authorsController = {
    getAll: (req, res) => {
        res.send({
            message: 'Thành công',
            data: authors
        });
    },
    getAuthorByIdParam: (req, res) => {
        const { id } = req.params;
        const { apiKey } = req.query;
        if (apiKey !== id) {
            res.send({
                message: 'Bạn không được phép thực hiện hành động!',
                data: undefined,
            });
            return;
        }
        const author = authors.find((item) => String(item.id) === id);
        if (!author) {
            res.send({
                message: 'Thất bại! Không tìm thấy dữ liệu!',
                data: undefined
            });
        } else {
            res.send({
                message: 'Thành công!',
                data: author
            });
        }
    },
    getAllTodosByAuthorIdParam: (req, res) => {
        const { id } = req.params;
        const { apiKey } = req.query;
        if (apiKey !== id) {
            res.send({
                message: 'Bạn không được phép thực hiện hành động!',
                data: undefined,
            });
            return;
        }
        const author = authors.find((item) => String(item.id) === id);
        if (!author) {
            res.send({
                message: 'Thất bại! Không tìm thấy dữ liệu author!',
                data: undefined
            });
        } else {
            const listTodo = todos.filter((item) => String(item.author) === id);
            res.send({
                message: 'Thành công!',
                data: listTodo
            });
        }
    },
    updateTodo: (req, res) => {
        const { id, todoId } = req.params;
        const { todoName } = req.body;
        const { apiKey } = req.query;
        if (apiKey !== id) {
            res.send({
                message: 'Bạn không được phép thực hiện hành động!',
                data: undefined,
            });
            return;
        }
        const author = authors.find((item) => String(item.id) === id);
        if (!author) {
            res.send({
                message: 'Thất bại! Không tìm thấy dữ liệu author!',
                data: undefined
            });
        } else {
            const crrTodo = todos.find((item) => String(item.id) === todoId);
            if (!crrTodo) {
                res.send({
                    message: 'Thất bại! Không tìm thấy dữ liệu todo!',
                    data: undefined
                });
            } else {
                if (typeof todoName !== 'undefined') {
                    crrTodo.todoName = todoName;
                }
                res.send({
                    message: 'Thành công!',
                    data: crrTodo
                });
            }
        }
    }
}
export default authorsController;