import mongoose from "mongoose";
const { Schema, model } = mongoose;

const accessorySchema = new Schema({
    name: String,
    imageUrl: String,
    description: String
});

export const Accessory = model("Accessory", accessorySchema);
