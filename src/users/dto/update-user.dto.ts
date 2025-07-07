import {
  IsString,
  IsOptional,
  IsNotEmpty,
  IsEmail,
  IsStrongPassword,
} from 'class-validator';

export class UpdateUserDTO {
  @IsOptional()
  @IsEmail()
  userMail?: string;

  @IsOptional()
  @IsString()
  userName?: string;

  @IsOptional()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  userPassword?: string;

  @IsNotEmpty({ message: 'A senha atual é obrigatória para atualizar o perfil.' })
  @IsString()
  password: string;
}
