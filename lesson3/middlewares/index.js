const middlewares = {
    validationCreateTodo: (req, res, next) => {
        const { todoName, author } = req.body;
        if (!todoName) {
            res.send({
                message: 'Thất bại! Bạn cần truyền thông tin todoName',
                data: null
            });
            return;
        }
        if (!author) {
            res.send({
                message: 'Thất bại! Bạn cần truyền thông tin author',
                data: null
            })
            return;
        }
        next();
    }
}

export default middlewares;