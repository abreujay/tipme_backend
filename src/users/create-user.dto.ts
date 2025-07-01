import { IsString, IsEmail, IsNotEmpty, MinLength, IsStrongPassword } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty({ message: 'O nome de usuário é obrigatório.' })
  @MinLength(4, { message: 'O nome de usuário deve ter pelo menos 4 caracteres.' })
  userName: string;

  @IsEmail({}, { message: 'Informe um email válido.' })
  @IsNotEmpty({ message: 'O email é obrigatório.' })
  userMail: string;

  @IsStrongPassword({}, { message: 'A senha precisa ser forte: com letras maiúsculas, minúsculas, números e símbolos.' })
  @IsNotEmpty({ message: 'A senha é obrigatória.' })
  userPassword: string;

}

