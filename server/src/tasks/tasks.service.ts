import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {ITask} from "./tasks.model";
import {CreateTaskDto} from "./dto/create-task.dto";
import {ChangeTaskList, ChangeTaskName} from "./dto/change-task.dto";
import {IList} from "../lists/lists.model";

@Injectable()
export class TasksService {

    constructor(
        @InjectModel('Task') private readonly taskModel: Model<ITask>,
        @InjectModel('List') private readonly listModel: Model<IList>
    ) {
    }

    async getTasks(req) {
        const {boardId} = req.query;

        if (!boardId) {
            const tasks = await this.taskModel.find({userId: req.user._id});

            return tasks;
        }

        const tasks = await this.taskModel.find({boardId})

        return tasks;
    }

    async createTask(req, taskDto: CreateTaskDto) {
        if (!taskDto.name || !taskDto.listId || !taskDto.boardId) {
            throw new HttpException('Not all fields were provided', HttpStatus.BAD_REQUEST)
        }

        const isList = await this.listModel.findById(taskDto.listId);

        if (!isList) {
            throw new HttpException('There is no list with such id', HttpStatus.BAD_REQUEST)
        }

        const newTask = new this.taskModel({
            name: taskDto.name,
            boardId: taskDto.boardId,
            listId: taskDto.listId,
            userId: req.user._id
        });


        await newTask.save();

        isList.tasks.push(newTask._id);
        await isList.save();

        return newTask;
    }

    async renameTask(req, taskDto: ChangeTaskName) {

        if (!taskDto.name) {
            throw new HttpException('Not all parameters were provided', HttpStatus.BAD_REQUEST)
        }

        const task = await this.taskModel.findById(req.params.id);

        if (!task) {
            throw new HttpException('There is no task with such id', HttpStatus.BAD_REQUEST)
        }

        if (task.userId !== req.user._id) {
            throw new HttpException('This operation is forbidden', HttpStatus.FORBIDDEN)
        }

        await this.taskModel.findByIdAndUpdate(req.params.id, {name: taskDto.name ?? task.name});

        return {
            message: "Task name was changed successfully"
        }
    }

    async changeTaskList(req, taskDto: ChangeTaskList) {
        const task = await this.taskModel.findById(req.params.id);

        if (!task) {
            throw new HttpException('There is no task with such id', HttpStatus.BAD_REQUEST)
        }

        if (task.userId !== req.user._id) {
            throw new HttpException('This operation is forbidden', HttpStatus.FORBIDDEN)
        }

        const changeList = await this.listModel.findById(taskDto.listId);

        if (!changeList) {
            throw new HttpException('There is no list with such id', HttpStatus.BAD_REQUEST)
        }

        const oldList = await this.listModel.findById(task.listId);

        if (oldList) {
            oldList.tasks = oldList.tasks.filter((listTask) => !listTask._id.equals(task._id));
            await oldList.save();
        }

        changeList.tasks.push(task._id);
        await changeList.save();

        task.listId = changeList._id;
        await task.save();

        return {
            message: "Task list was changed successfully"
        }
    }

    async archiveTask(req) {
        const task = await this.taskModel.findById(req.params.id);

        if (!task) {
            throw new HttpException('There is no task with such id', HttpStatus.BAD_REQUEST)
        }

        if (task.userId !== req.user._id) {
            throw new HttpException('This operation is forbidden', HttpStatus.FORBIDDEN)
        }

        const oldList = await this.listModel.findById(task.listId);
        oldList.tasks = oldList.tasks.filter((listTask) => !listTask._id.equals(task._id));
        await oldList.save();

        await this.taskModel.findByIdAndUpdate(req.params.id, {listId: null});

        return {
            message: "Task was archived successfully"
        }
    }

    async deleteTask(req) {
        const task = await this.taskModel.findById(req.params.id);

        if (!task) {
            throw new HttpException('There is no task with such id', HttpStatus.BAD_REQUEST)
        }

        if (task.userId !== req.user._id) {
            throw new HttpException('This operation is forbidden', HttpStatus.FORBIDDEN)
        }

        if (task.listId !== null) {
            const list = await this.listModel.findById(task.listId);

            list.tasks = list.tasks.filter(listTask => !listTask._id.equals(task._id));
            await list.save();
        }

        await this.taskModel.findByIdAndDelete(req.params.id);

        return {
            message: "Task was deleted successfully"
        }
    }

    async deleteAllTasks(boardId: string) {
        await this.taskModel.deleteMany({boardId});
    }
}
