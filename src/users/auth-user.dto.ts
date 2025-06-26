import { IsNotEmpty, IsString, IsStrongPassword  } from "class-validator";

export class AuthUserDTO {

    @IsString()
    @IsNotEmpty()
    userMail: string

    @IsStrongPassword()
    @IsNotEmpty()
    userPassword: string

    

}