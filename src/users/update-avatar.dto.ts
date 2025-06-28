import { IsNotEmpty, IsString } from "class-validator";

export class CreateAvatarDTO {
    
    @IsNotEmpty()
    @IsString()
    avatar: string

}