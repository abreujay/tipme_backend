import { IsString, IsNotEmpty, IsEmail } from "class-validator";

export class DeleteUserDTO {
    @IsNotEmpty()
    @IsEmail()
    userMail: string

    @IsNotEmpty()
    @IsString()
    userPassword: string
}