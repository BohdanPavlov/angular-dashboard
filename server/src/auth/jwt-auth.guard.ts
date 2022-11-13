import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";
import * as jwt from 'jsonwebtoken';
import {UsersService} from "../users/users.service";

export class JwtAuthGuard implements CanActivate {

    constructor(
    ) {
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();

        try {
            const token = req.headers.authorization.split(' ')[1];


            if( !token ) {
                throw new UnauthorizedException({message: 'Unauthorized'});
            }

            req.user = jwt.verify(token, process.env.SECRET_KEY)

            return  true

        } catch (err) {
            throw new UnauthorizedException({message: 'Unauthorized'});
        }
    }
}
