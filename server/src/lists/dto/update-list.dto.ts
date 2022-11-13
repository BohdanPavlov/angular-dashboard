import {ApiProperty} from "@nestjs/swagger";

export class UpdateListDto {
    @ApiProperty()
    readonly name: string;
}
