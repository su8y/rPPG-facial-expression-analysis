import { Controller, Post, Body, HttpCode, HttpStatus, UsePipes, ValidationPipe } from '@nestjs/common';
import {AuthService} from "../application/auth.service";
import {SignUpUserCommand} from "../application/dto/sign-up-user.command";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService :AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(ValidationPipe)
  async signUp(@Body() command: SignUpUserCommand) {
    return this.authService.signUp(command);
  }
}
