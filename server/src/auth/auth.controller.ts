import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IAuthResponse, ILoginResponse, Response } from '../types/types';
import { JwtAuthGuard } from './jwt-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 200, type: ILoginResponse })
  @ApiResponse({
    status: 400,
    type: Response,
    description: 'Not all fields provided or incorrect username | password',
  })
  @ApiResponse({ status: 500, type: Response, description: 'Server error' })
  @Post('/login')
  login(@Body() userDto: CreateUserDto) {
    return this.authService.login(userDto);
  }

  @ApiOperation({ summary: 'Register' })
  @ApiResponse({ status: 200, type: ILoginResponse })
  @ApiResponse({
    status: 400,
    type: Response,
    description: 'Not all fields provided or username taken',
  })
  @ApiResponse({ status: 500, type: Response, description: 'Server error' })
  @Post('/register')
  register(@Body() userDto: CreateUserDto) {
    return this.authService.register(userDto);
  }

  @ApiOperation({ summary: 'Auth' })
  @ApiResponse({ status: 200, type: IAuthResponse })
  @ApiResponse({ status: 400, type: Response, description: 'User not found' })
  @ApiResponse({ status: 401, type: Response, description: 'Not authorized' })
  @ApiResponse({ status: 500, type: Response, description: 'Server error' })
  @UseGuards(JwtAuthGuard)
  @Get('/')
  auth(@Req() request) {
    return this.authService.auth(request);
  }
}
