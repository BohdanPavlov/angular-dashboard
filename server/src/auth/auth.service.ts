import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {CreateUserDto} from "../users/dto/create-user.dto";
import * as bcrypt from 'bcryptjs';
import {UsersService} from "../users/users.service";
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {

    constructor(
        private userService: UsersService,
    ) {
    }

    async login(userDto: CreateUserDto) {

        if( !userDto.username || !userDto.password ) {
            throw new HttpException('Not all fields were provided', HttpStatus.BAD_REQUEST);
        }

        const user = await this.userService.getByUsername(userDto.username);

        if( !user ) {
            throw new HttpException('Username or password is incorrect', HttpStatus.BAD_REQUEST);
        }

        const isPasswordCorrect = await bcrypt.compare(userDto.password, user.password );

        if( !isPasswordCorrect ) {
            throw new HttpException('Username or password is incorrect', HttpStatus.BAD_REQUEST);
        }

        const token = this.generateToken(user._id + '', user.username);

        return {
            user: {
                _id: user._id,
                username: user.username
            },
            token
        }
    }

    async register(userDto: CreateUserDto) {
        const isUser = await this.userService.getByUsername(userDto.username);

        if( !userDto.username || !userDto.password ) {
            throw new HttpException('Not all fields were provided', HttpStatus.BAD_REQUEST);
        }

        if( isUser ) {
            throw new HttpException('There is already user with such username', HttpStatus.BAD_REQUEST);
        }

        const hashedPassword = await bcrypt.hash(userDto.password, 10);
        const user = await this.userService.createUser({...userDto, password: hashedPassword});

        const token = this.generateToken(user._id + '', user.username);

        return {
            user: {
                _id: user._id,
                username: user.username
            },
            token
        }
    }

    async auth(req) {

        const user = await this.userService.getByUsername(req.user.username);

        if ( !user ) {
            throw new HttpException('There is no user with such username', HttpStatus.FORBIDDEN);
        }

        return {
            user: {
                _id: req.user._id,
                username: req.user.username,
            }
        }
    }

    private generateToken(_id: string, username: string) {
        return jwt.sign(
            {_id, username},
            process.env.SECRET_KEY,
            {
                expiresIn: '24h'
            }
        )
    }
}
