import { model, Schema } from "mongoose";


const userSchema = new Schema({
    name: {
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
    },
    guest: Boolean,
    admin: Boolean

});
 
export const User = model('User', userSchema);
