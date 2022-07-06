import { IsEmail, Length } from 'class-validator';

export class LoginAuthDto {
  @IsEmail()
  email: string;

  @Length(8, 16)
  password: string;
}
