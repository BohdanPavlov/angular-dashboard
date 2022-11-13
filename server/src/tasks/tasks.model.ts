import mongoose from "mongoose";


export const TaskSchema = new mongoose.Schema({
        userId: {type: String, required: true},
        listId: {type: String, default: null},
        boardId: {type: String, required: true},
        name: {type: String, required: true},
    },
    {timestamps: true}
)

export interface ITask {
    userId: string
    listId: string | null;
    boardId: string
    name: string;
    createdAt: string;
}
