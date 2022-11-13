import {Body, Controller, Delete, Get, Post, Put, Req, UseGuards} from '@nestjs/common';
import {ListsService} from "./lists.service";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {CreateListDto} from "./dto/create-list.dto";
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {ListResponse, Response} from "../types/types";
import {UpdateListDto} from "./dto/update-list.dto";

@ApiTags('Lists')
@Controller('lists')
export class ListsController {

    constructor(
        private listsService: ListsService
    ) {
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    getLists(@Req() request ) {
        return this.listsService.getLists(request);
    }

    @ApiOperation({ summary: 'Create new list'})
    @ApiBearerAuth()
    @ApiResponse({ status: 200, type: ListResponse})
    @ApiResponse({ status: 400, type: Response, description: 'Not all parameters were provided'})
    @ApiResponse({ status: 401, type: Response, description: 'Not authorized'})
    @ApiResponse({ status: 404, type: Response, description: 'Board wasn\'t found'})
    @ApiResponse({ status: 500, type: Response, description: 'Server error'})
    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Req() request, @Body() listDto: CreateListDto) {
        return this.listsService.createList(request, listDto);
    }

    @ApiOperation({ summary: 'Update list name'})
    @ApiBearerAuth()
    @ApiResponse({ status: 200, type: Response})
    @ApiResponse({ status: 400, type: Response, description: 'Not all parameters were provided'})
    @ApiResponse({ status: 401, type: Response, description: 'Not authorized'})
    @ApiResponse({ status: 404, type: Response, description: 'List wasn\'t found'})
    @ApiResponse({ status: 500, type: Response, description: 'Server error'})
    @UseGuards(JwtAuthGuard)
    @Put('/:id')
    update(@Req() request, @Body() listDto: UpdateListDto) {
        return this.listsService.renameList(request, listDto);
    }

    @ApiOperation({ summary: 'Delete list'})
    @ApiBearerAuth()
    @ApiResponse({ status: 200, type: Response})
    @ApiResponse({ status: 401, type: Response, description: 'Not authorized'})
    @ApiResponse({ status: 404, type: Response, description: 'List wasn\'t found'})
    @ApiResponse({ status: 500, type: Response, description: 'Server error'})
    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    delete(@Req() request) {
        return this.listsService.deleteList(request);
    }
}
