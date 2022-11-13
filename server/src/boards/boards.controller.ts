import {Body, Controller, Delete, Get, Post, Put, Req, UseGuards} from '@nestjs/common';
import {BoardsService} from "./boards.service";
import {CreateBoardDto} from "./dto/create-board.dto";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {IBoardsResponse, IListWithTasks, Response} from "../types/types";

@ApiTags('Boards')
@Controller('boards')
export class BoardsController {

    constructor(
        private boardService: BoardsService
    ) {
    }

    @ApiOperation({ summary: 'Get all boards created by user', description: ''})
    @ApiBearerAuth()
    @ApiResponse({ status: 200, type: [IBoardsResponse]})
    @ApiResponse({ status: 401, type: Response, description: 'Not authorized'})
    @ApiResponse({ status: 500, type: Response, description: 'Server error'})
    @UseGuards(JwtAuthGuard)
    @Get()
    getBoards(@Req() request) {
        return this.boardService.getBoards(request);
    }

    @ApiOperation({ summary: 'Create new board'})
    @ApiBearerAuth()
    @ApiResponse({ status: 200, type: IBoardsResponse})
    @ApiResponse({ status: 401, type: Response, description: 'Not authorized'})
    @ApiResponse({ status: 500, type: Response, description: 'Server error'})
    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Req() request, @Body() boardDto: CreateBoardDto) {
        return this.boardService.createBoard(request, boardDto);
    }

    @ApiOperation({ summary: 'Change board name'})
    @ApiBearerAuth()
    @ApiResponse({ status: 200, type: Response})
    @ApiResponse({ status: 400, type: Response, description: 'Not all field were provided'})
    @ApiResponse({ status: 401, type: Response, description: 'Not authorized'})
    @ApiResponse({ status: 404, type: Response, description: 'Board with such id not found'})
    @ApiResponse({ status: 500, type: Response, description: 'Server error'})
    @UseGuards(JwtAuthGuard)
    @Put('/:id')
    changeBoard(@Req() request, @Body() boardDto: CreateBoardDto) {
        return this.boardService.changeBoard(request, boardDto);
    }

    @ApiOperation({ summary: 'Delete'})
    @ApiBearerAuth()
    @ApiResponse({ status: 200, type: Response, description: 'Board was deleted'})
    @ApiResponse({ status: 401, type: Response, description: 'Not authorized'})
    @ApiResponse({ status: 404, type: Response, description: 'Board with such id not found'})
    @ApiResponse({ status: 500, type: Response, description: 'Server error'})
    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    deleteBoard(@Req() request) {
        return this.boardService.deleteBoard(request);
    }
}
