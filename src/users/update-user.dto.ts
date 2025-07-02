import { IsString, IsOptional, IsEmail, IsStrongPassword } from "class-validator";

export class UpdateUserDTO {

  @IsOptional()
  @IsString()
  userName?: string;

  @IsOptional()
  @IsEmail()
  userMail?: string;

  @IsOptional()
  @IsStrongPassword()
  userPassword?: string;
}
