import { IsEmail, IsString, MinLength } from 'class-validator';

export class AuthDto {
  @IsEmail()
  email: string;

  @MinLength(6, {
    message: 'Passwords should contain no less than 6 symbols!',
  })
  @IsString()
  password: string;
}
