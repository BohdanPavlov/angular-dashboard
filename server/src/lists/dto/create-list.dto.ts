import {ApiProperty} from "@nestjs/swagger";

export class CreateListDto {
    @ApiProperty()
    readonly boardId: string;
    @ApiProperty()
    readonly name: string;
}
