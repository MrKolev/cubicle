import { config } from "../config/config.js"
import { User } from "../models/uresrs.js"
import bcrypt from "bcrypt";

function login(username, password) {

}

async function userCheck(username) {
    const userNameData = await User.find({ userName: username });

    if (userNameData.length != 0) {
        return true;
    }    
    return false;
}

async function emailCheck(email) {
    const data = await User.find({ email: email });

    if (data.length != 0) {
        return true;
    }
    return false;
}

async function register(userName, password, email) {

    let salt = await bcrypt.genSalt(config.SALT_ROUNDS);
    let hash = await bcrypt.hash(password, salt);

    const user = new User({
        userName,
        password: hash,
        email
    })

    return user.save();
}

export const authService = {
    register,
    login,
    userCheck,
    emailCheck
}