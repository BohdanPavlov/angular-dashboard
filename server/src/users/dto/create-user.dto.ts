// export class CreateUserDto {
//     readonly username: string;
//     readonly password: string;
// }


import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({ example: 'my_username', description: 'new username'})
    readonly username: string;
    @ApiProperty({ example: '1234_my_password', description: 'password'})
    readonly password: string;
}
