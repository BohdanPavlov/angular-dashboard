import {forwardRef, Module} from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {JwtModule} from "@nestjs/jwt";
import {UsersModule} from "../users/users.module";
import {UsersService} from "../users/users.service";


@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
      forwardRef(() => UsersModule),
  ],
    exports: [
        AuthService
    ]
})
export class AuthModule {}
