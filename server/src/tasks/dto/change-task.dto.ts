import {ApiProperty} from "@nestjs/swagger";


export class ChangeTaskName {
    @ApiProperty()
    readonly name: string
}

export class ChangeTaskList {
    @ApiProperty()
    readonly listId: string;
}

