import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
    title:String,
    description:String,
    duration:Number,
    date:{
        type:Date,
        default: new Date()
    }
})

const TodoModel = mongoose.model('MyTodo' , TodoSchema);

export default TodoModel;