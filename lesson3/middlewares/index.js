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
    },
    checkApiKey: (req, res, next) => {
        const { apiKey } = req.query;
        if (!apiKey) {
            res.send({
                message: 'Bạn không được phép thực hiện hành động',
                data: null
            });
            return;
        }
        next();
    }
}

export default middlewares;