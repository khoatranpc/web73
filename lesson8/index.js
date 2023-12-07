import express from 'express';
import { connectDb, Collections } from './database/index.js';
const app = express();
app.use(express.json());
connectDb();

app.post('/register', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).send({
            message: 'Bạn cần cung cấp cả email và  cả password!'
        });
        return;
    }
    if (String(password).length <= 6) {
        res.status(400).send({
            message: 'Mật khẩu phải lớn hơn 6 ký tự!'
        });
        return;
    }
    const existedEmail = await Collections['ACCOUNTS'].findOne({
        email
    });
    if (existedEmail) {
        res.status(400).send({
            message: 'Email đã tồn tại!'
        });
        return;
    }
    const createdNewAccount = await Collections['ACCOUNTS'].insertOne({
        email,
        password,
        createdAt: new Date(),
        updatedAt: new Date(),
    });
    const newRecordDataUser = {
        isActivate: false,
        accountId: createdNewAccount.insertedId
    }
    await Collections['USERS'].insertOne(newRecordDataUser);
    res.status(201).send({
        message: 'Đăng ký tài khoản thành công',
        data: createdNewAccount
    })
    return;
})
app.listen(3001, () => {
    console.log('Server run rùi nè');
})