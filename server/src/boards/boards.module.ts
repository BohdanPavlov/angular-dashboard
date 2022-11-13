import {forwardRef, Module} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {BoardSchema} from "./boards.model";
import {ListsModule} from "../lists/lists.module";

@Module({
  imports: [
      MongooseModule.forFeature([{ name: 'Board', schema: BoardSchema}]),
      forwardRef(() => ListsModule)
  ],
  providers: [BoardsService],
  controllers: [BoardsController],
    exports: [MongooseModule]
})
export class BoardsModule {}
