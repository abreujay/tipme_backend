import { IsString } from "class-validator";

export class UserLinksDTO {
    @IsString()
    link: string;
}