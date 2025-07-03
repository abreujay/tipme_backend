import { IsString } from "class-validator";

export class PixDTO {
    @IsString()
    pixKey: string;
}