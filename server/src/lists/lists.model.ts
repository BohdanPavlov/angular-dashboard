import mongoose, {Schema} from "mongoose";
import { Types } from "mongoose";


export const ListSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    boardId: { type: String, required: true },
    name: { type: String, required: true},
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task'}]
},
    { timestamps: true }
)

export interface IList extends mongoose.Document {
    userId: Types.ObjectId;
    boardId: string;
    name: string;
    tasks: Types.ObjectId[];
}
