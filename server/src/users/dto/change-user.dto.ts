import {ApiProperty} from "@nestjs/swagger";

export class ChangeUserDto {
    @ApiProperty({ example: '1234_1234', description: 'Old password'})
    oldPassword: string;
    @ApiProperty({ example: '4321_1234', description: 'New password'})
    newPassword: string;
}
