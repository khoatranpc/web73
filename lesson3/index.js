import express from 'express';
import crypto from 'crypto';
import middlewares from './middlewares/index.js';
const app = express();
app.use(express.json());

const todos = [];
/**
 * với mỗi một API thì endpoint thường sẽ là tên resourse
 * https://facebook.com
 * http://localhost:3001/classes
 * 
 * GET -> có 3 cách dùng
 * + lấy tất cả dữ liệu: http://localhost:3001/classes
 * + lấy duy nhất một dữ liệu qua id truyền trên params: http://localhost:3001/classes/1
 * + sử dụng theo dạng truy vấn với 2 cách phía trên (query)
 *  YC: ví dụ truy vấn phân trang: http://localhost:3001/classes?rowOnPage=10&page=1&cell=5
 * POST -> thường sẽ là thêm 1 dữ liệu vào 1 resourse
 *  (Quy định sẽ gửi ngầm dữ liệu qua body của request)
 *  http://localhost:3001/classes/1/students tuỳ vào nghiệp vụ, nhưng yêu cầu endpoint phải là tên 1 resourse
 */
app.post('/todos', middlewares.validationCreateTodo, (req, res) => {
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
});
// viết api: /todos -> thực hiện lấy dữ liệu todos
app.get('/todos', (req, res) => {
    const { todoName } = req.query;
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
});

// viết API -> thực hiện tìm kiếm một todos với Id được truyền trên params
app.get('/todos/:id', (req, res) => {
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
});
// viết API -> thực hiện tìm kiêm tất cả các todoName thoả mãn với todoName được truyền trên query params
// todoName chỉ cần chứa ký tự được truyền, không phân biệt ký tự hoa, thường

// tìm hiểu và thực viết API dùng để cập nhật một phần tử todo (PUT)
// lưu ý khi mà dùng với PUT
// cách dùng API -> endpoint là 1 id params
// phải gửi dữ liệu cần cập nhật dưới body
app.put('/todos/:id', (req, res) => {
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
});

/**
 * Viết api CRUD theo RESTful API, với resource là authors
 * {
 *  id,
 *  authorName
 * }
 * 
 * YC1: khi thực hiện tạo một todo, trường author sẽ là id của author trong resource authors
 * phải kiểm tra xem có tồn tại author với cái id dược thêm hay k, nếu tồn tại thì thêm todo mới tạo, còn không, thì phải ra trả lỗi
 * YC2: ở API cập nhật hoặc xoá -> chỉ có author trong dữ liệu đó mới được phép xoá
 * Gợi í PUT: /authors/:id/todos/:todoId
 */
app.listen(3001, () => {
    console.log('Server được chạy rùi nè!');
});