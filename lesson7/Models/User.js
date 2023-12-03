import { ObjectId } from "mongodb";
import { Collections } from "../database/index.js";

class User {
    constructor(userName, role) {
        this.userName = userName;
        this.role = role;
    }
    async insertToDB() {
        const newUser = {
            role: this.role,
            userName: this.userName,
        }
        const createUser = await Collections["USERS"].insertOne(newUser);
        return createUser;
    }
    async getAllUser(condition) {
        return await Collections["USERS"].find(condition).toArray();
    }
    async findUserById(id) {
        return await Collections["USERS"].findOne({
            "_id": new ObjectId(id)
        });
    }
}
const UserModel = (userName, role) => {
    return new User(userName, role)
}
export default UserModel;