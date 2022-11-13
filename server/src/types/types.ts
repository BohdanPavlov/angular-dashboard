import {ApiProperty} from "@nestjs/swagger";

export class Response {
    @ApiProperty({ example: 'Message', description: 'Response info'})
    message: string;
}

interface IUser {
    _id: string;
    username: string;
}

export class ILoginResponse {
    @ApiProperty({ example: { _id: '633045e65e1b84b4d91c76e6', username: 'my_username'}, description: 'Response info'})
    user: IUser
    @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzMwN2MzNTBjNTYxM2VjZTU5N2IxZjQiLCJ1c2VybmFtZSI6IjIiLCJpYXQiOjE2NjQxMjE5MDksImV4cCI6MTY2NDIwODMwOX0.nsiFE1XmXKjsp0B-c8ks1E6KTimYMF_kZ6TYww747_w'})
    token: string
}

export class IAuthResponse {
    @ApiProperty({ example: { _id: '633045e65e1b84b4d91c76e6', username: 'my_username'}, description: 'Response info'})
    user: IUser;
}

export class IList {
    @ApiProperty({ example: '633045e65e1b84b4d91c76e6' })
    readonly _id: string;
    @ApiProperty({ example: 'List name' })
    readonly name: string;
}

export class ListResponse {
    @ApiProperty({ example: {_id: '633045e65e1b84b4d91c76e6', name: 'List name'}})
    readonly list: IList;
    @ApiProperty({ example: 'Message' })
    readonly message: Response
}

export class ITask {
    @ApiProperty({ example: '633045e65e1b84b4d91c76e6'})
    readonly _id: string;
    @ApiProperty({ example: '633045e65e1b84b4d91c76e6'})
    readonly listId: string;
    @ApiProperty({ example: 'List name'})
    readonly name: string;
}

export class IListWithTasks extends IList{
    @ApiProperty({ example: [{_id: '633045e65e1b84b4d91c76e6', listId: '633045e65e1b84b4d91c76e6', name: 'Task name'}]})
    readonly tasks: ITask[]
}

export class IBoardsResponse {
    @ApiProperty({ example: '633045e65e1b84b4d91c76e6', description: 'Board id'})
    readonly _id: string
    @ApiProperty({ example: 'Board name' })
    readonly name: string;
    @ApiProperty({ example: 'Board description'})
    readonly description: string;
}
