import mongoose, { model, Schema } from "mongoose";


const cubeSchema = new Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
        minLength: 2,
        searchable: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true,
        validate: /^https?/
    },
    difficultyLevel: {
        type: Number,
        required: true,
        min: 1,
        max: 6
    },
    accessories: [{
        type: mongoose.Types.ObjectId,
        ref: "Accessory"
    }]
});
 
export const Cube = model('Cube', cubeSchema);






