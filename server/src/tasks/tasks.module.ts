import {forwardRef, Module} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {TaskSchema} from "./tasks.model";
import {ListsModule} from "../lists/lists.module";

@Module({
  imports: [
      MongooseModule.forFeature([{name: 'Task', schema: TaskSchema}]),
      forwardRef(() => ListsModule)
  ],
  providers: [TasksService],
  controllers: [TasksController],
  exports: [TasksService]
})
export class TasksModule {}
