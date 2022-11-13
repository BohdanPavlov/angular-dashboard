import {ApiProperty} from "@nestjs/swagger";

export class CreateBoardDto {
    @ApiProperty({ example: 'Board name' })
    readonly name: string;
    @ApiProperty({ example: 'Board description' })
    readonly description?: string;
}
