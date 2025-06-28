import { IsNotEmpty, IsEmail, IsStrongPassword  } from "class-validator";

export class AuthUserDTO {

    @IsEmail()
    @IsNotEmpty()
    userMail: string

    @IsStrongPassword()
    @IsNotEmpty()
    userPassword: string

    

}