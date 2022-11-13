import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {IList} from "./lists.model";
import {CreateListDto} from "./dto/create-list.dto";
import {UpdateListDto} from "./dto/update-list.dto";
import {TasksService} from "../tasks/tasks.service";
import {IBoard} from "../boards/boards.model";

@Injectable()
export class ListsService {
    constructor(
        @InjectModel('List') private readonly listModel: Model<IList>,
        @InjectModel('Board') private readonly boardModel: Model<IBoard>,
        private tasksService: TasksService
    ) {
    }

    async getLists(req) {

        const { boardId } = req.query;

        if( !boardId ) {
            throw new HttpException('There is no boardId in query params', HttpStatus.BAD_REQUEST);
        }

        const board = await this.boardModel.findById(boardId);

        if( !board ) {
            throw new HttpException('There is no board with such id', HttpStatus.BAD_REQUEST);
        }

        const lists = await this.listModel.find({ boardId })
            .populate('tasks');

        return {
            lists,
            boardName: board.name,
        }
    }


    async createList(req, listDto: CreateListDto) {

        if( !listDto.name || !listDto.boardId ) {
            throw new HttpException('Not all parameters were provided', HttpStatus.BAD_REQUEST);
        }

        const isBoard = await this.boardModel.findById(listDto.boardId);

        if( !isBoard ) {
            throw new HttpException('There is no board with such id', HttpStatus.BAD_REQUEST);
        }

        const newList = new this.listModel({
            name: listDto.name,
            boardId: listDto.boardId,
            userId: req.user._id
        });

        await newList.save();

        return newList;
    }

    async renameList(req, listDto: UpdateListDto ) {

        if( !listDto.name ) {
            throw new HttpException('Name wasn\'t provided', HttpStatus.BAD_REQUEST);
        }

        const list = await this.listModel.findById(req.params.id);

        if( !list ) {
            throw new HttpException('There is no list with such id', HttpStatus.BAD_REQUEST);
        }

        if( list.userId !== req.user._id ) {
            throw new HttpException('This operation is forbidden', HttpStatus.FORBIDDEN);
        }

        await this.listModel.findByIdAndUpdate(req.params.id, { name: listDto.name });

        return {
            message: "List name was successfully updated"
        }
    }

    async deleteList(req) {
        const list = await this.listModel.findById(req.params.id);

        if( !list ) {
            throw new HttpException('There is no list with such id', HttpStatus.BAD_REQUEST);
        }

        if( list.userId !== req.user._id ) {
            throw new HttpException('This operation is forbidden', HttpStatus.FORBIDDEN);
        }

        await this.tasksService.deleteAllTasks(list._id);
        await this.listModel.findByIdAndDelete(req.params._id);

        return {
            message: "List was deleted successfully"
        }
    }

    async deleteAllLists(boardId: string) {
        await this.listModel.deleteMany({ boardId });
        await this.tasksService.deleteAllTasks(boardId);
    }
}
