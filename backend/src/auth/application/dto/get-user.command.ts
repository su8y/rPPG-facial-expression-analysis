import { IsString } from 'class-validator';

export class GetUserCommand {
  @IsString()
  username: string;
}