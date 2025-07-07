import { IsString } from "class-validator";

export class UpdateBioDTO {
    @IsString()
    bio: string
}