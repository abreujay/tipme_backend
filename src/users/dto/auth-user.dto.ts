import { IsNotEmpty, IsEmail, IsStrongPassword, IsString  } from "class-validator";

export class AuthUserDTO {

    @IsEmail()
    
    userMail: string

    @IsString()
    @IsNotEmpty()
    userPassword: string

    

}