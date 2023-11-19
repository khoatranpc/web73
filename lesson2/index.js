import express from 'express';
// khởi tạo app server
const todoList = [
    {
        id: '1',
        todoName: 'Rửa bát quét nhà',
        author: 'Mẹ'
    },
    {
        id: '2',
        todoName: 'Sửa nhà bếp',
        author: 'Bố'
    },
];
const app = express();

app.get('/todos', (req, res) => {
    // res.end() truyền các định dạng dành cho tệp hoặc định dạng đặc biệt mà trình duyệt có thể hiểu
    // truyền dữ liệu
    res.json(todoList);
});
// tương tự cách thức trên
// yêu cầu:
// viết API thực hiện thêm 1 todo mới, todo tự tạo mặc định (thêm random, bất kỳ todo nào cũng được)
// /todos/add

app.get('/todos/add', (req, res) => {
    const newTodo = {
        id: 5,
        todoName: 'Học bài',
        author: 'Nobita'
    };
    todoList.push(newTodo);
    res.json(todoList);
});
// viết API tìm kiếm 1 todo với 1 id cố định được truyền trên API
// todos/1
// todos/2
// đối với api tìm kiếm, lấy dữ liệu,
// ta sẽ sử dụng kỹ thuật lấy giá trị từ params trên api endpoint
// /todos/123213213dahsfiuhadsfuhds
// /todos/:id
app.get('/todos/:id', (req, res) => {
    // truyền giá trị qua tham số params
    const { id } = req.params;
    const crrTodo = todoList.find(item => item.id.toString() === id.toString());
    if (!crrTodo) {
        res.json({
            message: 'Không tìm thấy todo!'
        });
    } else {
        res.json({
            message: 'Thành công!',
            data: crrTodo
        });
    }
});

app.listen(3001, () => {
    console.log('Server is running!');
});