import {forwardRef, Module} from '@nestjs/common';
import { ListsService } from './lists.service';
import { ListsController } from './lists.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {ListSchema} from "./lists.model";
import {TasksModule} from "../tasks/tasks.module";
import {BoardsModule} from "../boards/boards.module";

@Module({
  imports: [
      MongooseModule.forFeature([{ name: 'List', schema: ListSchema}]),
      forwardRef(() => BoardsModule),
      forwardRef(() => TasksModule)
  ],
  providers: [ListsService],
  controllers: [ListsController],
  exports: [
      ListsService,
      MongooseModule
  ]
})
export class ListsModule {}
