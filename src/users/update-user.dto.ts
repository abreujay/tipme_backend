import { IsString, IsOptional, IsEmail, IsStrongPassword } from "class-validator";

export class UpdateUserDTO {

  @IsString()
  userId: string;  // <-- ID obrigatório pra saber quem atualizar

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
