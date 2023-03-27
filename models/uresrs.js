import { model, Schema } from "mongoose";


const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        lowercase: true,
        minLength: 2,
        searchable: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    }
});
 
export const User = model('User', userSchema);
