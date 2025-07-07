import { IsString } from "class-validator";

export class UpdateArtistNameDTO {
    @IsString()
    artistName: string
}