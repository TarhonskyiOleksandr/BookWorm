import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateOAuthUserDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;
}
