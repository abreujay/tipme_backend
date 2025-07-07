import { IsString, IsNotEmpty, MaxLength } from "class-validator";

export class SavePixDTO {

  @IsString()
  @IsNotEmpty()
  version: string = '01';

  @IsString()
  @IsNotEmpty()
  pixKey: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(25)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(15)
  city: string;
}
