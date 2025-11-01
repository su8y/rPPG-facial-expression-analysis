import {IsString, MinLength} from 'class-validator';

export class SignInUserCommand {
    @IsString()
    username!: string;

    @IsString()
    @MinLength(4)
    password!: string;
}
