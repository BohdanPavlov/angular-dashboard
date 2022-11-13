import {forwardRef, Module} from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {MongooseModule} from "@nestjs/mongoose";
import {UserSchema} from "./users.model";
import {AuthModule} from "../auth/auth.module";

@Module({
  imports: [
      forwardRef(() => AuthModule),
      MongooseModule.forFeature([{ name: 'User', schema: UserSchema}])
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService, MongooseModule]
})
export class UsersModule {}
