import express from 'express';
import { ObjectId } from 'mongodb';
import { connectMongoDb, Collections } from './database/index.js';
import { createAccessToken } from './utils/index.js';
import middlewares from './middlewares/index.js';

const app = express();
app.use(express.json());
connectMongoDb();
app.post('/register', async (req, res) => {
    const { email, password } = req.body;
    if (!email) {
        res.send({
            message: 'Thất bại! Bạn cần cung cấp email'
        });
        return;
    }
    if (!password) {
        res.send({
            message: 'Thất bại! Bạn cần cung cấp mật khẩu'
        });
        return;
    }
    const checkExistedEmail = await Collections["USERS"].findOne({
        email
    });
    if (checkExistedEmail) {
        res.send({
            message: 'Thất bại! Email đã tồn tại!'
        });
        return;
    }
    const createdUser = await Collections["USERS"].insertOne({
        email,
        password
    });
    res.send({
        message: 'Đăng ký thành công!',
        data: createdUser
    })
});

app.post('/login', async (req, res) => {
    /**
     * Nhận email, mật khẩu từ body
     * Thực hiện tìm dữ liệu trong collection user với email và mật khẩu tương ứng
     * Nếu không tìm thấy, trả về thông báo: Sai tài khoản hoặc mật khẩu!
     * Nếu tìm thấy -> trả về thông tin của người dùng đã đăng ký
     */
    const { email, password } = req.body;
    if (!email || !password) {
        res.send({
            message: 'Cần cung cấp đầy đủ emai và password'
        });
        return;
    }
    const findCurrentUser = await Collections["USERS"].findOne({
        email,
        password
    });
    res.send({
        mesage: findCurrentUser ? 'Đăng nhập thành công!' : 'Sai tài khoản hoặc mật khẩu!',
        data: findCurrentUser ? createAccessToken(findCurrentUser) : findCurrentUser
    })
});

app.put('/users/:id', middlewares.checkToken, async (req, res) => {
    const { id } = req.params;
    const payloadToken = req.user;
    if (payloadToken.id !== id) {
        res.send({
            message: 'Bạn không có quyền thực hiện hành động!'
        });
        return;
    }
    const { password, confirmPassword } = req.body;
    const currentUser = await Collections["USERS"].findOne({
        _id: new ObjectId(id)
    });
    if (!currentUser) {
        res.send({
            message: 'Không tồn tại thông tin người dùng!'
        });
        return;
    }
    if ((!password || !confirmPassword) && confirmPassword !== password) {
        res.send({
            message: 'Bận cần nhập password và confirm password giống nhau!'
        });
        return;
    }
    await Collections["USERS"].updateOne({
        _id: new ObjectId(id)
    }, {
        "$set": {
            password
        }
    });
    res.send({
        message: 'Cập nhật mật khẩu thành công!'
    });
})
app.listen(8008, () => {
    console.log('Server chạy rùi nè!');
})