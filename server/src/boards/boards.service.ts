import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateBoardDto} from "./dto/create-board.dto";
import {InjectModel} from "@nestjs/mongoose";
import {Model, Types} from "mongoose";
import {IBoard} from "./boards.model";

import {ListsService} from "../lists/lists.service";
import {IList} from "../lists/lists.model";


@Injectable()
export class BoardsService {

    constructor(
        @InjectModel('Board') private readonly boardModel: Model<IBoard>,
        @InjectModel('List') private readonly listModel: Model<IList>,
        private listsService: ListsService
    ) {}

    async getBoards(req) {
        const boards = await this.boardModel.find({ userId: req.user._id })
            .populate({
                path: 'lists',
                select: 'name _id tasks'
            });

        return boards;
    }

    async createBoard(req, boardDto: CreateBoardDto) {
        if( !boardDto.name ) {
            throw new HttpException('Name wasn\'t provided', HttpStatus.BAD_REQUEST);
        }

        const newBoard = new this.boardModel({
            userId: req.user._id,
            name: boardDto.name,
            description: boardDto.description ?? ''
        });

        const todoList = await this.listModel.create({ name: 'To do', boardId: newBoard._id, userId: req.user._id });;
        const inProgressList = await this.listModel.create({ name: 'In Progress', boardId: newBoard._id, userId: req.user._id });
        const doneList = await this.listModel.create({ name: 'Done', boardId: newBoard._id, userId: req.user._id });

        newBoard.lists.push(todoList._id, inProgressList._id, doneList._id)

        await newBoard.save();

        return {
            _id: newBoard._id,
            name: newBoard.name,
            description: newBoard.description,
            createdAt: newBoard.createdAt,
            lists: [
                { _id: todoList._id, name: todoList.name, tasks: todoList.tasks },
                { _id: inProgressList._id, name: inProgressList.name, tasks: inProgressList.tasks },
                {_id: doneList._id, name: doneList.name, tasks: doneList.tasks }
            ]
        }
    }

    async changeBoard(req, boardDto: CreateBoardDto) {

        if( !boardDto.name ) {
            throw new HttpException('Name wasn\'t provided', HttpStatus.BAD_REQUEST);
        }

        const board = await this.boardModel.findById(req.params.id);

        if( !board ) {
            throw new HttpException('There is no board with such id', HttpStatus.NOT_FOUND);
        }

        await this.boardModel.findByIdAndUpdate(req.params.id,
            {
                name: boardDto.name,
                description: boardDto.description ?? board.description
            })

       return {
            message: "Board was changed successfully"
       }
    }

    async deleteBoard(req) {
        const isBoard = await this.boardModel.findById(req.params.id);

        if( !isBoard ) {
            throw new HttpException('There is no board with such id', HttpStatus.BAD_REQUEST);
        }

        await this.listsService.deleteAllLists(isBoard._id + '')
        await this.boardModel.findByIdAndDelete(req.params.id);

        return {
            message: "Board was deleted successfully"
        }
    }
}
