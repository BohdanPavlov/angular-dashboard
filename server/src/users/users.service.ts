import {CreateUserDto} from "./dto/create-user.dto";
import {InjectModel} from "@nestjs/mongoose";
import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {IUser} from "./users.model";
import * as bcrypt from 'bcryptjs';
import {Model} from "mongoose";
import {ChangeUserDto} from "./dto/change-user.dto";
import {DeleteUserDto} from "./dto/delete-user.dto";

@Injectable()
export class UsersService {

    constructor(
        @InjectModel('User') private readonly userModel: Model<IUser>
    ) {
    }

    async createUser(dto: CreateUserDto) {

        const user = new this.userModel({
            username: dto.username,
            password: dto.password
        });

        await user.save();

        return user;
    }

    async getByUsername(username: string) {
        const user = await this.userModel.findOne({ username });
        return user;
    }

    async changePassword( req, dto: ChangeUserDto ) {
        if( !dto.newPassword || !dto.oldPassword ) {
            throw new HttpException('Not all fields were provided', HttpStatus.BAD_REQUEST);
        }

        const user = await this.userModel.findById(req.user._id)

        const isPasswordCorrect = await bcrypt.compare(dto.oldPassword, user.password);

        if( !isPasswordCorrect ) {
            throw new HttpException('Incorrect password', HttpStatus.BAD_REQUEST);
        }

        const newHashedPassword = await bcrypt.hash(dto.newPassword, 10);

        await this.userModel.findByIdAndUpdate(user._id, {password: newHashedPassword});

        return { message: "Password was changed" };
    }

    async deleteUser(req, userDto: DeleteUserDto) {
        if ( !userDto.password ) {
            throw new HttpException('Password wasn\'t provided', HttpStatus.BAD_REQUEST);
        }

        const user = await this.userModel.findById(req.user._id);

        const isPasswordCorrect = await bcrypt.compare(userDto.password, user.password);

        if( !isPasswordCorrect ) {
            throw new HttpException('Password is not correct', HttpStatus.BAD_REQUEST);
        }

        await this.userModel.findByIdAndDelete(user._id);

        return {
            message: "User was deleted successfully"
        }
    }
}
