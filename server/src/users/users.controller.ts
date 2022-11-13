import {Body, Controller, Post, Put, UseGuards, Req, Patch, Delete} from '@nestjs/common';
import {UsersService} from "./users.service";
import {ChangeUserDto} from "./dto/change-user.dto";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {DeleteUserDto} from "./dto/delete-user.dto";
import {ApiBearerAuth, ApiHeaders, ApiOperation, ApiResponse, ApiSecurity, ApiTags} from "@nestjs/swagger";
import {Response} from "../types/types";

@ApiTags('Users')
@Controller('users')
export class UsersController {

    constructor(
        private userService: UsersService
    ) {
    }

    @ApiOperation({ summary: 'Change user password, only with jwt token in authorization header', description: ''})
    @ApiBearerAuth()
    @ApiResponse({ status: 200, type: Response})
    @ApiResponse({ status: 400, type: Response})
    @ApiResponse({ status: 401, type: Response})
    @ApiResponse({ status: 500, type: Response, description: 'Server error'})
    @UseGuards(JwtAuthGuard)
    @Patch()
    change(@Req() request, @Body() userDto: ChangeUserDto ) {
        return this.userService.changePassword(request, userDto);
    }

    @ApiOperation({ summary: 'Delete user', description: 'Delete user, only with jwt token in authorization header'})
    @ApiBearerAuth()
    @ApiResponse({ status: 200, type: Response, description: 'User deleted'})
    @ApiResponse({ status: 400, type: Response, description: 'Not all fields provided or incorrect password'})
    @ApiResponse({ status: 401, type: Response, description: 'User unauthorized'})
    @ApiResponse({ status: 500, type: Response, description: 'Server error'})
    @UseGuards(JwtAuthGuard)
    @Delete()
    delete(@Req() request, @Body() userDto: DeleteUserDto) {
        return this.userService.deleteUser(request, userDto);
    }
}
