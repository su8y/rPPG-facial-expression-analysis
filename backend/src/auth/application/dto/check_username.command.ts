import {IsString, MinLength} from 'class-validator';

export class CheckUsernameCommand {
    @IsString()
    @MinLength(4)
    username!: string;
}
