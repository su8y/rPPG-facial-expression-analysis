import {Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UsePipes, ValidationPipe,} from '@nestjs/common';
import {AuthService} from '../application/auth.service';
import {SignUpUserCommand} from '../application/dto/sign-up-user.command';
import {SignInUserCommand} from '../application/dto/sign-in-user.command';
import {CheckUsernameCommand} from "../application/dto/check_username.command";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Post('signup')
    @HttpCode(HttpStatus.CREATED)
    @UsePipes(ValidationPipe)
    async signUp(@Body() command: SignUpUserCommand) {
        return this.authService.signUp(command);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @UsePipes(ValidationPipe)
    async signIn(@Body() command: SignInUserCommand) {
        return this.authService.signIn(command);
    }

    @Get('check_username/:username')
    @HttpCode(HttpStatus.OK)
    @UsePipes(ValidationPipe)
    async checkUsername(@Param() command: CheckUsernameCommand) {
        return this.authService.checkUsername(command);
    }
}
