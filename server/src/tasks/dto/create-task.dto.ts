import {ApiProperty} from "@nestjs/swagger";

export class CreateTaskDto {
    @ApiProperty()
    readonly name: string;
    @ApiProperty()
    readonly listId: string;
    @ApiProperty()
    readonly boardId: string;
}
