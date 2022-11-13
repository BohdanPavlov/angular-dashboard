import {Body, Controller, Delete, Get, Patch, Post, Put, Req, UseGuards} from '@nestjs/common';
import {TasksService} from "./tasks.service";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {CreateTaskDto} from "./dto/create-task.dto";
import {ChangeTaskList, ChangeTaskName} from "./dto/change-task.dto";
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {ITask, Response} from "../types/types";

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {

    constructor(
        private tasksService: TasksService
    ) {
    }

    @ApiOperation({summary: 'Get user tasks'})
    @ApiBearerAuth()
    @ApiResponse({status: 200, type: [ITask]})
    @ApiResponse({status: 401, type: Response, description: 'Not authorized'})
    @ApiResponse({status: 500, type: Response, description: 'Server error'})
    @UseGuards(JwtAuthGuard)
    @Get()
    getTasks(@Req() request) {
        return this.tasksService.getTasks(request);
    }

    @ApiOperation({summary: 'Create new task'})
    @ApiBearerAuth()
    @ApiResponse({status: 200, type: ITask})
    @ApiResponse({status: 400, type: Response, description: 'Not all parameters were provided'})
    @ApiResponse({status: 401, type: Response, description: 'Not authorized'})
    @ApiResponse({status: 404, type: Response, description: 'List wasn\'t found'})
    @ApiResponse({status: 500, type: Response, description: 'Server error'})
    @UseGuards(JwtAuthGuard)
    @Post()
    createTask(@Req() request, @Body() taskDto: CreateTaskDto) {
        return this.tasksService.createTask(request, taskDto);
    }

    @ApiOperation({summary: 'Rename task'})
    @ApiBearerAuth()
    @ApiResponse({status: 200, type: Response})
    @ApiResponse({status: 400, type: Response, description: 'Not all parameters were provided'})
    @ApiResponse({status: 401, type: Response, description: 'Not authorized'})
    @ApiResponse({status: 404, type: Response, description: 'Not found'})
    @ApiResponse({status: 500, type: Response, description: 'Server error'})
    @UseGuards(JwtAuthGuard)
    @Put('/:id')
    rename(@Req() request, @Body() taskDto: ChangeTaskName) {
        return this.tasksService.renameTask(request, taskDto);
    }

    @ApiOperation({summary: 'Change task list'})
    @ApiBearerAuth()
    @ApiResponse({status: 200, type: Response})
    @ApiResponse({status: 400, type: Response, description: 'Not all parameters were provided'})
    @ApiResponse({status: 401, type: Response, description: 'Not authorized'})
    @ApiResponse({status: 404, type: Response, description: 'List not found'})
    @ApiResponse({status: 500, type: Response, description: 'Server error'})
    @UseGuards(JwtAuthGuard)
    @Patch('/:id')
    changeList(@Req() request, @Body() taskDto: ChangeTaskList) {
        return this.tasksService.changeTaskList(request, taskDto);
    }

    @ApiOperation({summary: 'Archive Task'})
    @ApiBearerAuth()
    @ApiResponse({status: 200, type: Response})
    @ApiResponse({status: 400, type: Response, description: 'There is no task with such id'})
    @ApiResponse({status: 401, type: Response, description: 'Not authorized'})
    @ApiResponse({status: 500, type: Response, description: 'Server error'})
    @UseGuards(JwtAuthGuard)
    @Patch('/:id/archive')
    archiveTask(@Req() request) {
        return this.tasksService.archiveTask(request);
    }


    @ApiOperation({summary: 'Delete task'})
    @ApiBearerAuth()
    @ApiResponse({status: 200, type: Response})
    @ApiResponse({status: 401, type: Response, description: 'Not authorized'})
    @ApiResponse({status: 404, type: Response, description: 'List not found'})
    @ApiResponse({status: 500, type: Response, description: 'Server error'})
    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    deleteTask(@Req() request) {
        return this.tasksService.deleteTask(request);
    }
}
