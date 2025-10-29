import { IsString, MinLength } from 'class-validator';

export class SignUpUserCommand {
  @IsString()
  username: string;

  @IsString()
  @MinLength(4)
  password: string;
}
